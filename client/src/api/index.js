import axios from 'axios'
import { json } from 'react-router-dom';

const API = axios.create({ baseURL: 'http://localhost:5001' });

//const url = 'https://memories-new-5791af7c0b20.herokuapp.com/posts'
const url = 'http://localhost:5001/posts'

export const fetchPosts = () => API.get(url)

export const createPost = (newPost) => API.post(url,newPost)

export const updatePost = (id,updatedPost) => API.patch(`${url}/${id}`,updatedPost);

export const deletePost = (id) => API.delete(`${url}/${id}`);

export const likePost = (id) => API.patch(`${url}/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);