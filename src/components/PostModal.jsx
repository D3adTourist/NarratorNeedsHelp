import { useState } from 'react';

const CORRECT_PASSWORD = '1dunnomahn';

export default function PostModal({ isOpen, onClose, onSubmit }) {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      setError('Please fill in both title and story.');
      return;
    }
    
    onSubmit({ title, text });
    
    // Reset form
    setPassword('');
    setTitle('');
    setText('');
    setError('');
    setIsAuthenticated(false);
    onClose();
  };

  const handleClose = () => {
    setPassword('');
    setTitle('');
    setText('');
    setError('');
    setIsAuthenticated(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!isAuthenticated ? (
          <form onSubmit={handlePasswordSubmit}>
            <h2>🔐 Super Secret Password Gate</h2>
            <label htmlFor="password">Password (hint: you definitely know it)</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Psst... it's in the manual 🤫"
              autoFocus
            />
            {error && <p className="error-message">❌ {error} (Nice try though!)</p>}
            <div className="modal-buttons">
              <button type="button" className="modal-button modal-button-secondary" onClick={handleClose}>
                Nevermind
              </button>
              <button type="submit" className="modal-button modal-button-primary">
                Let Me In! 🚪
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStorySubmit}>
            <h2>📝 Become a Legend!</h2>
            <label htmlFor="title">Story Title (make it epic)</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Day I Saved the Narrator..."
              autoFocus
            />
            <label htmlFor="story">Your Masterpiece</label>
            <textarea
              id="story"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="It was a dark and stormy night... or was it? 🤔\n\nWrite something amazing! The narrator is counting on you! 🎭"
            />
            {error && <p className="error-message">⚠️ {error}</p>}
            <div className="modal-buttons">
              <button type="button" className="modal-button modal-button-secondary" onClick={handleClose}>
                Maybe Later
              </button>
              <button type="submit" className="modal-button modal-button-primary">
                🚀 Launch Story!
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
