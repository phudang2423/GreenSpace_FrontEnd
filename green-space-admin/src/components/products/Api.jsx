const API_BASE_URL = "http://localhost:8080/products";
const API_DRIVE_URL = "http://localhost:8080/api/drive/upload";

// Lấy danh sách sản phẩm
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

// Thêm sản phẩm
export const createProduct = async (product) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Lỗi khi thêm sản phẩm");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Tải ảnh lên Google Drive
export const uploadImages = async (files, productSlug) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("productSlug", productSlug);

  const response = await fetch(API_DRIVE_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Lỗi khi tải ảnh lên Google Drive");
  return await response.json();
};

// Cập nhật sản phẩm
export const editProduct = async (product, files) => {
  try {
    if (files.length > 0) {
      const uploadedData = await uploadImages(files, product.slug);
      product.imageUrls = uploadedData.imageUrls;
    }

    const response = await fetch(`${API_BASE_URL}/${product.productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Lỗi khi cập nhật sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    throw error;
  }
};

