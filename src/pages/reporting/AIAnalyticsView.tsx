import React from 'react';
import { Bot } from 'lucide-react';

interface AIInsightItem {
  id: string;
  insight: string;
  impact: string;
  recommendedAction: string;
  confidence: string;
  domain: string;
}

const aiInsightsList: AIInsightItem[] = [
  {
    id: 'AI-INS-01',
    domain: 'Network Operations',
    insight: 'Network health remains stable with 99.97% availability across core switches and edge routers.',
    impact: 'Low operational risk for core connectivity.',
    recommendedAction: 'Maintain current BGP monitoring rules; follow up on STC WAN Gateway latency spike during peak hours.',
    confidence: '98.5%'
  },
  {
    id: 'AI-INS-02',
    domain: 'Resource Mobilization',
    insight: 'Two resource gaps remain in the Network and Cloud towers (2 open roles per tower).',
    impact: 'Potential delay in Cloud cost optimization Wave 2 and network bandwidth expansion.',
    recommendedAction: 'Accelerate interview process for Network Specialist (MOB-04) and Cloud Engineer (MOB-06).',
    confidence: '94.2%'
  },
  {
    id: 'AI-INS-03',
    domain: 'FinOps & Cloud Spend',
    insight: 'Cloud expenditure is forecast to exceed monthly baseline by approximately 4.7% (SAR 776,000 forecast vs SAR 760,000 budget).',
    impact: 'SAR 16,000 monthly budget overrun if unmitigated.',
    recommendedAction: 'Execute idle GCP VM shutdown and right-size 8 Azure compute instances before month-end.',
    confidence: '96.8%'
  },
  {
    id: 'AI-INS-04',
    domain: 'Monitoring & Observability',
    insight: 'Monitoring coverage improved to 96.4% following recent observability onboarding of OpenShift pods.',
    impact: 'Reduced mean-time-to-detect (MTTD) for microservice anomalies.',
    recommendedAction: 'Onboard remaining 3.6% legacy standalone DB hosts into Splunk ITSI.',
    confidence: '99.1%'
  },
  {
    id: 'AI-INS-05',
    domain: 'Infrastructure Health',
    insight: 'One infrastructure component (Monitoring Host ESX-02) requires attention due to elevated memory utilization (83%).',
    impact: 'Risk of host memory swapping during peak log ingestion spikes.',
    recommendedAction: 'Rebalance 4 monitoring worker VMs to secondary ESXi host ESX-04.',
    confidence: '92.4%'
  },
  {
    id: 'AI-INS-06',
    domain: 'Digital Transformation',
    insight: 'Band 1 automation initiatives have progressed faster than Band 3 AI initiatives (68% vs 31% average completion).',
    impact: 'Strong operational foundation built for AI agent deployment.',
    recommendedAction: 'Promote NCGR Assistant AI triage pilot to live Service Desk workflow in Q4.',
    confidence: '95.7%'
  },
];

const AIAnalyticsView: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">AI Operational Analytics & Insights</h1>
            <p className="page-subtitle">Predictive Incident Analytics, Resource Gap Forecasting & Cost Variance Engine</p>
          </div>
          <span className="simulated-badge" style={{ background: '#671E75', color: '#FFF' }}>
            AI-GENERATED INSIGHT — DEMO DATA
          </span>
        </div>
      </div>

      {/* AI Insights Header Banner */}
      <div className="card" style={{ marginBottom: 24, padding: 20, background: 'linear-gradient(135deg, #671E75 0%, #074A76 100%)', color: '#FFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Bot size={36} style={{ color: 'var(--ncgr-lemon)' }} />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>NCGR ITMS AI Correlation Engine</h2>
            <p style={{ fontSize: '0.8125rem', opacity: 0.9, marginTop: 2 }}>
              Correlating 1,248 monitored assets, 15 master staff rosters, 12 vendors, and SAR 741K cloud spend in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* AI Insights Grid (Section 18) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {aiInsightsList.map((item) => (
          <div key={item.id} className="card" style={{ padding: 20, borderLeft: '4px solid #671E75' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--ncgr-deep-sky)' }}>{item.id}</span>
                <span className="health-badge healthy" style={{ marginLeft: 10, fontSize: '0.625rem' }}>{item.domain}</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-mint-green)' }}>
                Confidence: {item.confidence}
              </span>
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>"{item.insight}"</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12, fontSize: '0.8125rem', background: 'var(--bg-secondary)', padding: 12, borderRadius: 6 }}>
              <div>
                <strong style={{ color: 'var(--text-secondary)' }}>Predicted Impact:</strong>
                <p style={{ marginTop: 2 }}>{item.impact}</p>
              </div>
              <div>
                <strong style={{ color: 'var(--ncgr-deep-blue)' }}>Recommended Action:</strong>
                <p style={{ marginTop: 2 }}>{item.recommendedAction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAnalyticsView;
