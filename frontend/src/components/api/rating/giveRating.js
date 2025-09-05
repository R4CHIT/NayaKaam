
import axios from '../../../axios'

const giveRating =async (rating,id) => {
  const data={
    rating:rating
  }
  try {
    await axios.patch(`api/updateproviderrating/${id}/`,data,{
      headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
    })
    console.log('done')
  } catch (error) {
    console.log(error.message
    )
  }
}

export default giveRating
