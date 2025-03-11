import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Generate } from './pages/Generate';

// Placeholder components for missing pages
function SavedQuestions() {
  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold">Saved Questions</h1>
      <p>No saved questions available.</p>
    </div>
  );
}

function About() {
  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold">About Q-bot</h1>
      <p>This is an AI-based exam question generator.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#051622]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/saved" element={<SavedQuestions />} /> {/* Added Saved Questions Page */}
            <Route path="/about" element={<About />} /> {/* Added About Page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
