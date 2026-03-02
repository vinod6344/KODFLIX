import { Link } from 'react-router-dom';
import { PlayIcon } from '../components/Icons';

const Landing = () => {
  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent z-10" />
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-ff7b-4f22-9309-5a6ba7cd61f3/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-4 md:px-12 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Ready to watch? Sign up or login to start your entertainment journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="btn-primary flex items-center justify-center gap-2 text-lg py-4 px-8"
              >
                <PlayIcon className="w-6 h-6" />
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn-secondary flex items-center justify-center text-lg py-4 px-8"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 md:px-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-5xl mb-4">📺</div>
            <h3 className="text-xl font-bold text-white mb-2">Watch on any device</h3>
            <p className="text-gray-400">Stream on your phone, tablet, laptop, and TV without paying more.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-white mb-2">Unlimited content</h3>
            <p className="text-gray-400">Watch thousands of movies and TV shows from around the world.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure access</h3>
            <p className="text-gray-400">Your account is protected with industry-standard security.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-netflix-red text-2xl font-bold mb-4">KODFLIX</p>
          <p className="text-gray-500 text-sm">
            © 2026 KodFlix. All rights reserved. This is a demo application.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
