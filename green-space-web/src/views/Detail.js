import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NumDownUp from "../Component/number-down-up/NumDownUp";
import Tabs from "../Component/TabInDetail/Tabs"; // Import Tabs component

const Detail = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Giới hạn chỉ số của ảnh hiện tại

  // Fetch product data based on the slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${slug}`);
        const data = await response.json();
        setProduct(data); // Lưu dữ liệu sản phẩm vào state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]); // Re-fetch when the slug changes

  // Auto slideshow
  useEffect(() => {
    if (!product || !product.imageUrl) return; // Chỉ chạy nếu có dữ liệu sản phẩm

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
    }, 8000); // Chuyển ảnh mỗi 8 giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [product]);

  const changeMainImage = (index) => {
    setCurrentIndex(index); // Thay đổi ảnh chính khi người dùng click vào ảnh nhỏ
  };

  if (!product) return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu

  // Tab data
  const tabData = [
    { id: "description", label: "Đặc điểm của cây", icon: "📄", content: <p>{product.description}</p> },
    { id: "about", label: "Cách chăm sóc cây", icon: "ℹ️", content: <p>Trống</p> },
    // { id: "promotion", label: "Đánh giá", icon: "🔥", content: <p>Trống</p> },
    // { id: "shipping", label: "Vận chuyển", icon: "🚚", content: <p>Trống</p> },
    { id: "warranty", label: "Đánh giá", icon: "🔧", content: <p>Trống</p> },
    {
      id: "faq",
      label: "Hỏi đáp",
      icon: "❓",
      content: (
        <div>
          <h3 className="font-bold text-lg mb-3">Hỏi Đáp Nhanh</h3>
          <ul>
            <li>Bao lâu thì cần tưới nước cho cây?</li>
            <li>Làm thế nào để biết cây thiếu nước?</li>
            <li>Tôi nên đặt cây ở đâu để cây phát triển tốt?</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="product-image ml-32">
          {/* Ảnh chính */}
          <img
            src={`https://drive.google.com/thumbnail?id=${product.imageUrl[currentIndex]}`}
            alt={product.name}
            className="w-full h-96 rounded-lg shadow-lg"
          />

          {/* Hình ảnh nhỏ bên dưới */}
          <div className="thumbnail-images mt-4 flex gap-4 justify-center">
            {product.imageUrl.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={`https://drive.google.com/thumbnail?id=${image}`}
                alt={`${product.name} thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => changeMainImage(index)} // Click vào ảnh nhỏ để thay đổi ảnh lớn
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-green-600">
              {new Intl.NumberFormat("vi-VN").format(product.price)} VNĐ
            </span>
            {product.price !== product.originalPrice && (
              <span className="text-sm line-through text-gray-500">
                {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} VNĐ
              </span>
            )}
          </div>

          {/* Số lượng còn lại */}
          <p className="text-lg text-gray-700 mb-4">Còn lại: {product.stockQuantity} sản phẩm</p>

          <div className="flex space-x-28 mb-8">
            <NumDownUp className="mb-2" />
          </div>

          {/* Thêm vào giỏ hàng và nút quay lại */}
          <div className="flex gap-4 mb-6">
            <button
              className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:text-white hover:bg-green-700 transition duration-300"
              onClick={() => alert("Thêm vào giỏ hàng")}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
              onClick={() => navigate("/")}
            >
              Mua hàng
            </button>
            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              onClick={() => navigate("/")}
            >
              Quay lại
            </button>
          </div>

          {/* Các nút chat với Zalo, Facebook */}
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300"
              onClick={() => alert("Chat với Zalo")}
            >
              Chat Zalo
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Component */}
      <div className="mt-10">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};

export default Detail;
