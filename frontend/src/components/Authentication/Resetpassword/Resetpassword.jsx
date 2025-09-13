import axios from "../../../axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputDetails from "../../ui/InputDetails";
import LoadingEffect from "../../ui/LoadingEffect";

const Resetpassword = () => {
  const navigate = useNavigate()
  const {uid,token} = useParams()
  const newpassword = useRef();
  const conformPassword = useRef();
  const [error,setError] = useState(0)
  const [loading,setLoading] = useState(false)
  const errormessage = useRef()
  const handleClick = async() => {
    if (
      newpassword.current.value == "" ||
      conformPassword.current.value == ""
    ) {
      setError(1)
      errormessage.current = "Enter Password"
    } else if (newpassword.current?.value !== conformPassword.current?.value) {
      setError(1)
      errormessage.current= "Password not matched"
    }
    else{
      try {
      setLoading(true)
      setError('Password Changed Successfully')
      const formdata =new FormData;
      formdata.append("uid",uid)
      formdata.append("token",token)
      formdata.append("newpassword",newpassword.current.value)
      const response = await axios.post('api/password-reset-confirm/',formdata)
      navigate('/login')
      
      } catch (error) {
        setError(1)
        errormessage.current ="Password can't changed"
      }
      finally{
        setLoading(false)
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Reset Password
        </h2>
        <InputDetails
          title={"Password:"}
          type="password"
          placeholder={"Enter password"}
          ref={newpassword}
          
        />

        <InputDetails
          title={"Conform Password"}
          type={"password"}
          placeholder={"Enter Conform password"}
          ref={conformPassword}
          error={error == 1 && true}
          errormessage={errormessage.current}

        />
        <button
          type="submit"
          className={`w-full py-3 hover:bg-orange-900 bg-orange-500  transition-colors rounded-xl text-white font-semibold shadow-md`}
          onClick={() => handleClick()}
        >
          {loading ? (
            <LoadingEffect />
          ):"Send"}
        </button>
      </div>
    </div>
  );
};

export default Resetpassword;
