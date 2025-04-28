import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../service/UserService';
import UserEditForm from '../../components/users/UserEdit';

const UserList = () => {
    const [users, setUsers] = useState([]); // Danh sách người dùng
    const [editingUser, setEditingUser] = useState(null); // Người dùng đang chỉnh sửa
    const [viewingUser, setViewingUser] = useState(null); // Người dùng đang xem chi tiết

    // Lấy danh sách người dùng từ backend
    const fetchUsers = async () => {
        try {
            const response = await getUsers(); // Gọi API lấy danh sách người dùng
            setUsers(response.data.result); // Cập nhật state với danh sách người dùng
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Gọi hàm lấy danh sách người dùng khi component được mount
    }, []);

    // Xử lý khi nhấn nút "Sửa"
    const handleEdit = (user) => {
        setEditingUser(user); // Lưu thông tin người dùng đang chỉnh sửa
    };

    // Xử lý khi chỉnh sửa hoàn tất
    const handleEditCompleted = () => {
        setEditingUser(null); // Đóng form chỉnh sửa
        fetchUsers(); // Làm mới danh sách người dùng
    };

    // Xử lý khi nhấn nút "Xóa"
    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId); // Gọi API xóa người dùng
            alert('Xóa người dùng thành công!');
            fetchUsers(); // Làm mới danh sách người dùng
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Không thể xóa người dùng. Vui lòng thử lại.');
        }
    };

    // Xử lý khi nhấn nút "Xem chi tiết"
    const handleView = (user) => {
        setViewingUser(user); // Lưu thông tin người dùng đang xem chi tiết
    };

    return (
        <div className="mt-6 relative">
            <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Tên</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-700">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleView(user)}
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                >
                                    Xem chi tiết
                                </button>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Hiển thị form chỉnh sửa nếu có người dùng đang được chỉnh sửa */}
            {editingUser && (
                <UserEditForm
                    user={editingUser}
                    onUpdateCompleted={handleEditCompleted}
                    onClose={() => setEditingUser(null)}
                />
            )}

            {/* Hiển thị modal chi tiết người dùng */}
            {viewingUser && (
                <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin chi tiết</h2>
                        <div className="mb-4">
                            <p><strong>ID:</strong> {viewingUser.id}</p>
                            <p><strong>Tên người dùng:</strong> {viewingUser.username}</p>
                            <p><strong>Email:</strong> {viewingUser.email}</p>
                            <p><strong>Địa chỉ:</strong> {viewingUser.address}</p> {/* Thêm địa chỉ */}
                            <p><strong>Vai trò:</strong> {viewingUser.role}</p>
                            <p><strong>Trạng thái:</strong> {viewingUser.status}</p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setViewingUser(null)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;