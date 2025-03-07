import React, { useState } from 'react';
import { Bot, FileText, Download, Home, PlusCircle, Save, Settings, Search } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Question {
  id: string;
  content: string;
  type: string;
  subject: string;
  topic: string;
  difficulty: string;
  timestamp: string;
}

type Page = 'home' | 'generate' | 'saved' | 'export' | 'paper';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('mcq');
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [customPrompt, setCustomPrompt] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGenerateQuestions = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      content: customPrompt || `Generated question for ${subject} - ${topic}`,
      type: questionType,
      subject,
      topic,
      difficulty: difficultyLevel,
      timestamp: new Date().toLocaleTimeString()
    };
    setQuestions([newQuestion, ...questions]);
    setCustomPrompt('');
  };

  const exportQuestions = (format: 'pdf' | 'text') => {
    if (questions.length === 0) {
      alert('No questions to export!');
      return;
    }

    if (format === 'pdf') {
      const doc = new jsPDF();
      let yOffset = 20;
      const lineHeight = 10;

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Q-Bot Generated Questions', 20, yOffset);
      yOffset += lineHeight * 2;

      // Questions
      questions.forEach((question, index) => {
        if (yOffset > 250) {
          doc.addPage();
          yOffset = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`Question ${index + 1}`, 20, yOffset);
        yOffset += lineHeight;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Subject: ${question.subject}`, 20, yOffset);
        yOffset += lineHeight;
        doc.text(`Topic: ${question.topic}`, 20, yOffset);
        yOffset += lineHeight;
        doc.text(`Type: ${question.type}`, 20, yOffset);
        yOffset += lineHeight;
        doc.text(`Difficulty: ${question.difficulty}`, 20, yOffset);
        yOffset += lineHeight;

        const splitContent = doc.splitTextToSize(question.content, 170);
        doc.text(splitContent, 20, yOffset);
        yOffset += (splitContent.length * lineHeight) + lineHeight;
      });

      doc.save(`qbot-questions-${Date.now()}.pdf`);
    } else {
      const content = questions.map((question, index) => `
Question ${index + 1}
--------------
Subject: ${question.subject}
Topic: ${question.topic}
Type: ${question.type}
Difficulty: ${question.difficulty}
Time: ${question.timestamp}

${question.content}
`).join('\n\n');

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qbot-questions-${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setShowExportMenu(false);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center px-4">
      <div className="max-w-3xl">
        <div className="flex justify-center mb-8">
          <Bot className="w-24 h-24 text-[#60A5FA]" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-transparent bg-clip-text">
          Welcome to Q-Bot
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Your AI-powered question generation assistant. Create engaging questions for exams, 
          quizzes, and educational content with just a few clicks.
        </p>
        <button
          onClick={() => setCurrentPage('generate')}
          className="px-8 py-4 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] rounded-lg font-medium text-lg hover:opacity-90 transition-opacity"
        >
          Start Generating Questions
        </button>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <nav className="flex space-x-2 mb-6">
      {[
        { icon: Home, label: 'Home', page: 'home' },
        { icon: PlusCircle, label: 'Generate', page: 'generate' },
        { icon: Save, label: 'Saved', page: 'saved' },
        { icon: Settings, label: 'Full Paper', page: 'paper' }
      ].map(({ icon: Icon, label, page }) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page as Page)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-white/20 text-white'
              : 'text-gray-400 hover:bg-white/10'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </nav>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return renderHome();
      case 'generate':
        return (
          <div className="max-w-4xl mx-auto px-4">
            {renderNavigation()}
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 bg-[#1A2B3B] rounded-lg border border-white/10"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-400">
                        {question.type.toUpperCase()} Question
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        {question.difficulty}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{question.timestamp}</span>
                  </div>
                  <p className="text-white">{question.content}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20">
                      Save
                    </button>
                    <button className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20">
                      Regenerate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'saved':
        return (
          <div className="max-w-4xl mx-auto px-4">
            {renderNavigation()}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved questions..."
                  className="w-full pl-10 pr-4 py-2 bg-[#1A2B3B] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
                />
              </div>
            </div>
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 bg-[#1A2B3B] rounded-lg border border-white/10"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-400">
                      {question.subject} - {question.topic}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-sm text-red-400 hover:text-red-300">
                        Delete
                      </button>
                      <button className="text-sm text-blue-400 hover:text-blue-300">
                        Edit
                      </button>
                    </div>
                  </div>
                  <p className="text-white">{question.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'paper':
        return (
          <div className="max-w-4xl mx-auto px-4">
            {renderNavigation()}
            <div className="bg-[#1A2B3B] rounded-lg border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6">Generate Full Paper</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Time Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
                  />
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] rounded-lg font-medium hover:opacity-90 transition-opacity">
                Generate Full Paper
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="fixed top-0 w-full bg-[#0A1929]/90 backdrop-blur-sm z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Bot className="w-10 h-10 text-[#60A5FA]" />
            <div>
              <h1 className="text-2xl font-bold text-[#60A5FA]">Q-Bot</h1>
              <p className="text-sm text-gray-400">Your AI-powered question generator</p>
            </div>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A2B3B] rounded-lg shadow-lg border border-white/10">
                <button
                  onClick={() => exportQuestions('pdf')}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 rounded-t-lg"
                >
                  <FileText className="w-4 h-4" /> Export as PDF
                </button>
                <button
                  onClick={() => exportQuestions('text')}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 rounded-b-lg"
                >
                  <FileText className="w-4 h-4" /> Export as Text
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-24 pb-96">
        {renderContent()}
      </div>

      {/* Input Area */}
      {currentPage === 'generate' && (
        <div className="fixed bottom-0 w-full bg-[#1A2B3B] border-t border-white/10">
          <div className="max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter any subject..."
                  className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter any topic..."
                  className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA] text-white"
                >
                  <option value="mcq">MCQ</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="coding">Coding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Difficulty Level</label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA] text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your custom prompt or try these examples:
• Generate 5 MCQs about World War II with medium difficulty
• Create 3 coding questions about data structures in Python
• Write descriptive questions about ancient Egyptian civilization"
                className="w-full px-4 py-3 bg-[#0A1929] rounded-lg border border-white/10 focus:outline-none focus:border-[#60A5FA]"
              />
            </div>

            <button
              onClick={handleGenerateQuestions}
              className="w-full py-3 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Generate Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;