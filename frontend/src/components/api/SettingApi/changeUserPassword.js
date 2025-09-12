import axios from "../../../axios";

const changeUserPassword = async (data) => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    throw new Error("No access token found. Please log in again.");
  }

  const res = await axios.post("api/auth/changepassword/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.status;
};

export default changeUserPassword;
