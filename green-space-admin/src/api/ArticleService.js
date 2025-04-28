import axios from 'axios';

const IMGBB_API_KEY = 'd69fcf0e6ca45647d8065a1ebe347da0'; // Thay bằng key của bạn
const ARTICLE_API_URL = 'http://localhost:8080/api/articles';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
  return res.data.data.url;
};

export const createArticle = async (articleData) => {
  return axios.post(ARTICLE_API_URL, articleData);
};