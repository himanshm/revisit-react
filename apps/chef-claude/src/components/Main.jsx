import { useState } from "react"

function Main() {
  const [ingredients, setIngredients] = useState([]);

  const ingredientListItems = ingredients.map((ingredient, index) => (
    <li key={`${ingredient}-${index}`}>{ingredient}</li>
  ));

  const handleSubmit = e => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get('ingredient');
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
        <form className="add-ingredient-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="e.g. Oregano"
                aria-label="Add ingredient"
                name="ingredient"
            />
            <button>Add ingredient</button>
        </form>
        <ul>
          {ingredientListItems}
        </ul>
    </main>
  )
}

export default Main