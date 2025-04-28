import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // URL backend của bạn

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
    return await axios.get(`${API_BASE_URL}/users`);
};

// Lấy người dùng theo ID
export const getUserById = async (id) => {
    return await axios.get(`${API_BASE_URL}/users/${id}`);
};

// Tạo mới người dùng
export const createUser = async (user) => {
    return await axios.post(`${API_BASE_URL}/users`, user);
};

// Cập nhật người dùng
export const updateUser = async (username, user) => {
    return await axios.put(`${API_BASE_URL}/users/${username}`, user);
};

// Xóa người dùng
export const deleteUser = async (id) => {
    return await axios.delete(`${API_BASE_URL}/users/${id}`);
};