import axios from "../../../axios";

const becomeprovderApi = async (providerData) => {
  console.log(providerData);
  const formData = new FormData();

  // Append each field manually to FormData
  formData.append("user", providerData.user);
  formData.append("fullname", providerData.fullname);
  formData.append("contactnumber", providerData.contactnumber);
  formData.append("profilepic", providerData.profilepic); // MUST be File type
  formData.append("state", providerData.state);
  formData.append("city", providerData.city);
  formData.append("experience", providerData.experience);
  formData.append("price", providerData.price);
  formData.append("description", providerData.description);
  formData.append("jobtype", providerData.jobtype);
  const request = await axios.post("/api/userprofile/", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  });
  console.log("Done");
};

export default becomeprovderApi;
