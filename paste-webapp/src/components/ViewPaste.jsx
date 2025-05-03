import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((paste) => paste.id === id);

  // const formattedDate = new Date(paste?.created_at).toLocaleDateString("en-US"); // 4/13/2025

  const formattedDate = moment(paste?.created_at).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <div>
      <div className="flex flex-col gap-2 bg-red-300 m-10 p-4">
        <h2 className="text-xl font-bold">{paste?.title}</h2>
        <p>{paste?.content}</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ViewPaste;
