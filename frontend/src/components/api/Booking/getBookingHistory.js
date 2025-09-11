import axios from '../../../axios'

const getBookingHistory = async() => {
  try {
    const res = await axios.get('api/getcompletedbooking/',{
    headers:{
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        }
  })
  if(res.status==200){
    return res.data
  }
  } catch (error) {
    
  }
  
}

export default getBookingHistory
