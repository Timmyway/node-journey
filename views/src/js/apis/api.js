import axios from "axios";

var Api = axios.create({
    baseURL: window.baseUrl,
    headers: { Accept: 'application/json' }
});

export default Api;