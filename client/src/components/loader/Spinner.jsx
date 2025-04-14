import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    // <div className="fixed inset-0 bg-slate-900/90 flex justify-center items-center z-50">
    <div className="fixed inset-0 bg-slate-900/80 flex justify-center items-center z-50 opacity-100 transition-opacity duration-500 ease-in-out  ">
      <div className="text-center text-white flex justify-center flex-col items-center">
        <Oval
          visible={true}
          height={60}
          width={60}
          strokeWidth={4}
          color="#097caa"
          secondaryColor="#d1d5db"
          ariaLabel="oval-loading"
        />
        <p className="mt-4 text-2xl text-gray-200 ">
          Initializing your experience, just a moment...
        </p>
      </div>
    </div>
  );
};

export default Spinner;
