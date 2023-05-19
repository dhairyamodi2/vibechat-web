import axios from 'axios';


export const http = axios.create({
    baseURL: '/',
    headers: {
        'Content-type' : 'application/json'
    }
})