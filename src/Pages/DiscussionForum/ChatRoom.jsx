import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../Context/FirebaseContext";
import { uploadMessages, subscribeToMessages } from "../../FireStoreDB/Db";

const ChatRoom = () => {
  const { user, matchUser } = useFirebase();
  const [currentUserInfo, setCurrentUserInfo] = useState({
    displayName: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const getCurrentLoggedInUser = async () => {
      try {
        const currentUser = await matchUser(user);
        setCurrentUserInfo(currentUser);
      } catch (error) {
        console.error("Failed to get the current user", error);
      }
    };

    if (user) {
      getCurrentLoggedInUser();
    }
  }, [matchUser, user]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const messageData = {
          text: message,
          createdAt: serverTimestamp(),
          user: currentUserInfo.displayName,
        };

        await uploadMessages(messageData);
        setMessage("");
        textareaRef.current.style.height = 'auto';
      } catch (error) {
        console.error("Failed to upload message:", error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col  h-screen bg-gray-100">
      <div className="flex-grow  overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 pt-32">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome {currentUserInfo.displayName} to the Global Chat
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 h-[calc(100vh-16rem)] overflow-y-auto">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${
                    msg.user === currentUserInfo.displayName
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs md:max-w-md rounded-lg p-3 ${
                      msg.user === currentUserInfo.displayName
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="font-semibold mb-1">{msg.user}</div>
                    <div className="text-sm mb-1">{msg.text}</div>
                    <div className="text-xs opacity-75">
                      {formatDate(msg.createdAt)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Type your message here..."
              className="flex-grow resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;