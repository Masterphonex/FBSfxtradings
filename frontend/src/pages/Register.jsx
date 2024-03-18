import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredientials } from "../slices/authSlice";

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation()

  const {fullname, username, email, password} = data

  useEffect(() => {
    if (userInfo) {
      navigate('/dash')
    }
  }, [navigate, userInfo])


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await register({ fullname, username, email, password}).unwrap();
      if (response) {
        // Check for error status in the response
        if (response.error) {
          toast.error(response.error);// Display error message
        } else {
          dispatch(setCredientials({ ...response }));
          navigate('/dash');
          toast.success('Registration Success')
        }
      }
    } catch (err) {
      toast.error(err)
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl">Register</h1>
      <form
        className="w-[300px]  bg-gray-200 rounded-md drop-shadow-lg flex flex-col items-center px-5 py-7 gap-8"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Fullname"
          className="px-3 py-2 rounded-sm"
          value={data.fullname}
          onChange={(e) => setData({ ...data, fullname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          className="px-3 py-2 rounded-sm"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          className="px-3 py-2 rounded-sm"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="password"
          className="px-3 py-2 rounded-sm"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit" className="bg-gray-300 px-8 py-3 rounded-md">
          {isLoading? <h1>Signing Up</h1> : <h1>Register</h1>}
        </button>
        <Link to='/login'>Already have an Account? Login </Link>
      </form>
    </div>
  );
};

export default Register;
