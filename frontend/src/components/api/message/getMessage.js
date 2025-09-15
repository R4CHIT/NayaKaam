import axios from "../../../axios"


const getMessage =async (userid) => {
    const res = await axios.get(`api/getmessage/${userid}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
        }
    })
    return res
}

export default getMessage
