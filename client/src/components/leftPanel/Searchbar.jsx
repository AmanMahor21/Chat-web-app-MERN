import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

import useStore from "../../store/store";
const Searchbar = () => {
  const searchRef = useRef();
  const [input, setInput] = useState();
  const { allUser, setSelected } = useStore();
  // console.log(allUser);

  const searchHandle = (e) => {
    e.preventDefault();
    const findInput = allUser.filter((user) =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );
    // console.log(findInput, "findInput");
    if (!findInput || findInput.length == 0) {
      toast.dismiss();
      toast.error("No user found", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
    setSelected(...findInput);
  };

  return (
    <form
      className="d-flex ps-4 pe-4 position-relative"
      onSubmit={searchHandle}
    >
      <input
        type="text"
        className="searchbar"
        name=""
        id=""
        placeholder="Search.."
        onChange={(e) => setInput(e.target.value)}
        // setInput={searchRef}
      />
      <div className="serachIcon" type="sumbit">
        <BsSearch />
      </div>
    </form>
  );
};

export default Searchbar;
