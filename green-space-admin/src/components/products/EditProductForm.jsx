import { useState } from "react";

const EditProductForm = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [imagePreviews, setImagePreviews] = useState(product.images || []); // Hiển thị ảnh cũ
  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Cập nhật ảnh xem trước
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Giả lập upload ảnh lên Google Drive (Thay bằng API thực tế)
      const uploadedImageIds = imageFiles.length > 0 
        ? imageFiles.map((_, index) => `new_image_id_${index + 1}`) 
        : updatedProduct.images; // Giữ ảnh cũ nếu không upload mới

      await onUpdate({ ...updatedProduct, images: uploadedImageIds });
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-black">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={updatedProduct.name} onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Tên sản phẩm" />
          <input name="price" value={updatedProduct.price} type="number" onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Giá" />
          <input name="originalPrice" value={updatedProduct.originalPrice} type="number" onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Giá gốc" />
          <textarea name="description" value={updatedProduct.description} onChange={handleInputChange} className="w-full border p-2 mb-2 text-black resize-y" placeholder="Mô tả" />
          <input name="category" value={updatedProduct.category} onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Loại sản phẩm" />
          <input name="stockQuantity" value={updatedProduct.stockQuantity} type="number" onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Số lượng" />
          <input name="tags" value={updatedProduct.tags} onChange={handleInputChange} className="w-full border p-2 mb-2 text-black" placeholder="Tags" />

          <p className="text-black mb-2">Ảnh sản phẩm:</p>
          <div className="flex gap-2 mb-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
            ))}
          </div>

          <input type="file" multiple accept="image/*" className="w-full border p-2 mb-2 text-black" onChange={handleImageUpload} />

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
