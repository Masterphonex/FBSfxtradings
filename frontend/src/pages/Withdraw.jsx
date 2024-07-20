import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredientials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useUpdateAmountMutation } from "../slices/usersApiSlice";
import DashNavbar from "../components/DashNavbar";
import { HiInformationCircle } from "react-icons/hi";

const Withdraw = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState(userInfo.amount);

  const [updateAmount, { isLoading }] = useUpdateAmountMutation();

  useEffect(() => {
    if (userInfo && userInfo.amount !== undefined) {
      setAmount(userInfo.amount.toString());
    }
  }, [userInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAmount({
        _id: userInfo._id,
        amount,
        address,
      }).unwrap();

      if (response) {
        // Check for error status in the response
        if (response.error) {
          toast.error(response.error); // Display error message
        } else {
          dispatch(setCredientials({ ...response }));
          navigate("/dash");
          toast.success("withdraw Success");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#001F3F] w-[100vw] font-bold text-white  h-[120vh] ">
      <DashNavbar />
      <div className="flex flex-col justify-center gap-10 items-center h-[70vh] ">
        <h1 className="font-bold text-3xl mt-[200px]">Withdraw</h1>
        <div className="flex w-[300px] border rounded-md h-[200px] items-center p-2 justify-between">
          <HiInformationCircle size={30} />
          <div className="flex flex-col gap-2">
            <h1>NOTE: </h1>
            <p className="text-[15px]">
              Money shall be Recieved after <br /> 24hours - 48hours
            </p>
          </div>
        </div>
        <div className="flex w-[300px] border border-red-500 rounded-md h-[200px] items-center p-2  justify-between">
          <HiInformationCircle size={30} />
          <div className="flex flex-col gap-2">
            <h1>Warning: </h1>
            <p className="text-[14px]">Review Address Before Withdrawing</p>
          </div>
        </div>
        <form
          className="w-[300px]  bg-gray-400 rounded-md drop-shadow-lg flex flex-col items-center px-5 py-7 gap-8"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder="Amount"
            className="px-3 py-2 rounded-sm text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Wallet Address"
            value={address}
            className="px-3 py-2 rounded-sm text-black"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit" className="bg-green-800 px-8 py-3 rounded-md">
            {isLoading ? <h1>withdrawing</h1> : <h1>Withdraw</h1>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
