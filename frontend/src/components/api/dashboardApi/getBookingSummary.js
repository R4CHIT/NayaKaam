import axios from '../../../axios'

const getBookingSummary = async(setStatusData) => {
  const res =await axios.get('api/getBookingSummary',{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
  setStatusData(res.data)
}

export default getBookingSummary
