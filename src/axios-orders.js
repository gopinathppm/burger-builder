import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-8b6bb.firebaseio.com/"
})

export default instance;