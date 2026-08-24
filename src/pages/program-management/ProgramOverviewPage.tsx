import React from 'react';
import { useNavigate } from 'react-router-dom';
import { programs, milestones, dependencies, issuesAndActions, type ProgramRecord } from '../../data/programs';
import { ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { PROGRAM_MGMT_SIBLINGS } from './ProgramManagementLandingPage';

const ProgramOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;
  const onTrackMilestones = milestones.filter(m => m.status === 'On Track').length;
  const criticalDependencies = dependencies.filter(d => d.impact === 'High').length;
  const openIssues = issuesAndActions.filter(i => i.status !== 'Completed').length;

  const programProgressData = programs.map(p => ({
    name: p.name.length > 20 ? p.name.slice(0, 18) + '...' : p.name,
    fullName: p.name,
    progress: p.progressPct,
  }));

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Program Management"
        modulePath="/program-management"
        pageTitle="Program Overview & Roadmap"
        siblingPages={PROGRAM_MGMT_SIBLINGS}
      />

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => navigate('/program-management/milestones')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--ncgr-deep-blue, #074A76)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.8125rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>Milestones Timeline</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/program-management/resource-mobilisation')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--surface, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              border: '1px solid var(--border, #E4E7EC)',
              cursor: 'pointer',
            }}
          >
            Resource Mobilization
          </button>
        </div>

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active Programs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{programs.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 4 }}>Across all 9 towers</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Milestones Complete</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{completedMilestones} / {milestones.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#40904F', fontWeight: 600, marginTop: 4 }}>{onTrackMilestones} on track</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Dependencies</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{dependencies.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', fontWeight: 600, marginTop: 4 }}>{criticalDependencies} critical path links</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Program Issues</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 2 }}>{openIssues}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', fontWeight: 600, marginTop: 4 }}>Active remediation</div>
        </div>
      </div>

      {/* Program Progress Overview Chart */}
      <div
        className="card"
        style={{
          padding: 20,
          borderRadius: 12,
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 24,
        }}
      >
        <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
          Transformation Programs Progress (%)
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          Current completion percentage against multi-year baseline milestones
        </p>

        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programProgressData} layout="vertical" margin={{ left: 80, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} width={160} />
              <Tooltip
                contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }}
                labelFormatter={(_label, payload) => (payload && payload[0]?.payload?.fullName) ? payload[0].payload.fullName : _label}
                formatter={(val: any) => [`${val}%`, 'Completion']}
              />
              <Bar dataKey="progress" name="Completion %" fill="#074A76" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Portfolio Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {programs.map((p: ProgramRecord) => (
          <div
            key={p.id}
            className="card"
            style={{
              padding: 20,
              borderRadius: 12,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--card-bg, #FFFFFF)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                {p.id}
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  background: p.overallStatus === 'Completed' ? '#E3FCEF' : p.overallStatus === 'On Track' ? '#E6F4FC' : '#FFF7E6',
                  color: p.overallStatus === 'Completed' ? '#22A06B' : p.overallStatus === 'On Track' ? '#074A76' : '#E97F0A',
                }}
              >
                {p.overallStatus}
              </span>
            </div>

            <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {p.name}
            </h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
              {p.description}
            </p>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-secondary, #475467)' }}>Overall Completion</span>
                <span style={{ fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{p.progressPct}%</span>
              </div>
              <div style={{ height: 6, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.progressPct}%`, background: p.progressPct === 100 ? '#22A06B' : '#074A76', borderRadius: 3 }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', paddingTop: 10, borderTop: '1px solid var(--border, #E4E7EC)' }}>
              <span>Manager: <strong>{p.programManager}</strong></span>
              <span>Budget: <strong style={{ color: p.budgetStatus === 'Over Budget' ? '#DE350B' : '#22A06B' }}>{p.budgetStatus}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramOverviewPage;
