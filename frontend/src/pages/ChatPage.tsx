import { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState(""); // User input
    const [chat, setChat] = useState<{ question: string; saved: boolean }[]>([]); // Chat history
    const [loading, setLoading] = useState(false);

    // Function to generate a new question
    const generateQuestion = async () => {
        if (!input.trim()) return; // Prevent empty requests

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/generate-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ custom_prompt: input }),
            });

            if (!response.ok) throw new Error("Failed to generate question");

            const data = await response.json();
            if (data.question) {
                setChat((prevChat) => [...prevChat, { question: data.question, saved: false }]);
            }
            setInput(""); // Clear input after sending request
        } catch (error) {
            console.error("❌ Error generating question:", error);
        }
        setLoading(false);
    };

    // Function to save a question
    const saveQuestion = async (index: number) => {
        const questionToSave = chat[index];

        try {
            const response = await fetch("http://localhost:8000/save-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: questionToSave.question }),
            });

            if (!response.ok) throw new Error("Failed to save question");

            // Mark the question as saved in UI
            setChat((prevChat) =>
                prevChat.map((q, i) => (i === index ? { ...q, saved: true } : q))
            );
        } catch (error) {
            console.error("❌ Error saving question:", error);
        }
    };

    return (
        <div className="chat-container">
            <h2>Q-Bot Chat</h2>

            <div className="chat-box">
                {chat.map((q, index) => (
                    <div key={index} className="chat-message">
                        <p>{q.question}</p>
                        {!q.saved && <button onClick={() => saveQuestion(index)}>Save</button>}
                    </div>
                ))}
            </div>

            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a topic..."
                />
                <button onClick={generateQuestion} disabled={loading}>
                    {loading ? "Generating..." : "Generate Question"}
                </button>
            </div>
        </div>
    );
}
