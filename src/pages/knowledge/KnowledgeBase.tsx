import React, { useState, useMemo } from 'react';
import { knowledgeDocs, type KnowledgeDocument } from '../../data/knowledge';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import { X } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from '../service-operations/CommandCenterLandingPage';

const KnowledgeBase: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);
  const [filteredDocs, setFilteredDocs] = useState<KnowledgeDocument[]>(knowledgeDocs);

  const totalDocs = filteredDocs.length;
  const sopCount = filteredDocs.filter(d => d.category === 'SOP').length;
  const runbookCount = filteredDocs.filter(d => d.category === 'Runbook').length;
  const architectureCount = filteredDocs.filter(d => d.category === 'Architecture').length;
  const kedbCount = filteredDocs.filter(d => d.category === 'Policy' || d.category === 'How-To').length;

  const columns: ColumnDef<KnowledgeDocument>[] = [
    {
      header: 'Doc ID',
      accessorKey: 'id',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Title & Summary',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.title}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>{row.summary}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      width: '110px',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: '0.6875rem',
            background: row.category === 'SOP' ? '#E6F4FC' : row.category === 'Runbook' ? '#FFF7E6' : row.category === 'Architecture' ? '#E3FCEF' : '#F4F5F7',
            color: row.category === 'SOP' ? '#074A76' : row.category === 'Runbook' ? '#E97F0A' : row.category === 'Architecture' ? '#22A06B' : '#475467',
          }}
        >
          {row.category}
        </span>
      ),
    },
    {
      header: 'Owner',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Version',
      accessorKey: 'version',
      width: '80px',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600 }}>{row.version}</span>,
    },
    {
      header: 'Tags',
      accessorKey: 'tags',
      cell: (row) => (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {row.tags.map((t, idx) => (
            <span key={idx} style={{ padding: '1px 6px', borderRadius: 4, background: 'var(--bg-secondary, #F7F8FA)', fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
              #{t}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Usage Count',
      accessorKey: 'usageCount',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.usageCount.toLocaleString()} views
        </span>
      ),
    },
  ];

  const uniqueCategories = useMemo(() => Array.from(new Set(knowledgeDocs.map(d => d.category))).map(c => ({ label: c, value: c })), []);

  const filters: FilterDef<KnowledgeDocument>[] = useMemo(() => [
    { key: 'category', label: 'Categories', options: uniqueCategories },
  ], [uniqueCategories]);

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Knowledge Base & Repository"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Articles</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{totalDocs}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {totalDocs === knowledgeDocs.length ? 'Verified documents' : `Filtered (${totalDocs} of ${knowledgeDocs.length})`}
          </div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Standard SOPs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{sopCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Operational runbooks</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Technical Runbooks</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{runbookCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>DR & Failover guides</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Architectures & Policies</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{architectureCount + kedbCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Architecture blueprints</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={knowledgeDocs}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredDocs}
        searchPlaceholder="Search knowledge base by title, summary, tags, owner..."
        searchKeys={['title', 'summary', 'owner', 'category', 'id']}
        pageSize={10}
        onRowClick={(row) => setSelectedDoc(row)}
        title="Knowledge Base Repository"
        subtitle="Click any document row to view the full operational SOP and procedure"
        exportFilename="ncgr_knowledge_base"
      />

      {/* Document Reader Modal */}
      {selectedDoc && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
            onClick={() => setSelectedDoc(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 700,
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 14,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              zIndex: 1000,
              padding: 24,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                  {selectedDoc.id} • {selectedDoc.version}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.875rem' }}>
              <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Executive Summary:</strong>
                <div style={{ marginTop: 6, lineHeight: 1.5 }}>{selectedDoc.summary}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Owner Lead</div>
                  <div style={{ fontWeight: 700, marginTop: 2 }}>{selectedDoc.owner}</div>
                </div>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Review Date</div>
                  <div style={{ fontWeight: 700, marginTop: 2 }}>{selectedDoc.reviewDate}</div>
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(7,74,118,0.06)', border: '1px solid rgba(7,74,118,0.2)' }}>
                <strong style={{ color: 'var(--ncgr-deep-blue, #074A76)' }}>Tags & Classification:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {selectedDoc.tags.map((t, idx) => (
                    <span key={idx} style={{ padding: '2px 8px', borderRadius: 4, background: '#FFFFFF', fontSize: '0.75rem', fontWeight: 600, color: '#074A76', border: '1px solid #E4E7EC' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgeBase;
