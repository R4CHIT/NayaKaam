import axios from '../../../axios'

const getBookings =async (setBookings,api) => {
  const res = await axios.get(api,{
    headers:{
     Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
  if(res.status === 200){
    setBookings(res.data)
  }
  
}

export default getBookings
