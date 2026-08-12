import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPortalEntities, type SearchableEntity } from '../../data/search-index';
import { Search, X, Command } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableEntity[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setResults(searchPortalEntities(''));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setResults(searchPortalEntities(query));
    }
  }, [query, isOpen]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchableEntity) => {
    navigate(item.path);
    onClose();
  };

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-input">
          <Search size={18} style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Type a command or search entities (e.g. ServiceNow, GCP, Incidents, Roster)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} style={{ color: 'var(--text-tertiary)' }}>
            <X size={16} />
          </button>
        </div>

        <div className="command-palette-results">
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} className="command-palette-item" onClick={() => handleSelect(item)}>
                <Command size={14} className="command-palette-item-icon" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{item.subtitle}</div>
                </div>
                <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{item.type}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>
              No matching entities found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
