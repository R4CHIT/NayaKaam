import React, { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "../../../axios";
import LoadingEffect from "../../ui/LoadingEffect";
import InputDetails from "../../ui/InputDetails";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const email = useRef();
  const [error,setError] = useState(0);
  const errormessageRef = useRef();
  const handleClick = async () => {
    if (timer === 0) {
      try {
        const emailValue = email.current?.value;

        if (!emailValue) {
          setError(1)
          errormessageRef.current = 'Enter your Email'
        }

        const formData = new FormData();
        formData.append("email", emailValue);

        setLoading(true); 

        const response = await axios.post("/api/reset-password/", formData);

        errormessageRef.current = "Reset code sent"

        setTimer(60);
      } catch (error) {
        if (error.status === 404) {
  setError(1);
  errormessageRef.current = "User doesn't exist";
}

      } finally {
        setLoading(false);
      }
    } else {
      console.log("Wait for timer to finish...");
    }
  };
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Email
        </h2>
       <InputDetails ref={email} title={"Email:"} placeholder={"Enter your email"} errormessage={errormessageRef.current} error={error == 1 && true}/>

        <button
          type="submit"
          disabled={timer > 0}
          className={`w-full py-3 ${
            timer > 0
              ? "bg-orange-900 hover:bg-orange-900 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } transition-colors rounded-xl text-white font-semibold shadow-md`}
          onClick={() => handleClick()}
        >
          {loading ? <LoadingEffect /> : "Send"}
        </button>
        {timer > 0 && (
          <p className="mt-2 text-sm text-gray-400">Please wait {timer}s</p>
        )}
      </div>
    </div>
  );
};

export default Details;
