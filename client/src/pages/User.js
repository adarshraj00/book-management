import React from "react";
import Carousal from "../components/Carousal";
import DataTable from "../components/DataTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import sagaActions from "../saga/sagaActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const User = () => {
  const dispatch = useDispatch();
  const select=useSelector(state=>state.auth)
  const navigate=useNavigate();
  useEffect(() => {
    if(!select.isUser){
      navigate('/')
    }
  } ,[select.isUser])
  return (
    <div>
      <div className="text-3xl text-center">
        <h1>Welcome User</h1>
        <p
          className="text-red-500 cursor-pointer"
          onClick={() => dispatch({ type: sagaActions.LOGOUT })}
        >
          LOGOUT
        </p>
      </div>
      <p className="text-center">Top Recommendations</p>
      <div className="h-[20vh] w-[80vw] border-2 m-auto relative">
        <Carousal />
      </div>
      <div className="w-[80vw] h-[50vh] border-2 m-auto ">
        <DataTable />
      </div>
    </div>
  );
};

export default User;
