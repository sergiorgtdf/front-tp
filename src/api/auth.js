import axios from "./SetCredentials.js";

export const loginRequest = (user) => {
    try {
        return axios.post("/login", user);
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => axios.post("/logout");

export const registerRequest = (user) => axios.post("/register", user);

export const verifyToken = () => {
    try {
        // console.log("verifyToken");
        return axios.get("/verifyToken");
    } catch (error) {
        console.log(error);
    }
};
