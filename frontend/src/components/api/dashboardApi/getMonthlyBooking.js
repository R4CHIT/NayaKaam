import axios from '../../../axios'

const getMonthlyBooking = async(setMonthlyBooking) => {
  const res =await axios.get('api/getMonthlyBooking',{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
  setMonthlyBooking(res.data)
}

export default getMonthlyBooking
