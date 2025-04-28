import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  Button, Card, Tabs, Tab, Spinner } from 'react-bootstrap';
import { 
  BiEnvelope, 
  BiCalendar, 
  BiPencil, 
  BiShareAlt,
  BiHeart,
  BiChat,
  BiBookmark,
  BiStar
} from "react-icons/bi";

const PersonalPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('plants');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu người dùng');
        }
        const data = await response.json();
        if (data.code === 1000) {
          setUser(data.result);
        } else {
          throw new Error(data.message || 'Lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle update user
  const handleUpdateUser = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.code === 1000) {
        setUser(data.result);
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || 'Cập nhật không thành công');
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg">Không tìm thấy người dùng</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header với background xanh lá */}
      <div className="bg-green-800 text-white">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
              <img 
                src={user.avatar || 'https://via.placeholder.com/150'} 
                className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-lg" 
                alt="Avatar" 
              />
            </div>
            <div className="md:w-2/3 px-4 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="mb-1 flex items-center justify-center md:justify-start">
                <BiEnvelope className="mr-2" /> {user.email}
              </p>
              <p className="mb-1 flex items-center justify-center md:justify-start">
                <BiCalendar className="mr-2" /> Thành viên từ {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="md:w-1/6 mt-4 md:mt-0 flex justify-center md:justify-end space-x-2">
              <Button 
                variant="light" 
                className="bg-white text-green-800 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  const newName = prompt("Nhập tên mới:", user.name);
                  if (newName && newName !== user.name) {
                    handleUpdateUser({ name: newName }).then(result => {
                      if (result.success) {
                        alert(result.message);
                      } else {
                        alert(result.message);
                      }
                    });
                  }
                }}
              >
                <BiPencil className="mr-2" /> Chỉnh sửa
              </Button>
              <Button variant="outline-light" className="border-white text-white hover:bg-green-700 flex items-center">
                <BiShareAlt className="mr-2" /> Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin cá nhân */}
      <div className="container mx-auto my-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card className="mb-6 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="text-lg font-semibold text-green-800 mb-3">Giới thiệu</h5>
                <p className="text-gray-700 mb-4">
                  {user.bio || 'Chưa có thông tin giới thiệu.'}
                </p>
                
                <div className="flex justify-between mt-4 border-t pt-4">
                  <div className="text-center">
                    <h5 className="text-green-800 font-bold text-xl">{user.plantsCount || 0}</h5>
                    <p className="text-gray-500 text-sm">Cây cảnh</p>
                  </div>
                  <div className="text-center">
                    <h5 className="text-green-800 font-bold text-xl">{user.followers || 0}</h5>
                    <p className="text-gray-500 text-sm">Người theo dõi</p>
                  </div>
                  <div className="text-center">
                    <h5 className="text-green-800 font-bold text-xl">{user.following || 0}</h5>
                    <p className="text-gray-500 text-sm">Đang theo dõi</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h5 className="text-lg font-semibold text-green-800 mb-3">Thống kê hoạt động</h5>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <BiHeart className="text-red-500 mr-2" /> 
                    <span>{user.totalLikes || 0} lượt thích nhận được</span>
                  </p>
                  <p className="flex items-center">
                    <BiChat className="text-blue-500 mr-2" /> 
                    <span>{user.totalComments || 0} bình luận</span>
                  </p>
                  <p className="flex items-center">
                    <BiBookmark className="text-yellow-500 mr-2" /> 
                    <span>{user.savedPosts || 0} bài viết đã lưu</span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Card className="shadow-sm">
              <Card.Body className="p-0">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3 border-b"
                  fill
                >
                  <Tab 
                    eventKey="plants" 
                    title={
                      <span className={`flex items-center ${activeTab === 'plants' ? 'text-green-800 font-semibold' : 'text-gray-600'}`}>
                        <div className="mr-2" />
                        Cây cảnh của tôi
                      </span>
                    }
                  >
                    <div className="p-6 text-center text-gray-500">
                      <div className="text-4xl mb-3 text-gray-300 mx-auto" />
                      <p>Chức năng đang phát triển</p>
                    </div>
                  </Tab>
                  <Tab 
                    eventKey="favorites" 
                    title={
                      <span className={`flex items-center ${activeTab === 'favorites' ? 'text-green-800 font-semibold' : 'text-gray-600'}`}>
                        <BiHeart className="mr-2" />
                        Yêu thích
                      </span>
                    }
                  >
                    <div className="p-6 text-center text-gray-500">
                      <BiHeart className="text-4xl mb-3 text-gray-300 mx-auto" />
                      <p>Chức năng đang phát triển</p>
                    </div>
                  </Tab>
                  <Tab 
                    eventKey="reviews" 
                    title={
                      <span className={`flex items-center ${activeTab === 'reviews' ? 'text-green-800 font-semibold' : 'text-gray-600'}`}>
                        <BiStar className="mr-2" />
                        Đánh giá
                      </span>
                    }
                  >
                    <div className="p-6 text-center text-gray-500">
                      <BiStar className="text-4xl mb-3 text-gray-300 mx-auto" />
                      <p>Chức năng đang phát triển</p>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;