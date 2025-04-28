import React from 'react';

const NumDownUp = ({ quantity, setQuantity }) => {
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="flex items-center gap-4">
            <p className='font-bold'>Số lượng:</p>

            <button
                onClick={decreaseQuantity}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
                -
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
                onClick={increaseQuantity}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
                +
            </button>
        </div>
    );
};

export default NumDownUp;
