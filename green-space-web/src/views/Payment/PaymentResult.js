import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        const response = await axios.get("http://localhost:8080/api/v1/payment/callback", { params });

        if (response.data.success) {
          setPaymentStatus("success");
          setOrderInfo(response.data.orderInfo);
        } else {
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Lỗi xác minh thanh toán:", error);
        setPaymentStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        {paymentStatus === "success" ? (
          <>
            <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-green-600 mt-4">Thanh Toán Thành Công</h2>
            <div className="mt-4">
              <p><strong>Mã đơn hàng:</strong> {orderInfo?.orderCode}</p>
              <p><strong>Số tiền:</strong> {orderInfo?.amount} VNĐ</p>
              <p><strong>Thời gian:</strong> {orderInfo?.payDate}</p>
            </div>
          </>
        ) : paymentStatus === "failed" ? (
          <>
            <XCircleIcon className="h-16 w-16 text-red-600 mx-auto" />
            <h2 className="text-2xl font-bold text-red-600 mt-4">Thanh Toán Không Thành Công</h2>
          </>
        ) : (
          <p>Đang xác minh kết quả thanh toán...</p>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Về Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;