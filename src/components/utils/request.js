import axios from 'axios';

const request = axios.create({
    baseURL: `https://tiktok.fullstack.edu.vn/api/`,
});

export const get = async (path, optons = {}) => {
    const response = await request.get(path, optons);
    return response.data;
};

export default request;
