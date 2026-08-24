import React from 'react';
import { licenses, getLicenseStats, type LicenseRecord } from '../../data/licenses';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';

const LicenseHealth: React.FC = () => {
  const stats = getLicenseStats();

  const columns: ColumnDef<LicenseRecord>[] = [
    {
      header: 'License ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Software License Name',
      accessorKey: 'licenseName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.licenseName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Provider: {row.oemProvider} • Vendor: {row.vendorName}
          </div>
        </div>
      ),
    },
    {
      header: 'Business Service & Domain',
      accessorKey: 'businessService',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.businessService}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Domain: {row.businessDomain}</div>
        </div>
      ),
    },
    {
      header: 'Entitlement & Usage',
      accessorKey: 'utilizationPct',
      cell: (row) => (
        <div style={{ minWidth: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 2 }}>
            <span>{row.currentUtilization} / {row.licenseCount}</span>
            <span style={{ fontWeight: 700 }}>{row.utilizationPct}%</span>
          </div>
          <div style={{ height: 6, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 3, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, row.utilizationPct)}%`,
                background: row.utilizationPct > 95 ? '#DE350B' : row.utilizationPct > 80 ? '#40904F' : '#E97F0A',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Annual Cost (SAR)',
      accessorKey: 'cost',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.cost.toLocaleString()} SAR
        </span>
      ),
    },
    {
      header: 'Expiry Date',
      accessorKey: 'expiryDate',
      cell: (row) => {
        const isNear = row.status === 'Near Expiry' || row.status === 'Expired';
        return (
          <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: isNear ? '#DE350B' : 'var(--text-secondary, #475467)', fontWeight: isNear ? 700 : 500 }}>
            {row.expiryDate}
          </span>
        );
      },
    },
    {
      header: 'Health Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Healthy' ? '#E3FCEF' : row.status === 'Near Expiry' ? '#FFF7E6' : row.status === 'Expired' ? '#FFEBE6' : row.status === 'Overutilized' ? '#F3E8FF' : '#E6F4FC';
        const color = row.status === 'Healthy' ? '#22A06B' : row.status === 'Near Expiry' ? '#E97F0A' : row.status === 'Expired' ? '#DE350B' : row.status === 'Overutilized' ? '#671E75' : '#074A76';
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

  const uniqueOEMs = Array.from(new Set(licenses.map(l => l.oemProvider))).map(o => ({ label: o, value: o }));
  const uniqueDomains = Array.from(new Set(licenses.map(l => l.businessDomain))).map(d => ({ label: d, value: d }));

  const filters: FilterDef<LicenseRecord>[] = [
    { key: 'oemProvider', label: 'OEM Providers', options: uniqueOEMs },
    { key: 'businessDomain', label: 'Business Domains', options: uniqueDomains },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Healthy', value: 'Healthy' },
        { label: 'Near Expiry', value: 'Near Expiry' },
        { label: 'Overutilized', value: 'Overutilized' },
        { label: 'Underutilized', value: 'Underutilized' },
        { label: 'Expired', value: 'Expired' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          License & Entitlement Health
        </h1>
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Software Licenses</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{stats.total}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>42 products tracked</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Healthy Licenses</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{stats.healthy}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Optimal utilization</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Expiring in 90 Days</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{stats.expiringIn90Days}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Renewal in queue</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Expired / Overutilized</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{stats.expired + stats.overutilized}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Compliance attention</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>Total Annual Cost</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
            {(stats.totalCost / 1000000).toFixed(1)}M SAR
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Annual contract value</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={licenses}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search licenses by product, OEM, vendor, service..."
        searchKeys={['licenseName', 'oemProvider', 'vendorName', 'businessService', 'businessDomain', 'id']}
        pageSize={15}
        title="Enterprise Software License Registry"
        subtitle="Live license allocations, utilization meters, and contract renewal timeline"
        exportFilename="ncgr_software_licenses"
      />
    </div>
  );
};

export default LicenseHealth;
