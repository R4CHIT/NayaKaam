import axios from "../../../axios"
const bookaServiceApi = (data) => {
    axios.post('api/booking/',data,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        }
    })
}

export default bookaServiceApi
