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

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

const Layout = () => {
  const location = useLocation();
  const showNavAndFooter = !["/SignIn", "/LoginPage"].includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <Nav />}
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/products/:slug" element={<Detail />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/RessetPassword" element={<RessetPassword />} />
        <Route path="/SignIn" element={<Sign />} />
        <Route path="/LoginPage" element={<Login />} />
      </Routes>
      {showNavAndFooter && <Footer />}
    </>
  );
}

export default App;
