import { useEffect, useRef, useState } from 'react';
import { getRecipeFromMistral } from '../ai';
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsList from './IngredientsList';

function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeText, setRecipeText] = useState(''); // string or null
  const [isLoading, setIsLoading] = useState(false); // boolean
  const [error, setError] = useState(''); // string or null

  const recipeSectionRef = useRef(null);

  const addIngredient = formData => {
    const newIngredient = formData.get('ingredient');
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  };

  useEffect(() => {
    if (recipeText && recipeSectionRef.current) {
      recipeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [recipeText]);

  const fetchRecipe = async () => {
    setIsLoading(true);
    setError(null);
    setRecipeText(null);

    try {
      const text = await getRecipeFromMistral(ingredients);
      if (text) {
        setRecipeText(text ?? 'No recipe returned!');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to get recipe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input type="text" placeholder="e.g. Oregano" aria-label="Add ingredient" name="ingredient" />
        <button>Add ingredient</button>
      </form>
      <IngredientsList ingredients={ingredients} onRequestRecipe={fetchRecipe} ref={recipeSectionRef} />
      {isLoading && <p>Thinking...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {recipeText && <ClaudeRecipe recipeMarkdown={recipeText} />}
    </main>
  );
}

export default Main;
