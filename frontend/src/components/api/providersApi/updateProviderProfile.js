import axios from "../../../axios";

const updateProviderProfile = async (provider, userId,setEdit) => {
  const formdata = new FormData();
  formdata.append("fullname", provider.fullname || "");
  formdata.append("state", provider.state || "");
  formdata.append("city", provider.city || "");
  if (provider.profilepic instanceof File) {
    formdata.append("profilepic", provider.profilepic);
  }
  formdata.append("email", provider.email || "");
  formdata.append("phone", provider.phone || "");
  formdata.append("description", provider.description || "");
  formdata.append("price", provider.price || "");
  formdata.append("time", provider.time || "");
  provider.jobtype.map((id) => {
  formdata.append("jobtype_ids", id.id);
});
console.log(provider.jobtype)
  console.log(provider.profilepic);

  try {
    const response = await axios.patch(
      `/api/updateprofile/${userId}/`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      }
    );
    if (response.status === 200) {
     setEdit(false)
    }
  } catch (error) {
    console.error("Update failed:", error.response || error.message);
  }
};

export default updateProviderProfile;
