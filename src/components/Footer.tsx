import React from 'react';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 mt-auto bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-300 text-sm font-medium">
            Built with ❤️ by Griffin
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://twitter.com/GriffinHea69343"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2 bg-gray-700/50 rounded-full px-4 py-2"
            >
              <Twitter size={18} />
              <span className="text-sm font-medium">@GriffinHea69343</span>
            </a>
            <a
              href="https://github.com/codesage1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-gray-700/50 rounded-full px-4 py-2"
            >
              <Github size={18} />
              <span className="text-sm font-medium">@codesage1</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 