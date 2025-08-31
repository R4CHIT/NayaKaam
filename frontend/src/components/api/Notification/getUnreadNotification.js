import axios from "../../../axios"

const getUnreadNotification = async(setUnread) => {
  const res = await axios.get('api/getunreadnotification',{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
  setUnread(res.data.unreadnotification)
  
}

export default getUnreadNotification
