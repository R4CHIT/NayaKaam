import axios from "../../../axios";

const getCategory = async (setCategory) => {
  const response = await axios.get("http://127.0.0.1:8000/api/getcategory/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  });
  setCategory(response.data)
};

export default getCategory;
