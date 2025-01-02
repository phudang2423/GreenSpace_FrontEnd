import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ products }) => {
  const navigate = useNavigate();

  const goToPage = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-7">
      {products.map((product) => {
        const discountPercentage = (
          ((product.originalPrice - product.price) / product.originalPrice) *
          100
        ).toFixed(0);

        const displayDiscount = discountPercentage.endsWith(".00")
          ? parseInt(discountPercentage)
          : discountPercentage;

        // Safe check for imageUrl
        const imageUrl = product.imageUrl && product.imageUrl[0] ? product.imageUrl[0] : 'default-image-url.jpg';

        // Safe check for price, originalPrice, stockQuantity
        const price = product.price || 0;
        const originalPrice = product.originalPrice || 0;
        const stockQuantity = product.stockQuantity || 0;

        return (
          <div
            key={product.id} // Đây là key duy nhất cho mỗi phần tử
            className="w-full bg-stone-100 rounded-xl p-1 shadow-lg duration-300 hover:shadow-xl hover:scale-105 hover:bg-green-300"
          >
            <img
              src={`https://drive.google.com/thumbnail?id=${imageUrl}`}
              alt={product.name}
              className="h-72 object-cover rounded-xl"
            />
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <span>
                {new Intl.NumberFormat("vi-VN").format(price)} VNĐ
              </span>
              {price !== originalPrice && (
                <div className="flex items-center gap-1">
                  <span className="text-sm line-through opacity-75">
                    {new Intl.NumberFormat("vi-VN").format(originalPrice)} VNĐ
                  </span>
                  <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600 inline-block whitespace-nowrap ml-3">
                    Giảm {displayDiscount}%
                  </span>
                </div>
              )}
              {/* <div className="flex items-center mt-2 gap-1">
                Còn: {stockQuantity} sản phẩm
              </div> */}
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={() => goToPage(product.slug)}
                className="px-5 py-1 rounded-lg text-xl font-bold bg-gray-300 hover:bg-green-500 hover:text-white"
              >
                Xem
              </button>
              <button className="px-4 py-1 rounded-lg font-bold text-xl bg-gray-300 hover:bg-green-500 hover:text-white">
                <img
                  src="https://res.cloudinary.com/dhax0ee73/image/upload/f_auto,q_auto/v1/green-space/gycavzuncbod0r49kixq"
                  alt="Cart"
                  className="w-6"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
