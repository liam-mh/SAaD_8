import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this as necessary

export const loginUser = async (email, password) => {
    return axios.post(`${API_BASE_URL}/account/login`, { email, password });
};