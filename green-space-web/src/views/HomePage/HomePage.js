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
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      // Chỉ lấy các sản phẩm có tag "cây cảnh"
      const filteredByTag = data.filter((product) => product.tags.includes("cây cảnh"));
      this.setState({
        products: filteredByTag,
        filteredProducts: filteredByTag,
        noResults: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  updateFilter = (key, value) => {
    const { filters } = this.state;
    const updatedFilters = { ...filters, [key]: value };
    this.setState({ filters: updatedFilters }, this.filterProducts);
  };

  filterProducts = () => {
    const { products, filters } = this.state;
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

    if (filtered.length === 0) {
      this.setState({ noResults: true });
    } else {
      this.setState({ noResults: false });
    }

    this.setState({ filteredProducts: filtered });
  };

  formatCurrency = (value) => {
    return value.toLocaleString("vi-VN"); // Định dạng theo kiểu Việt Nam
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
                <div className="mt-2">
                  {/* Hiển thị giá trị min */}
                  <label className="text-sm">
                    Từ: {this.formatCurrency(filters.price.min)} VNĐ
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    value={filters.price.min}
                    step="1000"
                    onChange={(e) =>
                      this.updateFilter("price", { ...filters.price, min: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
                <div className="mt-2">
                  {/* Hiển thị giá trị max */}
                  <label className="text-sm">
                    Đến: {this.formatCurrency(filters.price.max)} VNĐ
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    value={filters.price.max}
                    step="1000"
                    onChange={(e) =>
                      this.updateFilter("price", { ...filters.price, max: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium text-gray-700">Tags</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "cây phong thủy",
                    "hoa",
                    "cây leo",
                    "cây ngoài trời",
                  ].map((tag) => (
                    <div key={tag} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={tag}
                        value={tag}
                        checked={filters.tags.includes(tag)}
                        onChange={(e) => {
                          const selectedTags = filters.tags.includes(tag)
                            ? filters.tags.filter((t) => t !== tag)
                            : [...filters.tags, tag];
                          this.updateFilter("tags", selectedTags);
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
              <h2 className="text-xl font-bold mb-5 uppercase text-green-600">Danh sách cây cảnh</h2>
              <hr className="-mt-5 border-orange-800 border-2" />
              {noResults ? (
                <p className="text-lg text-red-500 font-semibold">Không có sản phẩm nào phù hợp.</p>
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
