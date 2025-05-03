import React from 'react';

const MessageBubble = ({ sender, text }) => {
    // Handle undefined or null text
    if (!text) {
        return (
            <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-3 animate-fadeIn`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                    sender === "user"
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 border-r-4 border-blue-400"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-l-4 border-indigo-400"
                } shadow-md`}>
                    <p>Empty message</p>
                </div>
            </div>
        );
    }

    // Ensure text is a string before splitting
    const messageText = typeof text === 'string' ? text : String(text);

    return (
        <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-3 animate-fadeIn`}>
            <div
                className={`max-w-[80%] p-3 rounded-lg ${
                    sender === "user"
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 border-r-4 border-blue-400"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-l-4 border-indigo-400"
                } shadow-md`}
            >
                {messageText.split("\n").map((line, idx) => (
                    <div key={idx}>
                        {line.startsWith("- ") ? (
                            <ul className="list-outside list-[circle] ml-4">
                                <li>{line.replace("- ", "")}</li>
                            </ul>
                        ) : (
                            <p>{line}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageBubble;