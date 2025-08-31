import axios from '../../../axios'

const getNotification = async(setNotifications,api) => {
  try {
    const res =await axios.get(api,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
    
  })
  if(res.status == 200){
    setNotifications(res.data)
  }
  } catch (error) {
    
  }
}

export default getNotification
