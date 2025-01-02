import React, { Component } from 'react';

class DownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: "vừa", // Giá trị mặc định
        };
    }

    handleSizeChange = (event) => {
        this.setState({ selectedSize: event.target.value });
        // Gửi giá trị đã chọn cho component cha nếu cần
        if (this.props.onSizeChange) {
            this.props.onSizeChange(event.target.value);
        }
    };

    render() {
        const { selectedSize } = this.state;

        return (
            <div className="relative inline-block">
                <label htmlFor="size-dropdown" className="block mb-2 text-gray-700 font-medium">
                    Kích cỡ
                </label>
                <select
                    id="size-dropdown"
                    value={selectedSize}
                    onChange={this.handleSizeChange}
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="nhỏ">Nhỏ</option>
                    <option value="vừa">Vừa</option>
                    <option value="lớn">Lớn</option>
                </select>
                <p className="mt-2 text-gray-600">Bạn đã chọn kích cỡ: {selectedSize}</p>
            </div>
        );
    }
}

export default DownList;