import { useState, useEffect, useRef } from 'react';

export default function Controls({ isDarkMode, onToggleDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controlsRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="controls" ref={controlsRef}>
      <div className={`controls-menu ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="control-button" 
          onClick={onToggleDarkMode}
          title={isDarkMode ? '☀️ Light mode' : '🌙 Dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className="control-button" 
          onClick={scrollToTop}
          title="🚀 Jump to top"
        >
          ⬆️
        </button>
        <button 
          className="control-button" 
          onClick={scrollToBottom}
          title="🏊 Jump to bottom"
        >
          ⬇️
        </button>
      </div>
      <div className="control-trigger" onClick={toggleMenu}>
        <span className="control-icon">⚙️</span>
      </div>
    </div>
  );
}
