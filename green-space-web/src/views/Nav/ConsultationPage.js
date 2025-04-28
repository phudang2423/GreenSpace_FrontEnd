import React from "react";

const ConsultationPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
          Tư Vấn Chọn Cây Miễn Phí
        </h1>

        {/* Phần giới thiệu cửa hàng nhỏ */}
        <p className="text-lg leading-7 mb-6">
          <strong>Greenspace</strong> là một cửa hàng cây cảnh nhỏ, do gia đình tự trồng và chăm sóc. 
          Với kinh nghiệm thực tế và niềm đam mê cây xanh, chúng tôi luôn sẵn sàng chia sẻ kiến thức 
          để giúp bạn chọn được loại cây phù hợp nhất với không gian sống và nhu cầu của mình.
        </p>

        <p className="text-lg leading-7 mb-6">
          Bạn đang băn khoăn không biết chọn loại cây nào phù hợp với không gian sống, phong thủy, 
          hay mục đích sử dụng của mình? Đừng lo lắng, chúng tôi cung cấp dịch vụ tư vấn chọn cây 
          hoàn toàn miễn phí để giúp bạn tìm được loại cây ưng ý nhất.
        </p>

        <p className="text-lg leading-7 mb-6">
          Chúng tôi sẽ hỗ trợ bạn lựa chọn cây phù hợp với:
        </p>
        <ul className="list-disc ml-6 text-lg leading-7 mb-6">
          <li>Không gian sống (phòng khách, phòng làm việc, ban công, sân vườn, v.v.).</li>
          <li>Yếu tố phong thủy, mang lại tài lộc và may mắn.</li>
          <li>Mục đích sử dụng (trang trí, thanh lọc không khí, làm quà tặng, v.v.).</li>
        </ul>

        <p className="text-lg leading-7 mb-6">
          Hãy liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhanh chóng!
        </p>

        <div className="flex flex-col items-center space-y-4">
          <a
            href="https://zalo.me/0123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
          >
            Liên hệ qua Zalo
          </a>
          <a
            href="https://m.me/greenspace"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Liên hệ qua Messenger
          </a>
          <a
            href="tel:0123456789"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
          >
            Gọi ngay: <span className="text-orange-500">0123.456.789</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
