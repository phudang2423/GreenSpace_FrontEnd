import React from "react";

const DeliveryPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">Giao Hàng Tận Nơi</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Phạm Vi Giao Hàng</h2>
          <p className="text-lg leading-7">
            Hiện tại, cửa hàng hỗ trợ giao hàng tận nơi trong khu vực nội thành và các quận lân cận.
            Các khu vực khác sẽ được xem xét tùy theo đơn hàng và thỏa thuận trước.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Thời Gian Giao Hàng</h2>
          <ul className="list-disc ml-6 text-lg leading-7">
            <li>Giao trong ngày đối với đơn hàng nội thành (nếu đặt trước 14h).</li>
            <li>Đơn hàng đặt sau 14h sẽ được giao vào ngày hôm sau.</li>
            <li>Không giao hàng vào Chủ Nhật và ngày lễ.</li>
          </ul>
          <p className="mt-4 text-lg">
            Vì là cửa hàng nhỏ, chúng tôi sẽ gọi xác nhận đơn và hẹn thời gian giao cụ thể với bạn.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Phí Giao Hàng</h2>
          <ul className="list-disc ml-6 text-lg leading-7">
            <li>Miễn phí giao hàng với đơn từ 400.000đ trong khu vực nội thành.</li>
            <li>Đơn dưới 400.000đ: <strong>phụ phí 30.000đ</strong>.</li>
            <li>Chúng tôi sẽ thông báo phí cụ thể khi xác nhận đơn hàng.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Liên Hệ Giao Hàng</h2>
          <p className="text-lg leading-7 mb-2">
            Để biết tình trạng đơn hàng hoặc thay đổi thời gian nhận, bạn có thể liên hệ trực tiếp:
          </p>
          <ul className="list-disc ml-6 text-lg leading-7">
            <li>Hotline/Zalo: <strong className="text-orange-500">0123.456.789</strong> (8h – 17h)</li>
            <li>Facebook: <strong className="text-orange-500">fb.com/greenspace</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Lưu Ý Khi Nhận Hàng</h2>
          <p className="text-lg leading-7">
            Quý khách vui lòng kiểm tra sản phẩm khi nhận hàng. Nếu cây bị hư hại do vận chuyển, hãy liên hệ với chúng tôi trong vòng 24h để được hỗ trợ đổi sản phẩm hoặc hoàn tiền theo chính sách đổi trả.
          </p>
        </section>
      </div>
    </div>
  );
};

export default DeliveryPage;
