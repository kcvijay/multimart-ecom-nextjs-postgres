export const getAllProducts = async () => {
  try {
    const response = await fetch(
      'https://multimart-fullstack.onrender.com/api/products',
      {
        mode: 'no-cors',
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const productsData = await response.json();
    return productsData.data;
  } catch (error) {
    console.error('An error occurred while getting the data:', error);
    throw error;
  }
};
