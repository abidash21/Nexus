import React, { useState } from "react";
import Client from "./Client";
import Editor from "./Editor";

export default function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Abinash" },
    { socketId: 2, username: "Bubun" },
  ]);

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
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 mb-2 w-1/8 rounded focus:outline-none focus:shadow-outline">
              Copy Room ID
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 mb-2 w-1/8 rounded focus:outline-none focus:shadow-outline">
              Leave Room
            </button>
          </div>
        </div>
        <div className="md:w-10/12 text-white flex flex-col h-full">
           <Editor />
        </div>
      </div>
    </div>
  );
}
