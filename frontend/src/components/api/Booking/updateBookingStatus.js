import axios from '../../../axios'

const updateBookingStatus = (data,id) => {
  try {
    console.log(data)
    axios.patch(`api/updatestatus/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        }
    })
    console.log("ok")
  } catch (error) {
    console.log(error)
  }
}

export default updateBookingStatus
