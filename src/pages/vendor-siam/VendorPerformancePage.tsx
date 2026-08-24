import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { VendorRecord } from '../../data/vendorData';
import type { MasterEmployee } from '../../data/master-employees';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { VENDOR_SIAM_SIBLINGS } from './VendorSIAMLandingPage';

const VendorPerformancePage: React.FC = () => {
  const { vendors, employees } = useDataStore();
  const [selectedOwner, setSelectedOwner] = useState<MasterEmployee | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  const totalContractSAR = vendors.reduce((s, v) => s + v.annualContractValue, 0);
  const activeVendors = vendors.filter(v => v.serviceStatus === 'Active').length;
  const atRiskVendors = vendors.filter(v => v.serviceStatus === 'At Risk' || v.serviceStatus === 'Under Review').length;
  const avgPerfScore = Math.round(vendors.reduce((s, v) => s + v.performanceScore, 0) / vendors.length);

  const handleOpenOwner = (ownerName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const emp = employees.find(e => e.name === ownerName);
    if (emp) {
      setSelectedOwner(emp);
      setIsOwnerModalOpen(true);
    }
  };

  const columns: ColumnDef<VendorRecord>[] = [
    {
      header: 'Vendor ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Vendor Name & Applications',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.applicationsProvided}</div>
        </div>
      ),
    },
    {
      header: 'Business Services Supported',
      accessorKey: 'businessServices',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.businessServices}</span>,
    },
    {
      header: 'Annual Value (SAR)',
      accessorKey: 'annualContractValue',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.annualContractValue.toLocaleString()} SAR
        </span>
      ),
    },
    {
      header: 'Time to Expiry',
      accessorKey: 'timeToExpire',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: row.timeToExpire.includes('month') && parseInt(row.timeToExpire) <= 2 ? '#DE350B' : 'var(--text-secondary, #475467)' }}>
          {row.timeToExpire}
        </span>
      ),
    },
    {
      header: 'Performance Score',
      accessorKey: 'performanceScore',
      cell: (row) => (
        <div style={{ minWidth: 90 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 2 }}>
            <span style={{ fontWeight: 800, color: row.performanceScore >= 90 ? '#22A06B' : row.performanceScore >= 80 ? '#074A76' : '#E97F0A' }}>
              {row.performanceScore}%
            </span>
          </div>
          <div style={{ height: 5, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${row.performanceScore}%`,
                background: row.performanceScore >= 90 ? '#22A06B' : row.performanceScore >= 80 ? '#074A76' : '#E97F0A',
              }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'NCGR Owner Lead',
      accessorKey: 'owner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenOwner(row.owner, e)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
            textDecoration: 'underline',
          }}
          title="Click to view owner profile"
        >
          {row.owner}
        </button>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'serviceStatus',
      cell: (row) => {
        const bg = row.serviceStatus === 'Active' ? '#E3FCEF' : row.serviceStatus === 'Under Review' ? '#FFF7E6' : '#FFEBE6';
        const color = row.serviceStatus === 'Active' ? '#22A06B' : row.serviceStatus === 'Under Review' ? '#E97F0A' : '#DE350B';
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
            {row.serviceStatus}
          </span>
        );
      },
    },
  ];

  const filters: FilterDef<VendorRecord>[] = [
    {
      key: 'serviceStatus',
      label: 'Service Status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Under Review', value: 'Under Review' },
        { label: 'At Risk', value: 'At Risk' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Vendor & SIAM"
        modulePath="/vendor-siam"
        pageTitle="Vendor Performance"
        siblingPages={VENDOR_SIAM_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Managed Vendors</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{vendors.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>{activeVendors} Active SLAs</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Avg SIAM Score</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{avgPerfScore}%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Meets target threshold</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>At Risk / Under Review</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{atRiskVendors}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Commercial renewal focus</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>Total Contract Value</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
            {(totalContractSAR / 1000000).toFixed(1)}M SAR
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Annualized commitments</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={vendors}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search vendors by name, applications, services, owner..."
        searchKeys={['name', 'applicationsProvided', 'businessServices', 'owner', 'id']}
        pageSize={15}
        title="Enterprise Strategic Vendors"
        subtitle="Click any owner name to open their complete profile"
        exportFilename="ncgr_vendor_performance"
      />

      {/* Owner Profile Modal */}
      <EmployeeDetailModal
        employee={selectedOwner}
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />
    </div>
  );
};

export default VendorPerformancePage;
