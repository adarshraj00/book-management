import React from "react";
import DataTable from "../components/DataTable";
import { useState,useEffect } from "react";
import booksApi from "../api/books";
import sagaActions from "../saga/sagaActions";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux';
import Swal from "sweetalert2";

const Admin = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    author: "",
    title: "",
    yearOfPublication: "",
    noOfCopies: "",
  });
  const [err, setErr] = useState({
    author: "",
    title: "",
    yearOfPublication: "",
    noOfCopies: "",
  });
  const auth=useSelector(state=>state.auth)
  const validate = () => {
    let flag = 0;
    if (form.author === "") {
      setErr({ ...err, author: "author is required" });
      flag = 1;
    }
    if (form.title === "") {
      setErr({ ...err, title: "title is required" });
      flag = 1;
    }
    if (form.yearOfPublication === "") {
      setErr({ ...err, yearOfPublication: "year of publication is required" });
      flag = 1;
    }
    if (form.noOfCopies === "") {
      setErr({ ...err, noOfCopies: "no of copies is required" });
      flag = 1;
    }
    if (flag === 1) {
      return false;
    }
    return true;
  };
  const submit = async () => {
    try {
      if (!validate()) {
        return;
      }
      const res = await booksApi.saveNewBook(form);
      console.log(res);
      setShowForm(false);
      Swal.fire("done", "updated db", "success");
    } catch (err) {
      console.log(err.response.data);
      
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
    if (e.target.value === "") {
      setErr({ ...err, [e.target.name]: "should not be empty" });
    } else {
      setErr({ ...err, [e.target.name]: "" });
    }
  };
  useEffect(()=>{
    if(!auth.isAdmin && !auth.isUser){
      navigate('/')
    }
  },[auth.isAdmin,auth.isUser])
  return (
    <div className="relative">
      <div className="text-3xl text-center">
        <p>Books Management System</p>
        <p>Welcome Admin</p>
      </div>
      <div className="h-15 border-2 w-[20vw] m-auto mt-4 mb-4 flex justify-around  ">
        <p
          className="cursor-pointer"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add Book
        </p>
        <p className="text-red-500 cursor-pointer" onClick={()=>dispatch({type:sagaActions.LOGOUT})}>LOGOUT</p>
        {showForm && (
          <div className="absolute border-4 w-[100vw] h-[100vh] m-auto  border-gray-500 top-0 left-0 ">
            <div className="w-[50%] h-[50%] bg-white m-auto flex flex-col justify-center items-center ">
              <div>
                <p>Author</p>
                <input type="text" name="author" onChange={handleChange} />
                {err.author !== "" && (
                  <p className="text-red-500">{err.author}</p>
                )}
              </div>
              <div>
                <p>Title</p>
                <input type="text" name="title" onChange={handleChange} />
                {err.title !== "" && (
                  <p className="text-red-500">{err.title}</p>
                )}
              </div>
              <div>
                <p>Published year</p>
                <input
                  type="text"
                  name="yearOfPublication"
                  onChange={handleChange}
                />
                {err.yearOfPublication !== "" && (
                  <p className="text-red-500">{err.yearOfPublication}</p>
                )}
              </div>
              <div>
                <p>No of copies</p>
                <input
                  type="number"
                  name="noOfCopies"
                  onChange={handleChange}
                />
                {err.noOfCopies !== "" && (
                  <p className="text-red-500">{err.noOfCopies}</p>
                )}
              </div>
              <p
                className="border-2 w-[50%] text-center m-auto cursor-pointer"
                onClick={submit}
              >
                submit
              </p>
              <p
                className="border-2 w-[50%] text-center m-auto cursor-pointer"
                onClick={() => setShowForm(false)}
              >
                close
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="border-red-700 border-2 w-[80vw] m-auto p-3 h-[80vh] overflow-scroll">
        <DataTable />
      </div>
    </div>
  );
};

export default Admin;
