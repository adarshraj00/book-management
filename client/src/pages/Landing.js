import React from "react";
import sagaActions from "../saga/sagaActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("user");
  const [adminId, setAdminId] = useState("");
  const navigate = useNavigate();
  const select = useSelector((state) => state.auth);
  const [userCredentials, setUserCredentials] = useState({
    id: "",
    password: "",
  });
  const validate = () => {
    return true;
  };
  const login = () => {
    if (!validate()) return;

    if (state === "user") {
      console.log(userCredentials);
      dispatch({ type: sagaActions.LOGIN_USER, payload: userCredentials });
    } else {
      //admin
      console.log(adminId);
      dispatch({ type: sagaActions.LOGIN_ADMIN, payload: { id: adminId } });
    }
  };
  useEffect(() => {
    if (select.isUser) {
      navigate("/user");
    } else if (select.isAdmin) {
      navigate("/admin");
    }
    console.log(select);
  }, [select]);
  return (
    <div>
      <div className="text-2xl h-[10vh] flex justify-center items-center">
        Books Management Portal
      </div>
      <div className="h-[90vh] border-2 flex">
        <div style={{ width: "50%" }}>
          <img
            type="img"
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="books"
            className="h-[90vh] w-[90vw] object-cover opacity-80"
          />
        </div>
        <div
          style={{
            border: "1px solid",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80%", border: "1px solid", height: "50%" }}>
            <p
              style={{ textAlign: "center", fontSize: "1.5rem", height: "10%" }}
            >
              LOGIN
            </p>
            <div
              style={{
                height: "10%",
                width: "",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <p
                onClick={() => {
                  setState("admin");
                }}
                className={state === "admin" ? "text-red-500 font-bold" : ""}
              >
                Admin
              </p>
              <p
                onClick={() => {
                  setState("user");
                }}
                className={state === "user" ? "text-red-500 font-bold" : ""}
              >
                User
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}
            >
              {state === "admin" && (
                <>
                  <p>enter id</p>
                  <p>use "123"</p>
                  <input
                    type="text"
                    required
                    name="adminId"
                    onChange={(e) => setAdminId(e.target.value)}
                    style={{
                      border: "1px solid",
                      width: "80%",
                      padding: "2%",
                      margin: "2%",
                    }}
                  />
                  {select.error && <p>{select.error}</p>}
                </>
              )}
              {state === "user" && (
                <>
                  <p>enter id</p>
                  <p>use "123"</p>
                  <input
                    type="text"
                    name="id"
                    value={userCredentials.id}
                    style={{
                      border: "1px solid",
                      width: "80%",
                      padding: "2%",
                      margin: "2%",
                    }}
                    onChange={(e) => {
                      setUserCredentials({
                        ...userCredentials,
                        id: e.target.value,
                      });
                    }}
                  />
                  <p>enter password</p>
                  <input
                    type="text"
                    name="password"
                    value={userCredentials.password}
                    style={{
                      border: "1px solid",
                      width: "80%",
                      padding: "2%",
                      margin: "2%",
                    }}
                    onChange={(e) => {
                      setUserCredentials({
                        ...userCredentials,
                        password: e.target.value,
                      });
                    }}
                  />
                  {select.error && <p>{select.error}</p>}
                </>
              )}
              {!select.isLoading && <button onClick={login}>Enter</button>}
              {select.isLoading && <p>loading</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
