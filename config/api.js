import axios from "axios";

export const API = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: "https://marketplace-be-seven.vercel.app/",
});

export const getConfig = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "multipart/form-data",
        },
    };

    return config
}