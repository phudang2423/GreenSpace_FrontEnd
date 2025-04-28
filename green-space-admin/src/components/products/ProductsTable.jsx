import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct, createProduct } from "./Api";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [, setEditingProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // Lưu ảnh xem trước

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    stockQuantity: "",
    tags: "",
    images: [], // Lưu danh sách image IDs từ Google Drive
  });

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.ok) {
        setProducts(await fetchProducts());
      } else {
        console.error("Lỗi khi xóa sản phẩm:", await response.text());
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setTimeout(() => {
      setEditingProduct(product);
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Chỉ lấy tối đa 3 ảnh
    setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Tạo ảnh xem trước

    try {
      // Giả lập upload ảnh lên Google Drive (Thay bằng API thực tế)
      const uploadedImageIds = files.map((_, index) => `image_id_${index + 1}`);
      setNewProduct({ ...newProduct, images: uploadedImageIds });
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setShowForm(false);
      setProducts(await fetchProducts());
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>
          Thêm sản phẩm
        </button>
      </div>

      <div className="overflow-y-auto max-h-96 border border-gray-700 rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border-2 border-gray-700 px-4 py-2 text-black">ID</th>
              <th className="border-2 border-gray-700 px-4 py-2 text-black">Tên</th>
              <th className="border-2 border-gray-700 px-4 py-2 text-black">Giá</th>
              <th className="border-2 border-gray-700 px-4 py-2 text-black">Tồn kho</th>
              <th className="border-2 border-gray-700 px-4 py-2 text-black">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId} className="border border-gray-700">
                <td className="border border-gray-700 px-4 py-2 text-center">{p.productId}</td>
                <td className="border border-gray-700 px-4 py-2">{p.name}</td>
                <td className="border border-gray-700 px-4 py-2 text-center">{p.price}</td>
                <td className="border border-gray-700 px-4 py-2 text-center">{p.stockQuantity}</td>
                <td className="border border-gray-700 px-4 py-2 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(p)}>Sửa</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(p.productId)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-black">Thêm sản phẩm</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Tên sản phẩm" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />
              <input name="price" type="number" placeholder="Giá gốc" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />
              <input name="originalPrice" type="number" placeholder="Giá sau giảm" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />
              <textarea name="description" placeholder="Mô tả" className="w-full border p-2 mb-2 text-black resize-y" onChange={handleInputChange} />
              <input name="category" placeholder="Loại sản phẩm" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />
              <input name="stockQuantity" type="number" placeholder="Số lượng" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />
              <input name="tags" placeholder="Tags" className="w-full border p-2 mb-2 text-black" onChange={handleInputChange} />

              <input type="file" multiple accept="image/*" className="w-full border p-2 mb-2 text-black" onChange={handleImageUpload} />
              
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mb-2">
                  {imagePreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
