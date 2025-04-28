import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Hàm lấy 2 đoạn đầu tiên từ content HTML
  const getPreviewText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p'));
    const firstTwo = paragraphs.slice(0, 2).map(p => p.outerHTML).join('');
    return firstTwo || '<p>(Không có đoạn văn mô tả)</p>';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-green-700 border-b-2 ">Cẩm nang cây cảnh</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(article => (
          <Link
            key={article.id}
            to={`/cam-nang/${article.id}`}
            className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={article.thumbnailUrl}
              alt="thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 max-h-40">
              <h2 className="text-xl font-semibold mb-2 text-orange-600">{article.title}</h2>
              <div
                className="text-gray-700 text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: getPreviewText(article.content) }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
