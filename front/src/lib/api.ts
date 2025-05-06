// src/lib/api.ts
import axios from 'axios';

//axios.defaults.withCredentials = true;
const api = axios.create({
  //baseURL: 'http://localhost:5000/api', 
  //baseURL: 'http://172.20.10.2:5000/api', 

  // render backend url
  //  baseURL: 'https://arabian-nights-backend-1t2e.onrender.com/api', 


  
  //baseURL: 'https://arabian-nights.vercel.app/api',

  // vercel backend url
  baseUrl: 'https://arabian-nights.vercel.app'


});

export default api;
