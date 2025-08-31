import axios from '../../../axios'

const readAllNotification = () => {
  axios.patch(`api/readallnotification`,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
}

export default readAllNotification
