"use client"; // This will ensure the component runs in the browser

import { useState, useEffect, FormEvent, useRef } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect should be inside the component
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
  };
  // handleSubmit should also be inside the component
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now(),
          sender: "bot",
          text: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Handling the error response if it's not `ok`
        const errorMessage: Message = {
          id: Date.now(),
          sender: "bot",
          text:
            data.error || "An error occurred while processing your request.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (e) {
      console.error("Error in chat API", e);
      const errorMessage: Message = {
        id: Date.now(),
        sender: "bot",
        text: "An error occurred while processing your request.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-screen pb-10 bg-white">
      <div className="w-full flex items-center px-4 py-4 justify-center ">
        <header>
          <h1 className="text-[2rem] font-extrabold text-black">ASK BOT</h1>
        </header>
      </div>

      <div
        className="flex flex-col flex-grow m-12 rounded-2xl border-8 border-white-700"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundPosition: "center",
        }}
      >
        {/* Chat Messages Area */}
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xl ${
                  msg.sender === "user"
                    ? "bg-gray-200 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex space-x-1">
                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay"></span>
                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Chat Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center p-4 pb-4 bg-white shadow mt-4 rounded-lg flex-shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
            disabled={loading}
          >
            Submit
          </button>
          <button
            onClick={clearMessages}
            className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
