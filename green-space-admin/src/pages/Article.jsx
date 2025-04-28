import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleManager() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = () => {
    axios.get('http://localhost:8080/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error('Lỗi khi lấy bài viết:', err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/articles/${id}`);
      setArticles(prev => prev.filter(article => article.id !== id));
      alert('✅ Xóa thành công!');
    } catch (error) {
      alert('❌ Lỗi khi xóa bài viết');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Quản lý bài viết</h1>
        <Link to="/admin/create" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + Tạo bài viết
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <div key={article.id} className="border rounded-lg shadow p-4 bg-white">
              <img src={article.thumbnailUrl} alt="Thumbnail" className="w-full h-40 object-cover rounded mb-3" />
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <div className="flex gap-2">
                <Link
                  to={`/admin/edit/${article.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sửa
                </Link>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleManager;
