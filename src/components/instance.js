import axios from 'axios';

export default axios.create({
    baseURL: "https://auth-test-7cc30-default-rtdb.firebaseio.com/"
})