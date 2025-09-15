import axios from '../../../axios'

const getUserIcon = async() => {
  const res= await axios.get('api/getusericon/',{
    headers:{
        Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
    }
  })
  return res
}

export default getUserIcon
