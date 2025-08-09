import axios from "../../../axios";

const updateProviderProfile = async (provider, userId) => {
  try {
    const response = await axios.patch(`/api/updateprofile/${userId}/`, provider, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    if (response.status === 200) {
      console.log("Update done");
    }
  } catch (error) {
    console.error("Update failed:", error.response || error.message);
  }
};

export default updateProviderProfile;
