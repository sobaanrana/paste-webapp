import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const pastes = useSelector((state) => state.paste.pastes);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      id: pasteId || Date.now().toString(36),
      created_at: new Date().toISOString(),
    };

    // if (pasteId) {
    //   localStorage.setItem("pastes", [
    //     ...JSON.parse(localStorage.getItem("pastes")),
    //     JSON.stringify(paste),
    //   ]);
    // } else {
    //   localStorage.setItem("pastes", [JSON.stringify(paste)]);
    // }

    if (pasteId) {
      // update paste
      dispatch(updateToPastes(paste));
    } else {
      // create paste
      dispatch(addToPastes(paste));
    }

    // clear input fields
    setTitle("");
    setValue("");
    setSearchParams({}); // clear search params
  };

  useEffect(() => {
    if (pasteId) {
      const findPaste = pastes.find((paste) => paste.id === pasteId);
      setTitle(findPaste?.title);
      setValue(findPaste?.content);
    }
  }, [pasteId]);
  return (
    <div className="flex justify-center place-content-center">
      <div className="flex flex-col  min-w-[500px] gap-5 ">
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          className="border-2 border-gray-300 rounded-md p-2 "
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="Enter paste here"
          value={value}
          className="border-2 border-gray-300 rounded-md p-2"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
        <button className="bg-red-400" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
