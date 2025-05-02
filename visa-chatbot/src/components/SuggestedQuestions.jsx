import React from 'react';

const SuggestedQuestions = ({ onSelect, onToggle }) => {
    const suggestions = [
        "How do I apply for a visa?",
        "What documents do I need to get a visa?",
        "What happens if I overstay my visa?",
        "How much does a visa cost?",
        "Can I travel to multiple countries with one visa?"
    ];

    return (
        <div className="relative bg-gray-50 border-t p-3">
            {/* Toggle Button (Close/Show) */}
            <button
                onClick={onToggle}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
            >
                ✖
            </button>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(q)}
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded text-sm hover:from-indigo-600 hover:to-blue-600 transition-all shadow-sm"
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SuggestedQuestions;