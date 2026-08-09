import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your store AI assistant. How can I help you find something today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          userMessage: userText,
        },
      );
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response?.data?.data },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I am facing connectivity issues connecting to the store database right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Closed Chat Action Icon Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <svg
            xmlns="http://w3.org"
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="w-80 md:w-96 h-115 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Store AI Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-white hover:text-gray-200 font-bold text-lg"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 mb-10">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 border border-gray-150 rounded-2xl rounded-tl-none px-4 py-2 text-xs animate-pulse">
                  Searching inventory...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-100 bg-white flex gap-2 absolute bottom-0 w-[90%]"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ACs, smart phones, features..."
                className="flex-1 border border-gray-300 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-blue-500 transition"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-1.5 rounded-xl text-sm font-medium transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
