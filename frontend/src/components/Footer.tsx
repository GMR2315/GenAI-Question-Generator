import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary-700" />
              <span className="text-lg font-bold text-gray-900">Q-bot</span>
            </div>
            <p className="text-gray-600">
              AI-powered exam question generator for educators and students.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/generate" className="text-gray-600 hover:text-primary-700">
                  Generate Questions
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-gray-600 hover:text-primary-700">
                  Saved Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-700">
                  About Q-bot
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-700">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary-700">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-700">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-700">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-700">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {currentYear} Q-bot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}