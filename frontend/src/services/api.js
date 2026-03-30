import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeText = async (text) => {
  const response = await apiClient.post('/analyze', { text });
  return response.data;
};

export const refineText = async (text) => {
  const response = await apiClient.post('/refine', { text });
  return response.data;
};