import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Glass background with purple tint */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-navyDark"></div>
        <div className="absolute inset-0 glass-section"></div>
        <div className="blur-blob blob-purple top-1/4 left-1/4 opacity-25"></div>
        <div className="blur-blob blob-cyan bottom-1/4 right-1/4 opacity-20"></div>
      </div>
      <div className="glass-panel p-8 text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4 title-gradient">404</h1>
        <p className="text-xl text-gray-300 mb-4">Oops! Page not found</p>
        <a href="/" className="text-purple-light hover:text-purple underline transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
