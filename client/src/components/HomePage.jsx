import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuid} from "uuid";

export default function HomePage() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the field is requried");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created");
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="w-full md:w-1/2">
          <div className="shadow-sm p-2 mb-5 bg-white rounded">
            <div className="p-4 text-center bg-gray-800">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="max-w-full mx-auto block"
                style={{ maxWidth: "150px" }}
              />
              <h4 className="text-lg text-white mt-4 mb-4">Enter the ROOM ID</h4>
              <div className="mb-4">
                <input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  type="text"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Room Id"
                />
              </div>
              <div className="mb-4"> 
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Username"
                />
              </div >
              <button 
               onClick={joinRoom} className="w-1/8 bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-lg focus:outline-none focus:shadow-outline hover:bg-green-600">JOIN</button>
              <p className="mt-3 text-white">
                 Don't have a room ID? create{" "}
                 <span className="text-green-400 p-2 hover:text-green-600 cursor-pointer transition-transform"
                 onClick={generateRoomId} >
                 {" "}
                 New Room
                 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
