import axios from '../../../axios'

const getNotification = async(setNotifications) => {
  try {
    const res =await axios.get('api/getnotification',{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
    
  })
  console.log(res.data)
  if(res.status == 200){
    setNotifications(res.data)
  }
  } catch (error) {
    
  }
}

export default getNotification
