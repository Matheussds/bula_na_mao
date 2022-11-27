import axios from "axios"

export const api = axios.create({
    baseURL: "https://bula.vercel.app/",
})