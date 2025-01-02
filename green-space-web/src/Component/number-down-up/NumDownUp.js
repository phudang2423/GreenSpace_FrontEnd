import React, { Component } from 'react';

class NumDownUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1, // Số lượng ban đầu là 1
        };
    }

    // Hàm tăng số lượng
    increaseQuantity = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
        }));
    };

    // Hàm giảm số lượng
    decreaseQuantity = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
        }));
    };

    render() {
        const { quantity } = this.state;

        return (
            <div className="flex items-center gap-4">
            <p className='font-bold'>Số lượng:</p>
                {/* Nút giảm */}
                <button
                    onClick={this.decreaseQuantity}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                    -
                </button>

                {/* Hiển thị số lượng */}
                <span className="text-lg font-semibold">{quantity}</span>

                {/* Nút tăng */}
                <button
                    onClick={this.increaseQuantity}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                    +
                </button>
            </div>
        );
    }
}

export default NumDownUp;