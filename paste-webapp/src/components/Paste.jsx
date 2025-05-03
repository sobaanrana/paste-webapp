import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = React.useState("");

  const filteredPastes = pastes?.filter((paste) =>
    paste.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    console.log("delete paste with id", pasteId);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="search"
        placeholder="Search here"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-[500px] p-4 my-10 border-2 border-red-500 focus:border-red-700 focus:outline-none focus:ring-0"
      />
      <div className="w-[500px]">
        {filteredPastes.map((paste) => (
          <div
            key={paste.id}
            className="flex flex-col gap-2 bg-red-300  mb-4 p-4"
          >
            <h2 className="text-xl font-bold">{paste.title}</h2>
            <p>{paste.content}</p>

            <div className="flex gap-3">
              <button className=" bg-orange-500  hover:bg-orange-700 text-white font-bold  p-2 text-sm rounded">
                <Link to={`/?pasteId=${paste?.id}`}>Edit</Link>
              </button>
              <button className=" bg-green-500  hover:bg-green-700 text-white font-bold  p-2 text-sm rounded">
                <Link to={`/pastes/${paste.id}`}>View</Link>
              </button>
              <button
                className=" bg-red-500  hover:bg-red-700 text-white font-bold  p-2 text-sm rounded"
                onClick={() => handleDelete(paste?.id)}
              >
                Delete
              </button>
              <button
                className=" bg-purple-500  hover:bg-purple-700 text-white font-bold  p-2 text-sm rounded"
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Copied to clipboard", {
                    icon: "✍️",
                    style: {
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
              >
                Copy
              </button>
              <button className=" bg-blue-500  hover:bg-blue-700 text-white font-bold  p-2 text-sm rounded">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;
