export const theCocktailDBIngredient = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const fetchTheMeal = await fetch(endpoint);
  const { drinks } = await fetchTheMeal.json();
  return drinks;
};

export const theCocktailDBName = async (name = '') => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const fetchTheMeal = await fetch(endpoint);
  const { drinks } = await fetchTheMeal.json();
  return drinks;
};

export const theCocktailDBFirstLet = async (firstLet) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLet}`;
  const fetchTheMeal = await fetch(endpoint);
  const { drinks } = await fetchTheMeal.json();
  return drinks;
};

export const getDrinkCategoryList = async (name = 'list') => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=${name}`;
  const fetchCategories = await fetch(endpoint);
  const { drinks } = await fetchCategories.json();
  return drinks;
};

export const getDrinksByCategory = async (keyword = '') => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${keyword}`;
  const fetchDrinks = await fetch(endpoint);
  const { drinks } = await fetchDrinks.json();
  return drinks;
};
