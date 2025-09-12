import React from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdWork } from "react-icons/md";
const Historygrid = ({ job, getStatusBadge, renderStars }) => {
  return (
    <>
      <div
        key={job.id}
        className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            <MdWork className="mr-2 text-indigo-500" /> {job.service}
          </h2>
          {getStatusBadge(job.status)}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <p className="flex items-center">
            <FaUser className="mr-2 text-gray-500" /> {job.customername}
          </p>
          <p className="flex items-center">
            <GrUserWorker className="mr-2 text-gray-500" /> {job.provider}
          </p>
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500" /> {job.location}
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
            {new Date(job.booking_time).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" /> ${job.price}
          </p>
          <p className="flex items-center">
            <MdWork className="mr-2 text-gray-500" /> {job.notes}
          </p>
        </div>

        {job.status === "completed" && renderStars(job.id)}
      </div>
    </>
  );
};

export default Historygrid;
