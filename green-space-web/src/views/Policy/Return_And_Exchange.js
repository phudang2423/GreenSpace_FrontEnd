import React, { Component } from 'react';  

class ReturnAndExchange extends Component {  
    render() {  
        return (  
            <div className="bg-gray-300 min-h-screen flex items-center justify-center py-10">  
                <div className="container max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">  
                    <div className="p-6">  
                        <h1 className="text-3xl font-bold text-amber-600 mb-4">Green Space: Cây cảnh tươi tốt - Cam kết bảo hành</h1>  
                        <p className="text-gray-700 text-lg">  
                            Nhằm đảm bảo quyền lợi cho khách hàng khi mua sản phẩm tại website cây cảnh của chúng tôi, chính sách đổi/trả hàng được áp dụng như sau:  
                        </p>  
                        <p className='font-bold text-2xl mt-7 text-black'>1. Điều kiện đổi, trả hàng</p>  
                        <ul className="mt-1 list-disc list-inside text-black text-lg font-medium">
                            <li>Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng, và còn nguyên bao bì, tem mác.</li>  
                            <li>Sản phẩm bị lỗi do nhà sản xuất hoặc hư hại trong quá trình vận chuyển.</li>  
                            <li>Yêu cầu đổi/trả hàng được thực hiện trong vòng 7 ngày kể từ ngày nhận hàng.</li>  
                        </ul>  

                        <p className='font-bold text-2xl mt-7 text-black'>2. Trường hợp không được đổi/trả hàng</p>  
                        <ul className="mt-1 list-disc list-inside text-black text-lg font-medium">
                            <li>Sản phẩm bị hư hỏng do lỗi từ phía khách hàng (rơi, vỡ, sử dụng sai cách,...).</li>  
                            <li>Sản phẩm đã qua sử dụng hoặc đã hết thời gian quy định đổi/trả.</li>  
                            <li>Sản phẩm không đủ chứng từ mua hàng (hóa đơn, phiếu giao hàng).</li>  
                        </ul>

                        <p className='font-bold text-2xl mt-7 text-black'>3. Quy trình đổi/trả hàng</p>  
                        <ul className="mt-1 list-disc list-inside text-black text-lg font-medium">
                            <li>Bước 1: Liên hệ bộ phận hỗ trợ khách hàng qua hotline hoặc email:</li>  
                            <ul className='ml-10 list-square list-inside'>
                                <li className='text-orange-500'>Hotline: 0123.456.789</li>
                                <li className='text-orange-500'>Email: support@greenspace.com</li>
                            </ul>
                            <li>Bước 2: Cung cấp thông tin cần thiết:</li>  
                            <ul className='ml-10 list-square list-inside'>
                                <li>Hình ảnh sản phẩm bị lỗi.</li>
                                <li>Hóa đơn mua hàng hoặc phiếu giao hàng.</li>
                            </ul>
                            <li>Bước 3: Gửi sản phẩm về địa chỉ bảo hành của chúng tôi:</li>  
                            <ul className='ml-10 list-square list-inside'>
                                <li className='text-orange-500'>Địa chỉ: Phúc Yên, Vĩnh Phúc</li>
                            </ul>
                            <li>Bước 4: Sau khi nhận được sản phẩm, chúng tôi sẽ kiểm tra và tiến hành đổi/trả trong vòng 3-5 ngày làm việc.</li>
                        </ul>

                        <p className='font-bold text-2xl mt-7 text-black'>4. Hình thức hoàn tiền</p>  
                        <ul className="mt-1 list-disc list-inside text-black text-lg font-medium">
                            <li>Hoàn tiền qua tài khoản ngân hàng hoặc thanh toán trực tuyến.</li>  
                            <li>Thời gian hoàn tiền: Trong vòng 7-10 ngày làm việc kể từ khi hoàn tất quy trình kiểm tra.</li>  
                        </ul>

                        <p className='mt-10 text-orange-500 text-2xl uppercase text-center '>Mọi thông tin chi tiết, vui lòng liên hệ bộ phận hỗ trợ khách hàng để được tư vấn và hỗ trợ nhanh chóng.</p>
                    </div>  

                </div>  
            </div>  
        );  
    }  
}  

export default ReturnAndExchange;