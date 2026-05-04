import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex h-[85vh] items-center justify-center animate__animated animate__fadeIn">
      <div className="text-neutral-500 animate__animated animate__pulse animate__infinite">
        Loading...
      </div>
    </div>
  );
};

export default LoadingPage;