import { useState } from 'react';
import { createUser } from '../../service/UserService'; // Ensure this function sends a POST request to the backend

const UserForm = ({ onUserCreated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({ username, password }); // Backend API call
            alert('Thêm người dùng thành công!');
            onUserCreated(); // Refresh the user list
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
            alert('Không thể thêm người dùng. Vui lòng thử lại.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 relative">
            <h2 className="text-2xl font-bold mb-4">Thêm người dùng</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên người dùng:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mật khẩu:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none px-3 py-2"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Thêm
            </button>
        </form>
    );
};

export default UserForm;