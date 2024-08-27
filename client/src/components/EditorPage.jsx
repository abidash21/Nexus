import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
//import { initSocket } from "../socket";
import { io } from "socket.io-client";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import { ACTIONS } from "../Actions";

export default function EditorPage() {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const Location = useLocation();
  const { roomId } = useParams();

  const navigate = useNavigate();

  
  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    socketRef.current = socket;


    const handleErrors = (err) => {
      console.log("Error", err);
      toast.error("Socket connection failed, Try again later");
      navigate("/");
    };

    socketRef.current.on("connect_error", handleErrors);
    socketRef.current.on("connect_failed", handleErrors);

    socketRef.current.emit("join", {
      roomId,
      username: Location.state?.username,
    });

    socketRef.current.on("joined", ({ clients, username, socketId }) => {
      if (username !== Location.state?.username) {
        toast.success(`${username} joined the room.`);
      }
      setClients(clients);
      socketRef.current.emit("sync-code", {
        code: codeRef.current,
        socketId,
      });
    });

    socketRef.current.on("disconnected", ({ socketId, username }) => {
      toast.success(`${username} left the room`);
      setClients((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };

  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("unable to copy the room Id");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen">
      <div className="flex h-full">
        <div
          className="w-1/6 bg-gray-800 text-white flex flex-col h-full"
          style={{ boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <img src="/images/logo.png" className="w-1/2 h-auto mx-auto mt-4" />
          <div
            className="w-5/6 h-1 bg-gray-600 mx-auto mt-4"
            style={{ height: "1px" }}
          ></div>
          {/* /*client list container*/}
          <div className="flex flex-col flex-grow overflow-auto mt-4 pl-4">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <div
            className="w-5/6 h-1 bg-gray-600 mx-auto mb-4"
            style={{ height: "1px" }}
          ></div>
          <div className="mt-auto flex flex-col justify-center items-center pb-4">
            <button onClick={copyRoomId} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 mb-2 w-1/8 rounded focus:outline-none focus:shadow-outline">
              Copy Room ID
            </button>
            <button onClick={leaveRoom} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 mb-2 w-1/8 rounded focus:outline-none focus:shadow-outline">
              Leave Room
            </button>
          </div>
        </div>
        <div className="md:w-10/12 text-white flex flex-col h-full">
          <Editor 
             socketRef={socketRef}
             roomId={roomId}
             onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
}
