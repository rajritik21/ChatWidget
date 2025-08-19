import { h } from 'preact';

function TailwindDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Tailwind CSS Demo
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Testing Tailwind CSS configuration in your Preact app
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1 - Colors & Typography */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Colors & Typography</h3>
            <p className="text-gray-600 mb-4">Testing various text colors and font weights</p>
            <div className="space-y-2">
              <p className="text-sm text-red-500 font-medium">Red text</p>
              <p className="text-sm text-green-600 font-semibold">Green text</p>
              <p className="text-sm text-blue-700 font-bold">Blue text</p>
            </div>
          </div>

          {/* Card 2 - Spacing & Layout */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">📐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Spacing & Layout</h3>
            <p className="text-gray-600 mb-4">Testing margins, padding, and flexbox</p>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <div className="w-4 h-4 bg-green-400 rounded"></div>
            </div>
          </div>

          {/* Card 3 - Responsive Design */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive Design</h3>
            <p className="text-gray-600 mb-4">Testing responsive breakpoints</p>
            <div className="text-xs text-gray-500">
              <p>Mobile: <span className="text-green-600 font-medium">Visible</span></p>
              <p className="hidden md:block">Tablet: <span className="text-green-600 font-medium">Visible</span></p>
              <p className="hidden lg:block">Desktop: <span className="text-green-600 font-medium">Visible</span></p>
            </div>
          </div>

          {/* Card 4 - Animations */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4 flex items-center justify-center animate-pulse">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Animations</h3>
            <p className="text-gray-600 mb-4">Testing hover and animation classes</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105">
              Hover me!
            </button>
          </div>

          {/* Card 5 - Forms */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Forms</h3>
            <p className="text-gray-600 mb-4">Testing form styling</p>
            <input 
              type="text" 
              placeholder="Type something..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Card 6 - Utilities */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-xl">🔧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Utilities</h3>
            <p className="text-gray-600 mb-4">Testing various utility classes</p>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-3/4"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Status Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tailwind Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Colors working</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Typography working</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Spacing working</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Responsive working</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Animations working</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Utilities working</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">How to test:</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• If you see styled cards with gradients, colors are working</li>
            <li>• If text has different sizes and colors, typography is working</li>
            <li>• If layout changes on different screen sizes, responsive is working</li>
            <li>• If buttons have hover effects, animations are working</li>
            <li>• If the form input has focus states, utilities are working</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default TailwindDemo; 