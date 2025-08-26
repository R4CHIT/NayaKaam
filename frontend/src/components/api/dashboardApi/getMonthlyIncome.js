import axios from '../../../axios'

const getMonthlyIncome = async(setMonthlyEarning) => {
  const res =await axios.get('api/getMonthlyEarning',{
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    }
  })
  setMonthlyEarning(res.data)
}

export default getMonthlyIncome
