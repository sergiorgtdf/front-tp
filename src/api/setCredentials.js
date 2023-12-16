import axios from "axios";

// Modificar la URL para que apunte a la API de Express
export const API_URL = "http://localhost:4000/api";

const instance = axios.create({
    // baseURL: "http://localhost:4000/api",
    baseURL: API_URL,

    withCredentials: true,
});

export default instance;
