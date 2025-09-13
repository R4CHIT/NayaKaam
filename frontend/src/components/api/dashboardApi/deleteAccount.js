import axios from '../../../axios'

const deleteAccount = async(password) => {
    const data = {
        password:password
    }
   
    console.log(data)
    const res = await axios.post('api/deleteaccount/',data,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('accesstoken')}`
        }
    })
    return res.status
}

export default deleteAccount
