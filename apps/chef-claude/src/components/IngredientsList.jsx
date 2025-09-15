function IngredientsList({ ingredients, onRequestRecipe, ref }) {
  const ingredientListItems = ingredients.map((ingredient, index) => (
    <li key={`${ingredient}-${index}`}>{ingredient}</li>
  ));

  if (ingredients.length === 0) return null;
  return (
    <section className="ingredient-section">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientListItems}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={() => onRequestRecipe()}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}

export default IngredientsList;
