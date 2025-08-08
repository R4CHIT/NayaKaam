import axios from "../../../axios";

const becomeprovderApi = async (providerData) => {
  console.log(providerData);
  const formData = new FormData();
  formData.append("user", providerData.user);
  formData.append("fullname", providerData.fullname);
  formData.append("contactnumber", providerData.contactnumber);
  formData.append("profilepic", providerData.profilepic);
  formData.append("state", providerData.state);
  formData.append("city", providerData.city);
  formData.append("experience", providerData.experience);
  formData.append("price", providerData.price);
  formData.append("description", providerData.description);
  providerData.jobtype.forEach((id) => {
  formData.append("jobtype_ids", id);
});
  const request = await axios.post("/api/userprofile/", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  });
  if(request.status == 200){
    window.location.href = '/'
  }
};

export default becomeprovderApi;
