import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { knowledgeDocs, type KnowledgeDocument } from '../../data/knowledge';
import { Search, Filter, Eye, Download } from 'lucide-react';

const categories = ['All', 'SOP', 'Runbook', 'How-To', 'Architecture', 'Policy', 'Checklist'];

const KnowledgeBase: React.FC = () => {
  const { t } = useTranslation(['common', 'knowledge']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);

  const filtered = knowledgeDocs.filter((doc) => {
    const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Knowledge Base & Repository</h1>
            <p className="page-subtitle">Centralized repository for SOPs, Runbooks, Architecture Blueprints, and Incident RCA Guidelines</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-bar">
        <Filter size={14} style={{ color: 'var(--text-tertiary)' }} />
        <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search documents, tags, SOPs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px 6px 30px', background: 'var(--input-bg)', border: '1px solid var(--input-border)',
              borderRadius: 'var(--border-radius-md)', color: 'var(--text)', fontSize: '0.75rem', outline: 'none',
            }}
          />
        </div>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
          {filtered.length} documents
        </span>
      </div>

      {/* Knowledge Documents Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((doc) => (
          <div key={doc.id} className="card" onClick={() => setSelectedDoc(doc)} style={{ cursor: 'pointer' }}>
            <div className="card-header" style={{ marginBottom: 8 }}>
              <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{doc.category}</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{doc.version}</span>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{doc.title}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.4 }}>{doc.summary}</p>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
              {doc.tags.map((tag) => (
                <span key={tag} style={{ padding: '2px 6px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 3, fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>
                  #{tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
              <span>Owner: {doc.owner}</span>
              <span>Views: {doc.usageCount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Doc Preview Modal/Drawer */}
      {selectedDoc && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedDoc(null)} />
          <div className="drawer" role="dialog">
            <div className="drawer-header">
              <div>
                <h3 className="drawer-title">{selectedDoc.title}</h3>
                <span className="health-badge healthy" style={{ marginTop: 4 }}>{selectedDoc.category}</span>
              </div>
              <button className="drawer-close" onClick={() => setSelectedDoc(null)}>✕</button>
            </div>
            <div className="drawer-body">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>SUMMARY</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text)', marginTop: 4 }}>{selectedDoc.summary}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>METADATA</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div>Version: {selectedDoc.version}</div>
                  <div>Owner: {selectedDoc.owner}</div>
                  <div>Last Updated: {selectedDoc.lastUpdated}</div>
                  <div>Next Review: {selectedDoc.reviewDate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                <button className="btn btn-primary btn-sm"><Eye size={12} /> Preview Full Document</button>
                <button className="btn btn-secondary btn-sm"><Download size={12} /> Export PDF</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgeBase;
