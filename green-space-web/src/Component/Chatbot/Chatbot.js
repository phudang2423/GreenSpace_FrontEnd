import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatVisible, setChatVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { role: "user", content: userInput }]);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/Chatbot/message", {
        user_input: userInput,
      });

      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: response.data }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsLoading(false);
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div
        className="mb-20 fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-transform transform duration-300 ease-in-out"
        onClick={() => setChatVisible(!isChatVisible)}
      >
        <FaComments size={24} />
      </div>

      {isChatVisible && (
        <div className="fixed bottom-20 right-5 w-96 p-4 bg-white border rounded-lg shadow-lg z-50 flex flex-col transition-opacity duration-300 ease-in-out opacity-100">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="text-xl font-semibold">Chatbot Tư Vấn Cây Cảnh</div>
            <FaTimes className="cursor-pointer text-red-500" onClick={() => setChatVisible(false)} />
          </div>
          <div ref={chatContainerRef} className="h-80 overflow-y-auto mb-4 p-2 bg-gray-100 border rounded-lg">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg whitespace-pre-line break-words ${
                      message.role === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"
                    }`}
                    style={{ maxWidth: "75%" }}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center py-2">
              <div className="border-t-4 border-blue-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hỏi tôi về cây cảnh hoặc dụng cụ làm vườn..."
              className="w-full p-2 border rounded-l-lg text-lg"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;