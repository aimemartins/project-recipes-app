// export const theMealDBIngredient = async (ingredient) => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
//   const fetchTheMeal = await fetch(endpoint);
//   const { meals } = await fetchTheMeal.json();
//   return meals;
// };

// export const theMealDBName = async (name = '') => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
//   const fetchTheMeal = await fetch(endpoint);
//   const { meals } = await fetchTheMeal.json();
//   return meals;
// };

// export const theMealDBFirstLet = async (firstLet) => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLet}`;
//   const fetchTheMeal = await fetch(endpoint);
//   const { meals } = await fetchTheMeal.json();
//   return meals;
// };

// export const getMealCategoryList = async (name = 'list') => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/list.php?c=${name}`;
//   const fetchCategories = await fetch(endpoint);
//   const { meals } = await fetchCategories.json();
//   return meals;
// };

// export const getMealsByCategory = async (keyword) => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${keyword}`;
//   const fetchMeals = await fetch(endpoint);
//   const { meals } = await fetchMeals.json();
//   if (!keyword) {
//     return [];
//   }
//   return meals;
// };

// export const getMeal = async (id) => {
//   const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//   const response = await fetch(endpoint);
//   const result = await response.json();
//   return result;
// };
