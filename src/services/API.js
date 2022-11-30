const fetchAPI = async (url, radioValue, search) => {
  const endpoint = `https://www.${url}.com/api/json/v1/1/${radioValue}${search}`;
  const fetchTheMeal = await fetch(endpoint);
  const result = await fetchTheMeal.json();
  return result;
};

export default fetchAPI;
