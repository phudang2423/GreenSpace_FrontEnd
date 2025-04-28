import { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { uploadImage, createArticle } from '../../api/ArticleService';

function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quillRef = useRef();

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }], // ✅ Thêm nút căn lề trái/giữa/phải
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

  const handleSubmit = async () => {
    if (!title.trim() || !thumbnailFile || !content.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      setIsLoading(true);

      const thumbnailUrl = await uploadImage(thumbnailFile);

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

      await createArticle({ title, thumbnailUrl, content: finalContent });
      alert('✅ Bài viết đã được đăng!');

      setTitle('');
      setThumbnailFile(null);
      setThumbnailPreview('');
      setContent('');
    } catch (error) {
      alert('❌ Lỗi khi đăng bài: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto bg-white text-black rounded-lg shadow">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="text-white font-bold">Đang tải ảnh lên...</div>
        </div>
      )}

      <button
        onClick={() => navigate('/article')}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-50"
        title="Quay lại"
      >
        Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-6">Soạn bài viết</h2>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
                setThumbnailPreview(URL.createObjectURL(file));
              }
            }}
            disabled={isLoading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Preview" className="mt-2 w-48 h-auto rounded shadow" />
          )}
        </div>

        <div className="mb-6 h-[400px]">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Nhập nội dung..."
            className="h-[350px] bg-white border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`px-6 py-2 rounded font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {isLoading ? 'Đang đăng...' : 'Đăng bài viết'}
      </button>
    </div>
  );
}

export default CreateArticle;
