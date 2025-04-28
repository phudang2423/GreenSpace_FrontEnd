import React, { createContext, useState } from "react";

// Tạo context giỏ hàng
export const CartContext = createContext();

// Tạo CartProvider để quản lý giỏ hàng và các hàm thao tác với giỏ hàng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProduct = prevCart.find(item => item.slug === product.slug);
      if (existingProduct) {
        return prevCart.map(item =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Hàm giảm số lượng sản phẩm trong giỏ hàng
  const removeFromCart = (slug) => {
    setCart((prevCart) => prevCart.filter(item => item.slug !== slug));
  };

  // Hàm thay đổi số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (slug, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
