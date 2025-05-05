// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  //baseURL: 'http://172.20.10.2:5000/api', 

});

export default api;
