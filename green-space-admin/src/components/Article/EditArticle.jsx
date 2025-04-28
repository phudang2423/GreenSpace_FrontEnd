import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quillRef = useRef();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/articles/${id}`);
        setTitle(res.data.title);
        setThumbnailUrl(res.data.thumbnailUrl);
        setContent(res.data.content);
      } catch (err) {
        alert('Không thể tải bài viết');
      }
    };
    fetchArticle();
  }, [id]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ align: [] }], // Thêm dropdown căn lề
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
      ],
      handlers: {
        image: () => handleImageInsert(),
      },
    },
  }), []);

  const handleImageInsert = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', base64);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:8080/api/articles/upload', formData);
    return res.data; // trả về URL ảnh
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      setIsLoading(true);

      // Nếu có ảnh đại diện mới, upload và thay thế URL
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        finalThumbnailUrl = await uploadImage(thumbnailFile);
      }

      // Xử lý ảnh trong nội dung
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const images = tempDiv.querySelectorAll('img');

      for (let img of images) {
        if (img.src.startsWith('data:image/')) {
          const blob = await fetch(img.src).then(res => res.blob());
          const file = new File([blob], 'image.png', { type: blob.type });
          const uploadedUrl = await uploadImage(file);
          img.src = uploadedUrl;
        }
      }

      const finalContent = tempDiv.innerHTML;

      await axios.put(`http://localhost:8080/api/articles/${id}`, {
        title,
        thumbnailUrl: finalThumbnailUrl,
        content: finalContent,
      });

      alert('✅ Bài viết đã được cập nhật!');
      navigate('/article');
    } catch (err) {
      alert('❌ Lỗi khi cập nhật bài viết');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto bg-white text-black rounded-lg shadow overflow-y-auto">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="text-white font-bold">Đang cập nhật...</div>
        </div>
      )}

      <button
        onClick={() => navigate('/article')}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-50"
      >
        Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa bài viết</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề bài viết"
        className="w-full p-3 mb-4 border rounded"
      />

      <div className="mb-4">
        <label className="block font-medium mb-2">Ảnh đại diện:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setThumbnailFile(file);
              setThumbnailUrl(URL.createObjectURL(file));
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="Preview" className="mt-2 w-48 h-auto rounded shadow" />
        )}
      </div>

      <div className="mb-6 h-[400px]">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          className="h-[350px] bg-white border rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`px-6 py-2 rounded font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>
    </div>
  );
}

export default EditArticle;
