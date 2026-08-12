import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { risksList, type RiskItem } from '../../data/governance';

const RiskManagement: React.FC = () => {
  const { t } = useTranslation(['common', 'governance']);
  const [_selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return '#DE350B';
      case 'High': return '#E97F0A';
      case 'Medium': return '#CE813C';
      default: return '#22A06B';
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">{t('governance:riskManagement.title')}</h1>
            <p className="page-subtitle">Enterprise IT Risk Matrix, Heatmap & Operational Mitigation Register</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Critical Risks</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>
            {risksList.filter((r) => r.impact === 'Critical').length}
          </div>
          <div className="kpi-card-trend down">Requires Management Action</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">High Risks</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>
            {risksList.filter((r) => r.impact === 'High').length}
          </div>
          <div className="kpi-card-trend neutral">Mitigation in Progress</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Mitigated This Month</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>4</div>
          <div className="kpi-card-trend up">On Schedule</div>
        </div>
      </div>

      {/* Heatmap & Risk Register */}
      <div className="grid-2" style={{ marginBottom: 24, alignItems: 'flex-start' }}>
        {/* Heatmap (Likelihood x Impact) */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Risk Heatmap (Likelihood × Impact)</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(3, 1fr)', gap: 8, textAlign: 'center', fontSize: '0.75rem' }}>
            <div />
            <div style={{ fontWeight: 600 }}>Low Impact</div>
            <div style={{ fontWeight: 600 }}>Med Impact</div>
            <div style={{ fontWeight: 600 }}>High/Crit Impact</div>

            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>High Like.</div>
            <div style={{ padding: 16, background: '#FFF7E6', border: '1px solid #FFE0B2', borderRadius: 4, fontWeight: 600 }}>Low (1)</div>
            <div style={{ padding: 16, background: '#FFE0B2', border: '1px solid #FFB74D', borderRadius: 4, fontWeight: 600 }}>Med (2)</div>
            <div style={{ padding: 16, background: '#FFEBE6', border: '1px solid #FFBDAD', color: '#DE350B', borderRadius: 4, fontWeight: 700 }}>HIGH (3)</div>

            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Med Like.</div>
            <div style={{ padding: 16, background: '#E3FCEF', border: '1px solid #ABF5D1', borderRadius: 4, fontWeight: 600 }}>Low (0)</div>
            <div style={{ padding: 16, background: '#FFF7E6', border: '1px solid #FFE0B2', borderRadius: 4, fontWeight: 600 }}>Low (1)</div>
            <div style={{ padding: 16, background: '#FFE0B2', border: '1px solid #FFB74D', borderRadius: 4, fontWeight: 600 }}>Med (2)</div>

            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Low Like.</div>
            <div style={{ padding: 16, background: '#E3FCEF', border: '1px solid #ABF5D1', borderRadius: 4, fontWeight: 600 }}>Low (0)</div>
            <div style={{ padding: 16, background: '#E3FCEF', border: '1px solid #ABF5D1', borderRadius: 4, fontWeight: 600 }}>Low (0)</div>
            <div style={{ padding: 16, background: '#FFF7E6', border: '1px solid #FFE0B2', borderRadius: 4, fontWeight: 600 }}>Low (1)</div>
          </div>
        </div>

        {/* Risk Register Table */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Enterprise Risk Register</h2>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Impact</th>
                  <th>Tower</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {risksList.map((rsk) => (
                  <tr key={rsk.id} className="clickable-row" onClick={() => setSelectedRisk(rsk)}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{rsk.id}</td>
                    <td>
                      <span className="health-badge" style={{ background: `${getImpactColor(rsk.impact)}15`, color: getImpactColor(rsk.impact) }}>
                        {rsk.impact}
                      </span>
                    </td>
                    <td>{rsk.tower}</td>
                    <td style={{ fontSize: '0.75rem' }}>{rsk.owner}</td>
                    <td>
                      <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{rsk.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;
