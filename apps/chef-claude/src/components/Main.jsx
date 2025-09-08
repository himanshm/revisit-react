import { useState } from "react"

function Main() {
  const [ingredients, setIngredients] = useState([]);

  const ingredientListItems = ingredients.map((ingredient, index) => (
    <li key={`${ingredient}-${index}`}>{ingredient}</li>
  ));

  const addIngredient = formData => {
    const newIngredient = formData.get('ingredient');
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
        <form 
          className="add-ingredient-form" 
          action={addIngredient}
          >
            <input
                type="text"
                placeholder="e.g. Oregano"
                aria-label="Add ingredient"
                name="ingredient"
            />
            <button>Add ingredient</button>
        </form>
        {ingredients.length > 0 && <section className="ingredient-section">
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-label="polite">{ingredientListItems}</ul>
          {ingredients.length > 3 && <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button>Get a recipe</button>
          </div>}
        </section>}
       
    </main>
  )
}

export default Main