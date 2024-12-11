import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = {
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    },
    
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    },
    
    forgotPassword: async (email) => {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    },
    
    resetPassword: async (token, newPassword) => {
        const response = await axios.post(`${API_URL}/auth/reset-password`, {
            token,
            newPassword
        });
        return response.data;
    }
};

export default api;