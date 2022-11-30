export const theMealDBIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const fetchTheMeal = await fetch(endpoint);
  const { meals } = await fetchTheMeal.json();
  return meals;
};

export const theMealDBName = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  const fetchTheMeal = await fetch(endpoint);
  const { meals } = await fetchTheMeal.json();
  return meals;
};

export const theMealDBFirstLet = async (firstLet) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstLet}`;
  const fetchTheMeal = await fetch(endpoint);
  const { meals } = await fetchTheMeal.json();
  return meals;
};
