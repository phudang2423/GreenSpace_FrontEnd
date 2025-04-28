import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  // Định nghĩa hàm formatDate trước khi sử dụng
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Xử lý khi dateString không tồn tại
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy h:mm:ss a');
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <div className="p-4">Đang tải bài viết...</div>;

  // Gọi hàm formatDate sau khi article đã có dữ liệu
  const formattedDate = formatDate(article.createdAt);

  return (
    <div className="max-w-article-page mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">{article.title}</h1>
      <h4 className='text-gray-400'>{formattedDate}</h4>
      {article.thumbnailUrl && (
        <img 
          src={article.thumbnailUrl} 
          alt="thumbnail" 
          className="w-full h-auto mb-6 rounded shadow" 
        />
      )}
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </div>
  );
}

export default ArticleDetail;