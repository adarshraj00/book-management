import React from "react";
import { Routes as RouteWrapper, Route, Link } from "react-router-dom";
import LazyLoading from "./LazyLoading";
import Landing from "./pages/Landing";
const User=React.lazy(() => import("./pages/User"));
const Admin=React.lazy(() => import("./pages/Admin"));
const Routes = () => {
  return (
    <>
      <RouteWrapper>
        <Route path="/" element={<Landing/>}/>
        <Route path="/user" element={<LazyLoading component={<User/>}/>}/>
        <Route path="/admin" element={<LazyLoading component={<Admin/>}/>}/>
      </RouteWrapper>
    </>
  );
};

export default Routes;
