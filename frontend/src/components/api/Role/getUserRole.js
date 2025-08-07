
import axios from "../../../axios"

const getUserRole = async(userId,setRole) => {
  const response = await axios.get(`api/getRole/${userId}/`)
  if(response.status == 200){
    setRole(response.data.role)
  }
}

export default getUserRole
