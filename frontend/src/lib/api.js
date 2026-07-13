import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;

// Posts
export const fetchPosts = () => api.get("/posts").then((r) => r.data);
export const fetchPost = (slug) => api.get(`/posts/${slug}`).then((r) => r.data);
export const createPost = (data) => api.post("/posts", data).then((r) => r.data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data).then((r) => r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`).then((r) => r.data);

// Projects
export const fetchProjects = () => api.get("/projects").then((r) => r.data);
export const createProject = (data) => api.post("/projects", data).then((r) => r.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);
