import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../Component/Card-Product/Card';

const Accessory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    tags: [],
    price: { min: 50000, max: 1000000 },
  });
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");

  const tagOptions = [
    "Trang trí", "Chậu cây", "Chậu treo", "Bình phun",
    "Dụng cụ làm vườn", "Chậu 12 con giáp", "Chậu phong thủy"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      const filteredByTag = data.filter((product) => product.tags && product.tags.includes("Phụ kiện"));
      setProducts(filteredByTag);
      setFilteredProducts(filteredByTag);
      setNoResults(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateFilter = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        filters.tags.every((tag) => product.tags.includes(tag))
      );
    }
    if (filters.type !== "all") {
      filtered = filtered.filter((product) => product.type === filters.type);
    }

    const { min, max } = filters.price;
    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max
    );

    setFilteredProducts(filtered);
    setNoResults(filtered.length === 0);
  };

  const toggleAllTags = () => {
    if (filters.tags.length === tagOptions.length) {
      updateFilter("tags", []);
    } else {
      updateFilter("tags", tagOptions);
    }
  };

  const handleAddToCart = async (product) => {
    if (!username) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/cart/add", {
        username: username,
        productId: product.id,
        quantity: 1,
      });
      alert(response.data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex">
            <div className="flex-1 p-5 ml-1 flex items-start">
              <div className="mr-5 p-5 w-max bg-gray-100 rounded-lg shadow-md">
                <p className="text-xl font-bold mb-5 uppercase text-orange-600">Lọc Phụ Kiện</p>
                <div className="mb-4">
                  <label className="text-lg font-medium text-gray-700">Giá</label>
                  <div className="mt-2 flex items-center space-x-2">
                    <label className="text-sm">Từ:</label>
                    <input
                      type="number"
                      min="50000"
                      max={filters.price.max}
                      step="1000"
                      value={filters.price.min}
                      onChange={(e) => updateFilter("price", { ...filters.price, min: Number(e.target.value) })}
                      className="border rounded p-1 w-24 text-center"
                    />
                    <span>VNĐ</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    value={filters.price.min}
                    step="1000"
                    onChange={(e) => updateFilter("price", { ...filters.price, min: Number(e.target.value) })}
                    className="w-full mt-1"
                  />
                  <div className="mt-2 flex items-center space-x-2">
                    <label className="text-sm">Đến:</label>
                    <input
                      type="number"
                      min={filters.price.min}
                      max="1000000"
                      step="1000"
                      value={filters.price.max}
                      onChange={(e) => updateFilter("price", { ...filters.price, max: Number(e.target.value) })}
                      className="border rounded p-1 w-24 text-center"
                    />
                    <span>VNĐ</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    value={filters.price.max}
                    step="1000"
                    onChange={(e) => updateFilter("price", { ...filters.price, max: Number(e.target.value) })}
                    className="w-full mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-lg font-medium text-gray-700">Tags</label>
                  <div>
                    <button
                      className="text-sm font-medium text-blue-600 underline mb-2"
                      onClick={toggleAllTags}
                    >
                      {filters.tags.length === tagOptions.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tagOptions.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          id={tag}
                          value={tag}
                          checked={filters.tags.includes(tag)}
                          onChange={(e) => {
                            const selectedTags = filters.tags.includes(tag)
                              ? filters.tags.filter((t) => t !== tag)
                              : [...filters.tags, tag];
                            updateFilter("tags", selectedTags);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={tag} className="text-sm text-gray-700">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-3/4">
                <h2 className="text-xl font-bold mb-5 uppercase text-green-600">Danh sách Phụ Kiện</h2>
                <hr className="-mt-5 border-orange-800 border-2" />
                {noResults ? (
                  <p className="text-lg text-red-500 font-semibold">Không có sản phẩm nào phù hợp.</p>
                ) : (
                  <Card products={filteredProducts} onAddToCart={handleAddToCart} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Accessory;