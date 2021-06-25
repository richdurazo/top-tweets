import axios from 'axios';
const instance = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        common: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG',
            'Content-Type': 'application/json',
        }
    }
});

instance.interceptors.request.use(request => {
    return request;
});

export default instance;