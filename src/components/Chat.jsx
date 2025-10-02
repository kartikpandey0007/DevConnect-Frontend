import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      //sending msg from frontend and will be received in backend
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    //connect to server using socket
    const socket = createSocketConnection(); // use this socket to emit events

    //as soon as page loads the socket connection is made and join chat event is emitted
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      //getting msg from backend and will be displayed in frontend
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]); //whenever userId or targetUserId changes the useEffect will run again

  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-700 rounded-2xl m-5 h-[70vh] flex flex-col bg-gray-900 shadow-lg">
      {/* Header */}
      <h1 className="p-4 border-b border-gray-700 text-green-400 text-xl font-bold text-center">
        Chat
      </h1>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-green-300 flex flex-col">
        {messages.map((msg, index) => {
          const isSender = msg.firstName === firstName; // current user
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`chat-bubble rounded-xl px-4 py-2 max-w-[60%] break-words ${
                  isSender
                    ? "bg-green-500 text-black rounded-br-none"
                    : "bg-gray-700 text-green-200 rounded-bl-none"
                }`}
              >
                <div className="font-semibold text-sm mb-1">
                  {isSender ? "You" : `${msg.firstName} ${msg.lastName}`}
                </div>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-800 rounded-b-2xl">
        <input
          value={newMessage} //bind to newMessage variable
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 rounded-full px-4 py-2 bg-gray-700 text-green-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your message..."
        />
        <button
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-full transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
