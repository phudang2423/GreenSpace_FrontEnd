import "./App.scss";
import Nav from "./views/Nav/Nav";
import Sign from "./views/SignPage/Sign";
import HomePage from "./views/HomePage/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Login from "./views/LoginPage/Login";
import Detail from "./views/Detail";
import CartPage from "./views/CartPage/CartPage";
import Contact from "./views/ContactPage/Contact";
import RessetPassword from "./RessetPassword/ResetPassword";
import SearchResults from "./views/SearchResults/SearchResults";
import Return_And_Exchange from "./views/Policy/Return_And_Exchange";
import Accessory from "./views/Accessory/Accessory";
import { AuthProvider } from "./Component/Context/AuthContext";
import Chatbot from "./Component/Chatbot/Chatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleDetail from "./views/ArticleList/ArticleDetail";
import ArticleList from "./views/ArticleList/ArticleList";
import ScrollToTopButton from "./Component/ScrollToTopButton/ScrollToTopButton";
import PersonalPage from "./views/Profile/PersonalPage";
import CheckoutPage from "./views/CartPage/CheckoutPage";
import { LoadingProvider } from "./Component/Context/LoadingContext";
import OrderHistoryPage from "./views/Nav/OrderHistoryPage";
import ChangePassword from "./Component/Account/ChangePassword";
import DeliveryPage from "./views/Nav/DeliveryPage";
import VNPayPayment from "./views/Payment/VNPayPayment";
import PaymentResult from "./views/Payment/PaymentResult";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

const Layout = () => {
  const location = useLocation();
  const hideNavAndFooter = ["/Dang-nhap", "/Dang-ky"].includes(location.pathname);

  return (
    <AuthProvider>
      {!hideNavAndFooter && <Nav />}

      {/* ✅ Đã sửa đúng cách sử dụng LoadingProvider */}
      <LoadingProvider>
        <Chatbot />
        <ScrollToTopButton />
        <ToastContainer className="mt-36" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/products/:slug" element={<Detail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/Ho-tro" element={<Contact />} />
          <Route path="/RessetPassword" element={<RessetPassword />} />
          <Route path="/Chinh-sach-doi-tra-hang" element={<Return_And_Exchange />} />
          <Route path="/Cam-nang-cay-canh" element={<ArticleList />} />
          <Route path="/cam-nang/:id" element={<ArticleDetail />} />
          <Route path="/Phu-kien" element={<Accessory />} />
          <Route path="/Thong-tin-ca-nhan" element={<PersonalPage />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/Dang-ky" element={<Sign />} />
          <Route path="/Dang-nhap" element={<Login />} />
          <Route path="/lich-su-mua-hang" element={<OrderHistoryPage />} />
          <Route path="/Doi-mat-khau" element={<ChangePassword />} />
          <Route path="/Giao-hang-tan-noi" element={<DeliveryPage/>} />

          {/* Thanh toán VNPay */}
          <Route path="/payment/vnpay" element={<VNPayPayment />} />
          <Route path="/payment/result" element={<PaymentResult />} />
          {/* Các route khác */}

        </Routes>

        {!hideNavAndFooter && <Footer />}
      </LoadingProvider>
    </AuthProvider>
  );
};

export default App;
