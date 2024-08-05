import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore from "../store/store";

const useUsersList = () => {
  // const [allUsers, setAllUsers] = useState(null);
  const { setAllUser, allUser } = useStore();
  console.log(allUser, "allUser");

  useEffect(() => {
    const chatUser = async () => {
      try {
        const res = await fetch(`http://localhost:5121/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error);
        }
        // console.log(data, "i m from api userlist");
        // setAllUsers(data);
        setAllUser(data);
      } catch (error) {
        // console.log(error);
        toast.error(error.message || "Failed to get users", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }
    };
    chatUser();
  }, []);
  return allUser;
};

export default useUsersList;

// useEffect(() => {
//   const fetchUsers = async () => {
//     const { allUsers, setAllusers } = useStore();
//     try {
//       const res = await fetch('http://localhost:5121/api/users');
//       const data = await res.json();

//       if (!res.ok || data.error) {
//         throw new Error(data.error);
//       }

//       setAllusers(data);
//     } catch (error) {
//       toast.error(error.message || 'Failed to get users', {
//         position: 'top-right',
//         autoClose: 2000,
//         theme: 'colored',
//       });
//       console.error(error);
//     }
//   };

//   fetchUsers();
// }, [setAllusers]);
