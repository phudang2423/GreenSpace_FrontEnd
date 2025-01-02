import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../../Component/Card-Product/Card";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");
    setQuery(searchQuery);

    // Gửi yêu cầu API tìm kiếm sản phẩm
    if (searchQuery) {
      axios
        .get(`http://localhost:8080/products/search?query=${encodeURIComponent(searchQuery)}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        });
    }
  }, [location.search]);

  return (
    <div className="py-6 px-3">
      <h1 className="text-xl">Kết quả tìm kiếm cho: {query}</h1>
      {products.length > 0 ? (
        <Card products={products} /> // Hiển thị sản phẩm tìm thấy
      ) : (
        <div>Không tìm thấy sản phẩm nào.</div>
      )}
    </div>
  );
};

export default SearchResults;
