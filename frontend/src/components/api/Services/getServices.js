import axios from '../../../axios'

const getServices =async (setPopularServices) => {
  const res = await axios.get('/api/getcategoryDetails/')
   
      setPopularServices(res.data)
    console.log(res.data)
    
  }
export default getServices
