import { useState } from 'react';
import { updateUser } from '../../service/UserService'; // Ensure this function sends a PUT request to the backend

const UserEditForm = ({ user, onUpdateCompleted, onClose }) => {
    const [username, setUsername] = useState(user.username || '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email || '');
    const [address, setAddress] = useState(user.address || '');
    const [role, setRole] = useState(user.role || '');
    const [status, setStatus] = useState(user.status || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.id, { username, password, email, address, role, status }); // Backend API call
            alert('Cập nhật người dùng thành công!');
            onUpdateCompleted(); // Refresh the user list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
            alert('Không thể cập nhật người dùng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chỉnh sửa người dùng</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tên người dùng:
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Địa chỉ:
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Vai trò:
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Trạng thái:
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mật khẩu mới:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Quay lại
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditForm;