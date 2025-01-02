import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import debounce from "lodash.debounce"; // Thêm debounce

const SearchComponent = () => {
  const [query, setQuery] = useState(""); // Trạng thái lưu trữ từ khóa tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // Trạng thái lưu trữ gợi ý tìm kiếm
  const [showSuggestions, setShowSuggestions] = useState(false); // Trạng thái hiển thị gợi ý
  const navigate = useNavigate(); // Dùng để điều hướng
  const inputRef = useRef(null); // Tham chiếu đến input
  const suggestionsRef = useRef(null); // Tham chiếu đến danh sách gợi ý

  // Hàm tìm kiếm khi người dùng nhấn Enter hoặc submit form
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Điều hướng đến trang kết quả tìm kiếm với query trong URL
      navigate(`/search-results?query=${encodeURIComponent(query)}`);
      setShowSuggestions(false); // Ẩn gợi ý khi tìm kiếm
    }
  };

  // Hàm để lấy gợi ý từ API khi người dùng nhập từ khóa
  const fetchSuggestions = async (value) => {
    if (value.trim()) {
      try {
        // Gửi yêu cầu API tìm kiếm gợi ý (tùy thuộc vào backend)
        const response = await axios.get(`http://localhost:8080/products/autocomplete?query=${encodeURIComponent(value)}`);
        setSuggestions(response.data); // Cập nhật gợi ý
        setShowSuggestions(true); // Hiển thị gợi ý
      } catch (error) {
        console.error("Lỗi khi tìm kiếm gợi ý:", error);
      }
    } else {
      setSuggestions([]); // Nếu không có từ khóa, xóa gợi ý
      setShowSuggestions(false);
    }
  };

  // Dùng debounce để hạn chế gọi API liên tục
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  // Hàm xử lý khi người dùng nhập từ khóa
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value); // Gọi hàm fetchSuggestions với debounce
  };

  // Hàm để chọn gợi ý và chuyển đến trang kết quả
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search-results?query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false); // Ẩn gợi ý khi chọn
  };

  // Hàm kiểm tra nhấn ngoài để ẩn gợi ý
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  // Dùng useEffect để lắng nghe sự kiện nhấn ngoài
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Dọn dẹp khi component unmount
    };
  }, []);

  return (
    <div className="hidden md:flex grow justify-center ml-4 relative"> {/* Thêm relative */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-lg overflow-hidden w-full max-w-xl"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange} // Cập nhật khi người dùng nhập
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-grow px-4 py-2 text-black focus:outline-none text-xl"
          ref={inputRef}
        />
        <button
          type="submit"
          className="px-4 py-4 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center"
        >
          <CiSearch className="scale-150 text-xl" />
        </button>
      </form>

      {/* Hiển thị các gợi ý tìm kiếm */}
      {showSuggestions && suggestions.length > 0 && (
        <ul ref={suggestionsRef} className="absolute bg-white border rounded-lg mt-11 w-full max-w-xl z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-green-300 cursor-pointer "
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Thông báo khi không có gợi ý nào */}
      {showSuggestions && suggestions.length === 0 && query.trim() && (
        <div className="absolute bg-white border rounded-lg mt-11 w-full max-w-xl z-10">
          <p className="px-4 py-2 text-gray-500">Không có kết quả nào</p>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
