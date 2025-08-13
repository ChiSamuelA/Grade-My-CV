import { useState, useRef, useEffect } from 'react';
import { useLanguageSwitcher } from '~/i18n';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguage, setLanguage } = useLanguageSwitcher();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentFlag = currentLanguage === 'en' ? 'english' : 'french';
  const otherFlag = currentLanguage === 'en' ? 'french' : 'english';
  const otherLang = currentLanguage === 'en' ? 'fr' : 'en';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher-button group"
        aria-label={`Current language: ${currentLanguage === 'en' ? 'English' : 'Français'}`}
      >
        {/* Flag Icon */}
        <div className="flag-container">
          <img
            src={`/images/${currentFlag}.svg`}
            alt={currentLanguage === 'en' ? 'English' : 'Français'}
            className="flag-icon"
          />
        </div>
        
        {/* Dropdown Arrow */}
        <svg
          className={`dropdown-arrow ${isOpen ? 'dropdown-arrow-open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="language-dropdown">
          <button
            onClick={() => handleLanguageChange(otherLang)}
            className="language-option"
            aria-label={`Switch to ${otherLang === 'en' ? 'English' : 'Français'}`}
          >
            <div className="flag-container">
              <img
                src={`/images/${otherFlag}.svg`}
                alt={otherLang === 'en' ? 'English' : 'Français'}
                className="flag-icon"
              />
            </div>
            <span className="language-name">
              {otherLang === 'en' ? 'English' : 'Français'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;