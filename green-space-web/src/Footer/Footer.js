import React, { Component } from "react";
import { SiZalo } from "react-icons/si";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically
    return (
      <>
        <footer className="bg-green-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-left lg:text-left">
              {/* About Section */}
              <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
                <h4 className="text-3xl font-semibold">Green Space</h4>
                <p className="text-lg mt-4">
                  Chúng tôi chuyên cung cấp các loại cây cảnh chất lượng cao,
                  phụ kiện làm vườn và dịch vụ tư vấn chăm sóc cây.
                </p>
                <p className="mt-4">
                  <strong>Địa chỉ:</strong> Phúc Yên, Vĩnh Phúc
                </p>
                <p>
                  <strong>Liên hệ:</strong> 0123-456-789
                </p>
                <p>
                  <strong>Giờ làm việc:</strong> Thứ 2 - Chủ Nhật: 8h - 20h
                </p>
              </div>

              {/* Social Media Section */}
              <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
                <h5 className="text-xl font-semibold mb-4">Kết nối với chúng tôi</h5>
                <div className="flex space-x-4">
                  <NavLink
                    href="#"
                    className="bg-white text-green-600 p-2 rounded-full shadow-md"
                    aria-label="Follow us on Zalo"
                  >
                    <SiZalo size={24} />
                  </NavLink>
                  <NavLink
                    href="#"
                    className="bg-white text-blue-600 p-2 rounded-full shadow-md"
                    aria-label="Follow us on Facebook"
                  >
                    <FaFacebookF size={24} />
                  </NavLink>
                  <NavLink
                    href="#"
                    className="bg-white text-pink-600 p-2 rounded-full shadow-md"
                    aria-label="Follow us on Instagram"
                  >
                    <FaInstagram size={24} />
                  </NavLink>
                  <NavLink
                    href="#"
                    className="bg-white text-red-600 p-2 rounded-full shadow-md"
                    aria-label="Follow us on YouTube"
                  >
                    <FaYoutube size={24} />
                  </NavLink>
                </div>
              </div>

              {/* Useful Links */}
              <div className="w-full lg:w-4/12 px-4">
                <h5 className="text-xl font-semibold mb-4">Liên kết hữu ích</h5>
                <ul className="list-unstyled space-y-2">
                  <li>
                    <NavLink
                      className="hover:underline"
                      to="/"
                    >
                      Sản phẩm cây cảnh
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="hover:underline"
                      to="/Cam-nang-cay-canh"
                    >
                      Blog cây cảnh
                    </NavLink>
                  </li>

                  <li>
                    <a
                      className="hover:underline"
                      href="/Ho-tro"
                    >
                      Liên hệ chúng tôi
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
                <h5 className="text-xl font-semibold mb-4">GOOGLE MAP</h5>
                
            </div>

            {/* Footer Bottom */}
            <hr className="my-6 border-green-400" />
            <div className="flex justify-center">
              <p className="text-sm">
                © {currentYear} Green Space. Tất cả các quyền được bảo lưu.
              </p>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
