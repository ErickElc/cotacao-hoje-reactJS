import axios from "axios"


const url = "https://economia.awesomeapi.com.br/last/"

const http = axios.create({
    baseURL: url
})


export default http;