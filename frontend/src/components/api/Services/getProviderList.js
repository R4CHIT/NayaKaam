import axios from "../../../axios"
const getProviderList =async (id,setProviders) => {
  const res = await axios(`/api/get/categoryprovider/${id}/`)
  if(res.status ==200){
    setProviders(res.data)
  }
}

export default getProviderList
