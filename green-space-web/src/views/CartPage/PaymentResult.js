import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart, FaHome, FaHistory } from 'react-icons/fa';

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData || null;

  useEffect(() => {
    if (!orderData) {
      // Nếu không có dữ liệu đơn hàng, chuyển hướng về trang chủ
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null; // Hoặc hiển thị loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi</p>
          </div>

          {/* Order Summary */}
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin đơn hàng</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium">{orderData.orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày đặt:</span>
                <span className="font-medium">
                  {new Date(orderData.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="font-medium text-green-600">
                  {orderData.totalAmount.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-medium">{orderData.paymentMethod || 'COD'}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin giao hàng</h2>
            <p className="text-gray-600">{orderData.shippingAddress}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            >
              <FaHome className="mr-2" />
              Về trang chủ
            </button>
            <button
              onClick={() => navigate('/order-history')}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
            >
              <FaHistory className="mr-2" />
              Xem đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;