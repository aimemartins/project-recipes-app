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

export const getDrinkCategoryList = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const fetchCategories = await fetch(endpoint);
  const { drinks } = await fetchCategories.json();
  return drinks;
};
