import React, { Component } from "react";
import Card from "../../Component/Card-Product/Card";
import Slideshow from "../../Component/Slide-Show/SlideShow";

class HomePage extends Component {
  state = {
    products: [],
    filteredProducts: [],
    filters: {
      type: "all",
      tags: [],
      price: { min: 50000, max: 1000000 },
    },
    noResults: false,
    username: "",
    isLoading: false,
  };

  componentDidMount() {
    this.fetchProducts();
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      this.setState({ username: storedUsername });
    }
  }

  fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const filteredByTag = data?.filter((product) => product.tags?.includes("cây cảnh")) || [];
      this.setState({
        products: filteredByTag,
        filteredProducts: filteredByTag,
        noResults: filteredByTag.length === 0,
      });
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      this.setState({ noResults: true });
    }
  };

  updateFilter = (key, value) => {
    this.setState(
      (prevState) => ({ filters: { ...prevState.filters, [key]: value } }),
      this.filterProducts
    );
  };

  filterProducts = () => {
    const { products, filters } = this.state;
    let filtered = [...products];

    if (filters.tags.length > 0) {
      filtered = filtered.filter((product) => filters.tags.every((tag) => product.tags?.includes(tag)));
    }

    if (filters.type !== "all") {
      filtered = filtered.filter((product) => product.type?.toLowerCase() === filters.type.toLowerCase());
    }

    const { min, max } = filters.price;
    filtered = filtered.filter((product) => product.price && product.price >= min && product.price <= max);

    this.setState({ filteredProducts: filtered, noResults: filtered.length === 0 });
  };

  formatCurrency = (value) => {
    return value.toLocaleString("vi-VN");
  };

  resetFilters = () => {
    this.setState({
      filters: { type: "all", tags: [], price: { min: 50000, max: 1000000 } },
    }, this.filterProducts);
  };

  render() {
    const { filteredProducts, filters, noResults } = this.state;

    return (
      <>
        <Slideshow />
        <div className="flex">
          <div className="flex-1 p-5 ml-1 flex items-start">
            <div className="mr-5 p-5 w-max bg-gray-100 rounded-lg shadow-md">
              <p className="text-xl font-bold mb-5 uppercase text-orange-600">Lọc Cây Cảnh</p>
              <div className="mb-4">
                <label className="text-lg font-medium text-gray-700">Giá</label>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="text-sm">Từ:</label>
                  <input type="number" min="50000" max={filters.price.max} step="1000" value={filters.price.min} onChange={(e) => this.updateFilter("price", { ...filters.price, min: Number(e.target.value) })} className="border rounded p-1 w-24 text-center" />
                  <span>VNĐ</span>
                </div>
                <input type="range" min="50000" max="1000000" value={filters.price.min} step="1000" onChange={(e) => this.updateFilter("price", { ...filters.price, min: Number(e.target.value) })} className="w-full mt-1" />
                <div className="mt-2 flex items-center space-x-2">
                  <label className="text-sm">Đến:</label>
                  <input type="number" min={filters.price.min} max="1000000" step="1000" value={filters.price.max} onChange={(e) => this.updateFilter("price", { ...filters.price, max: Number(e.target.value) })} className="border rounded p-1 w-24 text-center" />
                  <span>VNĐ</span>
                </div>
                <input type="range" min="50000" max="1000000" value={filters.price.max} step="1000" onChange={(e) => this.updateFilter("price", { ...filters.price, max: Number(e.target.value) })} className="w-full mt-1" />
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium text-gray-700">Tags</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["cây phong thủy", "hoa", "cây leo", "cây ngoài trời"].map((tag) => (
                    <div key={tag} className="flex items-center mb-2">
                      <input type="checkbox" id={tag} value={tag} checked={filters.tags.includes(tag)} onChange={() => {
                        const selectedTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag];
                        this.updateFilter("tags", selectedTags);
                      }} className="mr-2" />
                      <label htmlFor={tag} className="text-sm text-gray-700">{tag}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <h2 className="text-xl font-bold mb-5 uppercase text-green-600">Danh sách cây cảnh</h2>
              <hr className="-mt-5 border-orange-800 border-2" />
              {noResults ? (
                <div className="text-center">
                  <p className="text-lg text-red-500 font-semibold">Không có sản phẩm nào phù hợp.</p>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2" onClick={this.resetFilters}>Đặt lại bộ lọc</button>
                </div>
              ) : (
                <Card products={filteredProducts} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
