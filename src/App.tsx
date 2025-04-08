import React, { useState, useCallback } from 'react';
import { KeyRound, Globe, Copy, Eye, EyeOff } from 'lucide-react';
import { generatePassword, extractBaseUrl } from './utils/passwordGenerator';

function App() {
  const [masterPhrase, setMasterPhrase] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = extractBaseUrl(url);
  const generatedPassword = masterPhrase && baseUrl ? generatePassword(masterPhrase, baseUrl) : '';

  const handleCopy = useCallback(() => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedPassword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Secure Password Generator
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Master Phrase
            </label>
            <div className="relative">
              <input
                type="password"
                value={masterPhrase}
                onChange={(e) => setMasterPhrase(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                placeholder="Enter your master phrase"
              />
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                placeholder="https://example.com"
              />
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {baseUrl && url && (
                <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                  Using domain: {baseUrl}
                </div>
              )}
            </div>
          </div>

          {generatedPassword && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Generated Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={generatedPassword}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 pr-24"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-1">Password copied!</p>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Your master phrase and generated passwords never leave your device.
          All generation is done locally.
        </p>
      </div>
    </div>
  );
}

export default App;