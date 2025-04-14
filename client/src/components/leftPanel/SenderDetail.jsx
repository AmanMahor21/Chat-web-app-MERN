import React, { useContext } from "react";
import { authContext } from "../../context/UserRegister";

const SenderDetail = () => {
  const { saveUser } = useContext(authContext);
  return (
    <div>
      <div className="ps-4 mb-3 pe-4 d-flex">
        <img src={saveUser?.avatar} alt="User Avatar" className="avatar" />
        {/* <div className={`status ${isOnline ? "active" : "inActive"}`}></div> */}
        <div className="d-flex justify-content-between align-items-center ps-6 fs-4 ps-2">
          {saveUser?.username}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-grow-1 ps-2 pe-2">
        {/* <div>Tue</div> */}
      </div>
    </div>
  );
};

export default SenderDetail;
