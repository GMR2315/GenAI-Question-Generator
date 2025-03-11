import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, FileCheck, Download, Sparkles } from 'lucide-react';
import { getStats } from '../lib/api'; // API call for stats

export function Home() {
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStats(); // Fetch total generated questions
        setTotalQuestions(stats.totalQuestions);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Brain className="h-16 w-16 text-primary-700" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Generate Exam Questions with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create high-quality, customized exam questions in seconds using advanced AI technology.
              Perfect for educators and content creators.
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors"
            >
              Start Generating Questions
              <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Q-bot?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Generation"
              description="Advanced AI algorithms create unique, relevant questions tailored to your needs."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Multiple Formats"
              description="Generate MCQs, descriptive questions, and coding problems with ease."
            />
            <FeatureCard
              icon={<FileCheck className="h-8 w-8" />}
              title="Quality Assured"
              description="Each question is validated for accuracy and educational value."
            />
          </div>

          {/* Dynamic Stats Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              {totalQuestions !== null ? `🔥 Over ${totalQuestions} questions generated!` : "Loading stats..."}
            </h3>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Question Creation Process?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join educators worldwide who are already using Q-bot to create engaging exam questions.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-primary-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Try Q-bot Now
            <Download className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="text-primary-700 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
