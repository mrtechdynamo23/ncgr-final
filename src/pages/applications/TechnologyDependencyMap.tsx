import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Server, Database, Cloud, Network, Activity, Layers } from 'lucide-react';

interface DependencyNode {
  id: string;
  name: string;
  type: 'Service' | 'Application' | 'Server' | 'Database' | 'Network' | 'Cloud';
  status: 'healthy' | 'at-risk' | 'degraded';
  details: string;
  children?: string[];
}

const dependencyNodes: DependencyNode[] = [
  { id: 'node-1', name: 'Government Financial Reporting', type: 'Service', status: 'degraded', details: 'Core Financial Service', children: ['node-2', 'node-3'] },
  { id: 'node-2', name: 'Oracle Hyperion HFM', type: 'Application', status: 'degraded', details: 'Financial Consolidation App', children: ['node-4'] },
  { id: 'node-3', name: 'SAP PO Integration Hub', type: 'Application', status: 'at-risk', details: 'Middleware Engine', children: ['node-5'] },
  { id: 'node-4', name: 'Oracle RAC DB Cluster', type: 'Database', status: 'degraded', details: 'Production Database RAC 19c', children: ['node-6', 'node-7'] },
  { id: 'node-5', name: 'SAP HANA Cluster', type: 'Database', status: 'healthy', details: 'In-Memory Procurement DB', children: ['node-7'] },
  { id: 'node-6', name: 'VMware vSphere Host Farm', type: 'Server', status: 'healthy', details: '32 Physical ESXi Hosts', children: ['node-8'] },
  { id: 'node-7', name: 'GCP Cloud Compute Engine', type: 'Cloud', status: 'healthy', details: 'Google Cloud Platform Region ap-south-1', children: ['node-8'] },
  { id: 'node-8', name: 'Core Enterprise Network & SD-WAN', type: 'Network', status: 'at-risk', details: 'SolarWinds Orion Monitored Network', children: [] },
];

const TechnologyDependencyMap: React.FC = () => {
  const { t } = useTranslation(['common', 'technology']);
  const [selectedNode, setSelectedNode] = useState<DependencyNode>(dependencyNodes[0]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Service': return <Layers size={16} style={{ color: 'var(--ncgr-deep-blue)' }} />;
      case 'Application': return <Activity size={16} style={{ color: 'var(--ncgr-deep-sky)' }} />;
      case 'Database': return <Database size={16} style={{ color: 'var(--ncgr-purple)' }} />;
      case 'Server': return <Server size={16} style={{ color: 'var(--ncgr-mint-green)' }} />;
      case 'Cloud': return <Cloud size={16} style={{ color: 'var(--ncgr-tiffany-blue)' }} />;
      default: return <Network size={16} style={{ color: 'var(--ncgr-orange)' }} />;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Technology Dependency Map</h1>
            <p className="page-subtitle">Interactive visual topology showing how services, applications, databases, cloud, and network components connect</p>
          </div>
          <span className="simulated-badge">{t('app.simulatedHealth')}</span>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        {/* Interactive Dependency Tree */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Dependency Graph</h2>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Click node to inspect</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dependencyNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  padding: '12px 16px',
                  background: selectedNode.id === node.id ? 'var(--sidebar-active)' : 'var(--bg-secondary)',
                  border: `1px solid ${selectedNode.id === node.id ? 'var(--ncgr-deep-sky)' : 'var(--border)'}`,
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {getNodeIcon(node.type)}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text)' }}>{node.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{node.type} · {node.details}</div>
                  </div>
                </div>
                <span className={`health-badge ${node.status}`}>
                  <span className="badge-dot" /> {node.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Node Specification & Dependencies</h2>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Node ID</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{selectedNode.id}</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Name</div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedNode.name}</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Type & Status</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{selectedNode.type}</span>
              <span className={`health-badge ${selectedNode.status}`}>
                <span className="badge-dot" /> {selectedNode.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Description</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{selectedNode.details}</div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>Downstream Dependent Nodes:</div>
            {selectedNode.children && selectedNode.children.length > 0 ? (
              selectedNode.children.map((childId) => {
                const child = dependencyNodes.find((n) => n.id === childId);
                return child ? (
                  <div key={child.id} style={{ padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', marginBottom: 6, fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{child.name}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{child.type}</span>
                  </div>
                ) : null;
              })
            ) : (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Terminal node (no downstream dependencies)</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyDependencyMap;
