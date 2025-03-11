// correct code

import React, { useState, useEffect } from 'react'; 
import { generateQuestion, getSavedQuestions, deleteQuestion } from '../lib/api';

export function Generate() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [difficultyLevel, setDifficultyLevel] = useState('Easy');
  const [customPrompt, setCustomPrompt] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [generatedQuestion, setGeneratedQuestion] = useState<string | null>(null);

   // ✅ Correctly placed function
   // ✅ Fetch questions safely
const fetchSavedQuestions = async () => {
  try {
    const savedQuestions = await getSavedQuestions();

    if (!Array.isArray(savedQuestions)) {
      console.error("Invalid format received for saved questions:", savedQuestions);
      setQuestions([]); // Ensure it's an array
      return;
    }

    setQuestions(savedQuestions);
  } catch (error) {
    console.error("Error fetching saved questions:", error);
  }
};

// ✅ Ensure prevQuestions is always an array
const handleGenerateQuestion = async () => {
  console.log("Generating question...");

  if (!customPrompt && (!subject.trim() || !topic.trim())) {
    alert("Please enter a Subject and Topic, or use the Custom Prompt.");
    return;
  }

  try {
    const data = await generateQuestion(subject, topic, difficultyLevel, questionType, customPrompt);
    console.log("Full API Response:", JSON.stringify(data, null, 2));

    if (data?.questions && Array.isArray(data.questions)) {
      const formattedQuestions = data.questions
        .filter(q => q.question && q.answer) // ✅ Ensure valid questions
        .map((q) => ({
          question: q.question?.trim() || "No question text",
          options: q.options ? q.options.map(opt => opt.trim()) : [], // ✅ Extract options properly
          correctAnswer: q.answer?.trim(),
        }));

      if (formattedQuestions.length === 0) {
        console.error("No valid questions found in API response.");
        alert("Failed to generate valid questions. Please retry.");
        return;
      }

      setQuestions((prevQuestions) => [...(prevQuestions || []), ...formattedQuestions]);

      setGeneratedQuestion(formattedQuestions[0]?.question || "No valid question found.");
    } else {
      console.error("Invalid question format received:", data);
      alert("Failed to generate question. Please check backend response.");
    }
  } catch (error) {
    console.error("Error generating question:", error);
    alert(error.response?.data?.message || "Something went wrong.");
  }
};


     // ✅ Function properly closed here
  
  
  
  

  return (
    <div className="min-h-screen bg-[#051622] text-gray-300 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Generate Questions</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject..."
              className="w-full bg-[#0D1B2A] rounded-md px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic..."
              className="w-full bg-[#0D1B2A] rounded-md px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* Select Menus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Question Type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full bg-[#0D1B2A] rounded-md px-3 py-2 text-white"
            >
              <option value="MCQ">MCQ</option>
              <option value="Descriptive">Descriptive</option>
              <option value="Coding Problem">Coding Problem</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="w-full bg-[#0D1B2A] rounded-md px-3 py-2 text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Custom Prompt (Optional)</label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter custom prompt..."
            className="w-full bg-[#0D1B2A] rounded-md px-3 py-2 text-white"
          ></textarea>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateQuestion}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Generate Question
        </button>

{/* Generated Questions */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>
  {questions.length > 0 ? (
    <div className="space-y-4">
      {questions.map((q, index) => (
  <div key={index} className="bg-[#0D1B2A] p-4 rounded-md">
    <p className="font-medium">{index + 1}. {q.question}</p>
    <ul className="mt-2 space-y-1">
  {q.options && q.options.length > 0 ? (
    q.options.map((option, i) => (
      <li key={i} className="ml-4 whitespace-pre-line">{option}</li> // ✅ Ensures new lines display correctly
    ))
  ) : (
    <li className="ml-4 text-gray-500">No options available</li>
  )}
</ul>


  </div>
))}

    </div>
  ) : (
    <p className="text-gray-400">No questions generated yet.</p>
  )}
</div>


       {/* Display Single Generated Question only if it's not already in the list */}
{generatedQuestion && questions.length === 0 && (
  <div className="mt-8 bg-[#0D1B2A] p-4 rounded-md">
    <h3 className="text-lg font-semibold mb-2">Generated Question:</h3>
    <p>{generatedQuestion}</p>
  </div>
)}

      </div>
    </div>
  );
}
