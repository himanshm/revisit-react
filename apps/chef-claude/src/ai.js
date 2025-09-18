import Anthropic from '@anthropic-ai/sdk';
import { InferenceClient } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a 
recipe they could make with some or all of those ingredients. You don't need to use every
ingredient they mention in your recipe. The recipe can include additional ingredients 
they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// Make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

const anthropic = new Anthropic({
  // for ANTHROPIC_API_KEY
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getRecipeFromChefClaude = async ingredientsArr => {
  const ingredientsString = ingredientsArr.join(', ');

  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
      }
    ]
  });
  return msg.content[0].text;
};

const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN);
export const getRecipeFromMistral = async ingredientsArr => {
  const ingredientsString = ingredientsArr.join(', ');

  try {
    const response = await hf.chatCompletion({
      model: 'mistralai/Mistral-7B-Instruct-v0.3',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
        }
      ],
      max_tokens: 1024
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};
