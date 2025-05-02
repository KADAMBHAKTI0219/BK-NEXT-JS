import React from 'react';

const InputBox = ({ input, setInput, handleSend }) => {
    return (
        <div className="flex gap-2 p-3 bg-white border-t">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about visas..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-1"
            >
                Send <span>📤</span>
            </button>
        </div>
    );
};

export default InputBox;