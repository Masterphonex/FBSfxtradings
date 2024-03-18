import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredientials } from "../slices/authSlice";
import {toast} from 'react-toastify'


const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, password } = data;
  
  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dash')
    }
  }, [navigate, userInfo])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password}).unwrap();
      if (response) {
        // Check for error status in the response
        if (response.error) {
          toast.error(response.error);// Display error message
        } else {
          dispatch(setCredientials({ ...response }));
          navigate('/dash');
          toast.success('Login Success')
        }
      }
      
    } catch (err) {
      console.log(err.error)
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl">Login</h1>
      <form
        className="w-[300px]  bg-gray-200 rounded-md drop-shadow-lg flex flex-col items-center px-5 py-7 gap-8"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="px-3 py-2 rounded-sm"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="px-3 py-2 rounded-sm"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit" className="bg-gray-300 px-8 py-3 rounded-md">
         {isLoading ? <h1>Signing In...</h1> : <h1>Login</h1>}
        </button>
        <Link to="/Register">Dont have an Account? Register </Link>
      </form>
    </div>
  );
};

export default Login;
