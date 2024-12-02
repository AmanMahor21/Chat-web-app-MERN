import React, { useEffect } from "react";
import axios from "axios";

const useValidateSession = () => {
  const validSession = async () => {
    try {
      const sessionValidity = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/check-session`,
        {
          withCredentials: true,
        }
      );

      console.log(sessionValidity, "sessionValidity");
    } catch (error) {}
  };

  useEffect(() => {
    const sessionCheck_interval = setInterval(() => {}, 60000);
    validSession();

    return () => clearInterval(sessionCheck_interval);
  }, []);
};

export default useValidateSession;
