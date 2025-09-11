import React, { useState, useEffect, useCallback } from "react";
import {
  FaStar,
  FaRegStar,
  FaTools,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdCheckmarkCircle, IoMdTime } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../../../axios";
import LoadingEffect from "../../ui/LoadingEffect";
import getBookingHistory from "../../api/Booking/getBookingHistory";
import Historygrid from "./Smallcomponents/Historygrid";

const Historyuser = () => {
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const result = await getBookingHistory();
        setData(result.results || []);
        setNextUrl(result.next || null);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleRate = (jobId, rating) => {
    setRatings((prev) => ({ ...prev, [jobId]: rating }));
  };

  const renderStars = (jobId) => {
    const rating = ratings[jobId] || 0;
    return (
      <div className="flex items-center space-x-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleRate(jobId, i + 1)}
            className="focus:outline-none"
          >
            {i < rating ? (
              <FaStar className="text-yellow-500 text-lg" />
            ) : (
              <FaRegStar className="text-gray-300 text-lg hover:text-yellow-400 transition" />
            )}
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-500">
          {rating > 0 ? `${rating}/5` : "Tap to rate"}
        </span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (status === "completed")
      return (
        <span className="flex items-center text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
          <IoMdCheckmarkCircle className="mr-1" /> Completed
        </span>
      );
    if (status === "upcoming")
      return (
        <span className="flex items-center text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          <IoMdTime className="mr-1" /> Upcoming
        </span>
      );
    return (
      <span className="flex items-center text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
        <MdWork className="mr-1" /> {status}
      </span>
    );
  };

  const fetchMoreData = useCallback(async () => {
    if (!nextUrl) return;
    try {
      const res = await axios.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      setData((prev) => [...prev, ...res.data.results]);
      setNextUrl(res.data.next);
    } catch (err) {
      console.error("Error fetching more jobs:", err);
    }
  }, [nextUrl]);

  return (
    <>
      {!loading ? (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center">
                <FaTools className="mr-2 text-indigo-600" /> Work History
              </h1>
              <p className="text-sm text-gray-600">
                Your completed and upcoming service jobs
              </p>
            </div>

            {data.length > 0 ? (
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={!!nextUrl}
                loader={<LoadingEffect />}
                endMessage={
                  <p className="text-center text-sm text-gray-500 py-6">
                    You come to the end of your work history
                  </p>
                }
              >
                <div className="space-y-4">
                  {data.map((job) => (
                    <Historygrid job={job} getStatusBadge={getStatusBadge} renderStars={renderStars }/>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="text-center py-12">
                <FaTools className="text-5xl mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No work history found
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start accepting service requests to build your history
                </p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
                  Find New Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-100vh flex justify-center items-center"><LoadingEffect /></div>
      )}
    </>
  );
};

export default Historyuser;
