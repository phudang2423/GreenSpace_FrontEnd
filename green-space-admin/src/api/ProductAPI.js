export const fetchProducts = async () => {
	const response = await fetch("http://localhost:8080/products");
	return response.json();
  };
  
  export const deleteProduct = async (id) => {
	await fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" });
  };
  