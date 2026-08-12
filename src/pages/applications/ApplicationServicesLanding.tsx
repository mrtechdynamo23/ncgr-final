import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { masterApplications, masterBusinessServices, appIncidentsList, appChangesList } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { ArrowRight } from 'lucide-react';

const ApplicationServicesLanding: React.FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const healthyApps = masterApplications.filter(a => a.health === 'Healthy').length;
  const degradedApps = masterApplications.filter(a => a.health === 'Degraded').length;
  const criticalApps = masterApplications.filter(a => a.health === 'Critical').length;
  const activeP1P2Count = appIncidentsList.filter(i => i.priority === 'P1' || i.priority === 'P2').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Services Overview</h1>
            <p className="page-subtitle">Enterprise Application Capability & Business Service Health Command Centre</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Top Concise Operational Widgets (Landing Page Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" onClick={() => navigate('/applications/portfolio')}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Applications</div>
          <div className="kpi-card-value">48</div>
          <div className="kpi-card-trend neutral">Managed Portfolio</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/applications/business-service-health')}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Business Services</div>
          <div className="kpi-card-value">18</div>
          <div className="kpi-card-trend neutral">14 Healthy · 3 Degraded · 1 Critical</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/applications/health')}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Overall Availability</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>99.82%</div>
          <div className="kpi-card-trend up">SLA Target 99.50%</div>
        </div>
        <div className="kpi-card" onClick={() => navigate('/applications/incidents')}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Active P1 / P2 Incidents</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>{activeP1P2Count}</div>
          <div className="kpi-card-trend down">INC0012847 & INC0012839</div>
        </div>
      </div>

      {/* 6 Executive Operational Summary Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
        {/* Widget 1: Application Health Summary */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Application Health Summary</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/applications/health')}>
              View All Health <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
            <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
              <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>HEALTHY</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#40904F', marginTop: 4 }}>{healthyApps}</div>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
              <span className="health-badge at-risk" style={{ fontSize: '0.625rem' }}>DEGRADED</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{degradedApps}</div>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
              <span className="health-badge critical" style={{ fontSize: '0.625rem' }}>CRITICAL</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{criticalApps}</div>
            </div>
          </div>
        </div>

        {/* Widget 2: Business Service Health Summary */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Business Service Health</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/applications/business-service-health')}>
              View Services <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {masterBusinessServices.slice(0, 3).map(bs => (
              <div key={bs.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: 4 }}>
                <span style={{ fontWeight: 600 }}>{bs.name} ({bs.supportingAppsCount} Apps)</span>
                <span className={`health-badge ${bs.currentState === 'Healthy' ? 'healthy' : 'at-risk'}`}>{bs.currentState}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Critical Application Incidents */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Critical Incidents (ServiceNow)</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/applications/incidents')}>
              View Incidents <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {appIncidentsList.slice(0, 2).map(inc => (
              <div key={inc.incidentNumber} style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 4, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span style={{ color: 'var(--ncgr-purple)', fontFamily: 'var(--font-mono)' }}>{inc.incidentNumber} · {inc.appName}</span>
                  <span className={`health-badge ${inc.priority === 'P1' ? 'critical' : 'at-risk'}`}>{inc.priority}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>{inc.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 4: Upcoming Releases */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Upcoming Releases & Changes</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => navigate('/applications/changes')}>
              View Releases <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {appChangesList.slice(0, 2).map(chg => (
              <div key={chg.changeNumber} style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 4, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span style={{ color: 'var(--ncgr-deep-sky)', fontFamily: 'var(--font-mono)' }}>{chg.changeNumber} ({chg.releaseVersion})</span>
                  <span className="health-badge info">{chg.status}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>{chg.appName}: {chg.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ApplicationDetailModal appId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  );
};

export default ApplicationServicesLanding;
