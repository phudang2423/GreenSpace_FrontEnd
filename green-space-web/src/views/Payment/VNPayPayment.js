import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VNPayPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData; // Dữ liệu đơn hàng từ trang checkout
  const [isProcessing, setIsProcessing] = useState(false);

  const getOrderInfo = () => {
    if (orderData) return orderData;

    const savedOrder = localStorage.getItem("currentOrder");
    return savedOrder ? JSON.parse(savedOrder) : null;
  };

  const handleVNPayPayment = async () => {
    const order = getOrderInfo();
    if (!order) {
      toast.error('Không tìm thấy thông tin đơn hàng');
      navigate('/checkout');
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/payment/create-vnpay', {
        amount: order.totalAmount,
        orderInfo: `Thanh toán đơn hàng #${order.orderCode}`,
        orderType: 'PLANT_ORDER',
        orderId: order.orderCode
      });

      if (response.data.paymentUrl) {
        // Lưu thông tin đơn hàng vào localStorage trước khi chuyển hướng
        localStorage.setItem('pendingOrder', JSON.stringify(order));
        //localStorage.removeItem("currentOrder");
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error('Không nhận được URL thanh toán từ hệ thống');
      }
    } catch (error) {
      console.error('Lỗi khi tạo thanh toán:', error);
      toast.error(error.response?.data?.message || 'Lỗi khi khởi tạo thanh toán');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Tự động gọi thanh toán khi component mount
    handleVNPayPayment();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Đang chuyển hướng đến VNPay</h2>
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">Hệ thống đang chuẩn bị thanh toán</p>
            <button
              onClick={handleVNPayPayment}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              Thử lại
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Bạn sẽ được chuyển đến trang thanh toán VNPay. Vui lòng không tắt trình duyệt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VNPayPayment;