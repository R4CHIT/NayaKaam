import axios from "../../../axios"

const getUserProfile = async(setProfile) => {
  const response = await axios.get('api/get/userprofile/',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  })
  if(response.status==200){
    setProfile(response.data)}
}

export default getUserProfile
