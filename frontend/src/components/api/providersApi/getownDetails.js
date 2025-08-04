import axios from "../../../axios"

const getownDetails = async() => {
  const response = await axios.get('api/get/userprofile/')
}

export default getownDetails
