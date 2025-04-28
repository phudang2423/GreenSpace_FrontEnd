import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "./api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirmed) return;
  
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Đã xảy ra lỗi khi xóa sản phẩm.");
      console.error(err);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="border p-4 flex justify-between items-center rounded shadow-sm"
          >
            <span className="font-medium">{p.name}</span>
            <div>
              <Link
                to={`/admin/edit/${p.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Sửa
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(p.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
