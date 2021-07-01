import axios from 'axios';

//** Base URL to make API requests */
const instance = axios.create({
    baseURL: 'http://localhost:8000/'
});

export default instance