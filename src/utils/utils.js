import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get(`http://localhost:3000/posts`);
  return response.data;
};

const addPost = async (data) => {
  const response = await axios.post(`http://localhost:3000/posts`, data);
  return response;
};

const deletePost = async (data) => {
  const response = await axios.delete(`http://localhost:3000/posts/${data.id}`);
  return response;
};

export { fetchPosts, addPost, deletePost };
