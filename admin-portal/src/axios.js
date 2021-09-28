import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost:3000",
    // headers:{
    //     authorization:""
    // }
});

export default axiosInstance;