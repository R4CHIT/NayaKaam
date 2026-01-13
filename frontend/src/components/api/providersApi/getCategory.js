import axios from "../../../axios";

const getCategory = async (setCategory) => {
  const response = await axios.get("api/getcategory/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  });
  setCategory(response.data)
};

export default getCategory;
