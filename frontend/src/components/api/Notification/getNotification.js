import axios from '../../../axios'

const getNotification = async (setNotifications, api) => {
  try {
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });

    if (res.status === 200) {
      setNotifications((prev) => ({
        ...prev,
        results: [...(prev.results || []), ...res.data.results],
        next: res.data.next,
        previous: res.data.previous,
      }));
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export default getNotification;
