import axios from '../../../axios'

const getServices =async (setPopularServices) => {
  const res = await axios.get('/api/getcategoryDetails/')
  if (res.status==200) {
    setPopularServices(res.data)
  }
  }
export default getServices
