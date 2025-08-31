import axios from '../../../axios'

const readSelectednotification = (id) => {
  axios.patch(`api/readnotification/${id}/`,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
}

export default readSelectednotification
