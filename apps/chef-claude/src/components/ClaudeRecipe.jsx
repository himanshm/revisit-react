import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ClaudeRecipe(props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      {console.log('recipe: ', props.recipeMarkdown)}
      <h2>Chef Claude Recommends:</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{props.recipeMarkdown}</Markdown>
    </section>
  );
}

export default ClaudeRecipe;
