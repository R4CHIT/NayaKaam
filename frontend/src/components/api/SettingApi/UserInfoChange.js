import axios from '../../../axios'

const UserInfoChange = async(accountinfo) => {
  const res = await axios.patch('api/changeuserinfo/',accountinfo,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  })
  return res.status
}

export default UserInfoChange
