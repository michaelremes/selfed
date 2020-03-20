import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

//export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllQuestions = () => api.get(`/questions`);
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
  getAllQuestions,
};

export default apis
