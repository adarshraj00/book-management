import React from "react";
import { Suspense } from "react";

const LazyLoading = ({ component }) => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {component}
    </Suspense>
  );
};

export default LazyLoading;
