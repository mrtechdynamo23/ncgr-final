import React, { useState } from 'react';
import {
  initiativesList, benefitsMetrics,
  type InitiativeItem
} from '../../data/transformation';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import {
  Bot, TrendingUp, Lightbulb, Zap
} from 'lucide-react';

const AutomationInitiatives: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'automation' | 'ai' | 'benefits' | 'pipeline'>('automation');

  const totalHoursSaved = initiativesList.reduce((s, i) => s + i.monthlyHoursSaved, 0);
  const totalSavingsSAR = initiativesList.reduce((s, i) => s + i.annualSavingsSAR, 0);
  const inProductionCount = initiativesList.filter(i => i.status === 'In Production').length;

  const columns: ColumnDef<InitiativeItem>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Initiative & Platform',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Tech: {row.technology} • Timeline: {row.timeline}
          </div>
        </div>
      ),
    },
    {
      header: 'Tower & Category',
      accessorKey: 'tower',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.tower}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.category}</div>
        </div>
      ),
    },
    {
      header: 'Time Saved',
      accessorKey: 'monthlyHoursSaved',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: '#40904F' }}>
          {row.monthlyHoursSaved} hrs/mo
        </span>
      ),
    },
    {
      header: 'Annual SAR Value',
      accessorKey: 'annualSavingsSAR',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.annualSavingsSAR.toLocaleString()} SAR
        </span>
      ),
    },
    {
      header: 'Lead Owner',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'In Production' ? '#E3FCEF' : row.status === 'Testing' ? '#E6F4FC' : row.status === 'Development' ? '#FFF7E6' : '#F4F5F7';
        const color = row.status === 'In Production' ? '#22A06B' : row.status === 'Testing' ? '#074A76' : row.status === 'Development' ? '#E97F0A' : '#64748B';
        return (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 12,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const uniqueTowers = Array.from(new Set(initiativesList.map(t => t.tower))).map(t => ({ label: t, value: t }));
  const uniqueCategories = Array.from(new Set(initiativesList.map(t => t.category))).map(c => ({ label: c, value: c }));

  const filters: FilterDef<InitiativeItem>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'category', label: 'Categories', options: uniqueCategories },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'In Production', value: 'In Production' },
        { label: 'Testing', value: 'Testing' },
        { label: 'Development', value: 'Development' },
        { label: 'Planned', value: 'Planned' },
      ],
    },
  ];

  const aiInitiatives = initiativesList.filter(t => t.category === 'AI' || t.category === 'Analytics' || t.category === 'Innovation');

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Digital Transformation & AI Accelerator
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Three-Band Accelerator Model: Stabilize & Automate → Optimize & Integrate → Transform & AI (18 Initiatives)
        </p>
      </div>

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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Initiatives</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{initiativesList.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>{inProductionCount} in Production</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>Monthly Hours Saved</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 4 }}>{totalHoursSaved.toLocaleString()} hrs</div>
          <div style={{ fontSize: '0.75rem', color: '#40904F', marginTop: 2, fontWeight: 600 }}>Automated engineer effort</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>Annual Financial Value</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
            {(totalSavingsSAR / 1000000).toFixed(2)}M SAR
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Operational cost avoidance</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>AI / GenAI Workloads</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{aiInitiatives.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Next-gen cognitive ITMS</div>
        </div>
      </div>

      {/* 4 Tabs Navigation */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border, #E4E7EC)', marginBottom: 20 }}>
        {[
          { id: 'automation', label: 'Automation Initiatives', icon: <Zap size={16} /> },
          { id: 'ai', label: 'AI & Cognitive Solutions', icon: <Bot size={16} /> },
          { id: 'benefits', label: 'Benefits & ROI Dashboard', icon: <TrendingUp size={16} /> },
          { id: 'pipeline', label: 'Innovation Pipeline', icon: <Lightbulb size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
              fontWeight: activeTab === tab.id ? 800 : 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: AUTOMATION INITIATIVES */}
      {activeTab === 'automation' && (
        <DataTable
          data={initiativesList}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search automation initiatives by name, tech, tower, owner..."
          searchKeys={['name', 'technology', 'tower', 'owner', 'benefit', 'category']}
          pageSize={15}
          title="Master Automation & Transformation Registry"
          subtitle="Three-Band progressive maturity model deployed across all 9 towers"
          exportFilename="ncgr_automation_initiatives"
        />
      )}

      {/* TAB 2: AI & COGNITIVE SOLUTIONS */}
      {activeTab === 'ai' && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {aiInitiatives.map((ai) => (
              <div
                key={ai.id}
                className="card"
                style={{
                  padding: 20,
                  borderRadius: 12,
                  border: '1px solid var(--border, #E4E7EC)',
                  background: 'var(--card-bg, #FFFFFF)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                    {ai.id}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      background: ai.status === 'In Production' ? '#E3FCEF' : '#E6F4FC',
                      color: ai.status === 'In Production' ? '#22A06B' : '#074A76',
                    }}
                  >
                    {ai.status}
                  </span>
                </div>

                <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {ai.name}
                </h4>
                <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
                  {ai.benefit}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '10px 0', borderTop: '1px solid var(--border, #E4E7EC)' }}>
                  <span>Tech: <strong>{ai.technology}</strong></span>
                  <span style={{ color: '#40904F', fontWeight: 700 }}>{ai.monthlyHoursSaved} hrs/mo saved</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                  <span>Owner: <strong>{ai.owner}</strong></span>
                  <span>Value: <strong>{ai.annualSavingsSAR.toLocaleString()} SAR/yr</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BENEFITS & ROI DASHBOARD */}
      {activeTab === 'benefits' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 24, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              Annual Value Generation Summary
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Cumulative operational efficiency, engineering effort liberation, and budget optimization achieved via automation
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {benefitsMetrics.map((bm, idx) => (
                <div key={idx} style={{ padding: 16, borderRadius: 10, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{bm.metric}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
                    {bm.currentValue}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 4 }}>
                    <span>Target: {bm.targetValue}</span>
                    <span style={{ color: '#22A06B', fontWeight: 700 }}>{bm.achievementPct}% Met</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INNOVATION PIPELINE */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              Q3/Q4 Innovation Ideation Backlog
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Proposed candidate automations undergoing technical feasibility and ROI evaluation
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>Automated SSL Certificate Lifecycle Renewal via AppViewX</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Tower: Security Operations • Estimated Savings: 80 hrs/mo • ROI: 120,000 SAR/yr</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: '#FFF7E6', color: '#E97F0A', fontSize: '0.75rem', fontWeight: 700 }}>In Review</span>
              </div>

              <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>Autonomous Database Query Optimizer via Machine Learning</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Tower: Database Operations • Estimated Savings: 140 hrs/mo • ROI: 210,000 SAR/yr</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: '#E6F4FC', color: '#074A76', fontSize: '0.75rem', fontWeight: 700 }}>Feasibility Approved</span>
              </div>

              <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>Arabic NLP Voice Agent for Service Desk L1 Call Ingestion</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Tower: Digital Workplace • Estimated Savings: 450 hrs/mo • ROI: 600,000 SAR/yr</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: '#FFF7E6', color: '#E97F0A', fontSize: '0.75rem', fontWeight: 700 }}>Architecture Draft</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationInitiatives;
