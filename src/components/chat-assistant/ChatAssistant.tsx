import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPortalEntities, type SearchableEntity } from '../../data/search-index';
import { Bot, X, Send, Sparkles, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  navigatePath?: string;
  navigateLabel?: string;
  entities?: SearchableEntity[];
}

const quickPrompts = [
  'Show me technology exceptions',
  'Open ServiceNow health',
  'Which contracts expire soon?',
  'Who is on night shift?',
  'Open GCP health dashboard',
];

const ChatAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am the NCGR Assistant. I can help you search technology health, incidents, resources, contracts, and navigate the portal. What would you like to know?',
    },
  ]);

  const handleSend = (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');

    // Process query using shared search index
    setTimeout(() => {
      const q = text.toLowerCase();
      let responseText = '';
      let navigatePath: string | undefined = undefined;
      let navigateLabel: string | undefined = undefined;

      // Smart navigation matching
      if (q.includes('servicenow') || q.includes('itsm')) {
        responseText = 'Opening ServiceNow Platform Health dashboard...';
        navigatePath = '/technology/servicenow';
        navigateLabel = 'Go to ServiceNow Health';
      } else if (q.includes('gcp') || q.includes('azure') || q.includes('cloud')) {
        responseText = 'Opening Cloud & FinOps Command dashboard...';
        navigatePath = '/finops';
        navigateLabel = 'Go to Cloud & FinOps';
      } else if (q.includes('shift') || q.includes('roster')) {
        responseText = 'Opening Shift Roster & Operational Services...';
        navigatePath = '/operations/resource-roster';
        navigateLabel = 'Go to Resource Roster';
      } else if (q.includes('exception') || q.includes('attention')) {
        responseText = 'Here are the current open technology exceptions in the Command Centre.';
        navigatePath = '/technology/estate';
        navigateLabel = 'View Technology Exceptions';
      } else if (q.includes('risk')) {
        responseText = 'Opening Risk Management & Heatmap...';
        navigatePath = '/governance/risks';
        navigateLabel = 'Go to Risk Management';
      } else if (q.includes('knowledge') || q.includes('runbook') || q.includes('sop')) {
        responseText = 'Opening Knowledge Base & Repository...';
        navigatePath = '/knowledge';
        navigateLabel = 'Go to Knowledge Base';
      } else {
        // Search index lookup
        const searchResults = searchPortalEntities(text, 3);
        if (searchResults.length > 0) {
          responseText = `Found ${searchResults.length} matching entities in the portal dataset:`;
        } else {
          responseText = `I could not find exact live data for "${text}". Try asking about ServiceNow, GCP cloud, risks, or shift rosters.`;
        }
        const assistantMsg: ChatMessage = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: responseText,
          entities: searchResults,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        navigatePath,
        navigateLabel,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Automatically navigate if route matched
      if (navigatePath) {
        setTimeout(() => {
          navigate(navigatePath!);
        }, 800);
      }
    }, 400);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chat-float-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open NCGR Assistant"
        title="NCGR Assistant"
      >
        <Bot size={24} />
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 84,
            right: 24,
            width: 380,
            maxWidth: '90vw',
            height: 520,
            background: 'var(--card-bg)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--border-radius-xl)',
            boxShadow: '0 12px 36px var(--shadow-lg)',
            zIndex: 46,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '14px 16px',
              background: 'var(--ncgr-purple)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>NCGR Assistant</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.8 }}>Operational Demo Assistant</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white' }}>
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: 'var(--border-radius-lg)',
                  background: msg.sender === 'user' ? 'var(--ncgr-deep-blue)' : 'var(--bg-secondary)',
                  color: msg.sender === 'user' ? 'white' : 'var(--text)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.4,
                }}
              >
                {msg.text}

                {msg.navigatePath && (
                  <button
                    onClick={() => {
                      navigate(msg.navigatePath!);
                      setIsOpen(false);
                    }}
                    style={{
                      marginTop: 8,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: msg.sender === 'user' ? '#7dd3fc' : 'var(--ncgr-deep-sky)',
                    }}
                  >
                    {msg.navigateLabel} <ArrowRight size={12} />
                  </button>
                )}

                {msg.entities && (
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {msg.entities.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          navigate(e.path);
                          setIsOpen(false);
                        }}
                        style={{
                          padding: '4px 8px',
                          background: 'var(--card-bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--border-radius-sm)',
                          fontSize: '0.6875rem',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{e.title}</div>
                        <div style={{ color: 'var(--text-tertiary)' }}>{e.subtitle}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '6px 12px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', display: 'flex', gap: 4, overflowX: 'auto' }}>
            {quickPrompts.slice(0, 3).map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                style={{
                  padding: '3px 8px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  fontSize: '0.625rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Ask Assistant or type command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                borderRadius: 'var(--border-radius-md)',
                color: 'var(--text)',
                fontSize: '0.8125rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              className="btn btn-primary"
              style={{ padding: '8px 12px' }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
