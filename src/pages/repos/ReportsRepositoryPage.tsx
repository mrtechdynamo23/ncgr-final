import React, { useState, useMemo } from 'react';
import {
  FileText, Download, Search, Clock,
  Star, Layers, ShieldCheck, Users,
  Building2, Bot, Eye, X
} from 'lucide-react';
import { MASTER_REPORTS, type ReportRecord } from '../../data/master-reports';
import ReportPreviewDrawer from '../../components/repos/ReportPreviewDrawer';

type ReposViewTab =
  | 'all'
  | 'executive_wsr_msr'
  | 'operations_sla'
  | 'governance_audit'
  | 'workforce_saudization'
  | 'vendor_pmo'
  | 'tech_transformation'
  | 'favorites';

export const ReportsRepositoryPage: React.FC = () => {
  const [reports] = useState<ReportRecord[]>(MASTER_REPORTS);
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ReposViewTab>('all');
  const [favorites, setFavorites] = useState<string[]>(['WSR-2026-W33', 'MSR-2026-07', 'SLA-2026-08', 'SAUD-2026-Q3']);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedOwner, setSelectedOwner] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Toggle Favorite
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Open Preview Drawer
  const handleOpenPreview = (report: ReportRecord) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  // Select related report
  const handleSelectRelatedReport = (reportId: string) => {
    const found = reports.find(r => r.id === reportId);
    if (found) {
      setSelectedReport(found);
    }
  };

  // Direct file download trigger
  const handleDirectDownload = (report: ReportRecord, format: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const filename = `${report.id}_${report.name.replace(/[^a-zA-Z0-9]/g, '_')}.${format.toLowerCase()}`;
    const content = `NCGR ITMS UNIFIED PORTAL — OFFICIAL REPORT
======================================================
Report ID: ${report.id}
Report Name: ${report.name}
Category: ${report.category}
Type: ${report.type}
Period: ${report.period}
Owner: ${report.owner} (${report.department})
Generated Date: ${report.generatedDate}
Version: ${report.version}
Status: ${report.status}

EXECUTIVE SUMMARY:
${report.summary}

KEY HIGHLIGHTS:
${report.keyHighlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

KEY METRICS:
${report.kpis.map(k => `- ${k.label}: ${k.value}`).join('\n')}

======================================================
NCGR Managed Operations Portal · Verified Official Record
`;

    const blob = new Blob([content], { type: format === 'CSV' ? 'text/csv' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export filtered reports summary CSV
  const handleExportFilteredSummary = () => {
    const headers = ['Report ID', 'Report Name', 'Category', 'Type', 'Period', 'Generated Date', 'Owner', 'Department', 'Version', 'Status'];
    const rows = filteredReports.map(r => [
      `"${r.id}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.type}"`,
      `"${r.period}"`,
      `"${r.generatedDate}"`,
      `"${r.owner}"`,
      `"${r.department}"`,
      `"${r.version}"`,
      `"${r.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCGR_Reports_Repository_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset Filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedPeriod('ALL');
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setSelectedOwner('ALL');
    setSelectedStatus('ALL');
  };

  // Unique Lists for Dropdown Filters
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(reports.map(r => r.category))).sort();
  }, [reports]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(reports.map(r => r.type))).sort();
  }, [reports]);

  const uniqueOwners = useMemo(() => {
    return Array.from(new Set(reports.map(r => r.owner))).sort();
  }, [reports]);

  // Tab Filtering Logic
  const reportsByTab = useMemo(() => {
    switch (activeTab) {
      case 'executive_wsr_msr':
        return reports.filter(r =>
          r.category === 'Executive & Management' ||
          r.category === 'WSR — Weekly Status Reports' ||
          r.category === 'MSR — Monthly Status Reports' ||
          r.category === 'DSR / Daily Operations'
        );
      case 'operations_sla':
        return reports.filter(r =>
          r.category === 'Service Operations' ||
          r.category === 'SLA & Service Assurance' ||
          r.category === 'Change & Release' ||
          r.category === 'Customer & Service'
        );
      case 'governance_audit':
        return reports.filter(r =>
          r.category === 'Governance, Audit & Compliance' ||
          r.category === 'Risk'
        );
      case 'workforce_saudization':
        return reports.filter(r =>
          r.category === 'Workforce & Saudization' ||
          r.category === 'Learning & Certification' ||
          r.category === 'Knowledge Transfer'
        );
      case 'vendor_pmo':
        return reports.filter(r =>
          r.category === 'Vendor & SIAM' ||
          r.category === 'Programme & Delivery'
        );
      case 'tech_transformation':
        return reports.filter(r =>
          r.category === 'Technology & AI'
        );
      case 'favorites':
        return reports.filter(r => favorites.includes(r.id));
      case 'all':
      default:
        return reports;
    }
  }, [reports, activeTab, favorites]);

  // Comprehensive Multi-Dimensional Filtering
  const filteredReports = useMemo(() => {
    return reportsByTab.filter(r => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = r.name.toLowerCase().includes(query);
        const matchId = r.id.toLowerCase().includes(query);
        const matchCategory = r.category.toLowerCase().includes(query);
        const matchType = r.type.toLowerCase().includes(query);
        const matchOwner = r.owner.toLowerCase().includes(query);
        const matchPeriod = r.period.toLowerCase().includes(query);
        const matchSummary = r.summary.toLowerCase().includes(query);
        if (!matchName && !matchId && !matchCategory && !matchType && !matchOwner && !matchPeriod && !matchSummary) {
          return false;
        }
      }

      // Period Filter
      if (selectedPeriod !== 'ALL' && r.periodCategory !== selectedPeriod) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'ALL' && r.category !== selectedCategory) {
        return false;
      }

      // Type Filter
      if (selectedType !== 'ALL' && r.type !== selectedType) {
        return false;
      }

      // Owner Filter
      if (selectedOwner !== 'ALL' && r.owner !== selectedOwner) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'ALL' && r.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [reportsByTab, searchTerm, selectedPeriod, selectedCategory, selectedType, selectedOwner, selectedStatus]);

  // Aggregated Stats
  const totalReportsCount = reports.length;
  const currentPeriodCount = reports.filter(r => r.periodCategory === 'This Month' || r.periodCategory === 'This Week' || r.periodCategory === 'Today').length;
  const latestReport = reports[0];
  const totalCategoriesCount = uniqueCategories.length;
  const approvedCount = reports.filter(r => r.status === 'Approved' || r.status === 'Published').length;

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
              Repos
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: 'rgba(7, 74, 118, 0.1)',
                color: 'var(--ncgr-deep-blue, #074A76)',
                border: '1px solid rgba(7, 74, 118, 0.2)',
              }}
            >
              CENTRAL REPORTS REPOSITORY
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleExportFilteredSummary}
          style={{
            padding: '9px 18px',
            borderRadius: 8,
            background: 'var(--ncgr-deep-blue, #074A76)',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 6px rgba(7, 74, 118, 0.25)',
          }}
          title="Export metadata summary of current filtered reports"
        >
          <Download size={15} />
          <span>Export Repository Index (CSV)</span>
        </button>
      </div>

      {/* Top KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Reports</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{totalReportsCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Available in repository</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>This Period</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{currentPeriodCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#40904F', fontWeight: 600, marginTop: 2 }}>Generated for current cycle</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #4AA6DC' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Latest Published</div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#074A76', marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {latestReport?.id || 'WSR-2026-W33'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {latestReport?.period || 'Week 33 (August 2026)'}
          </div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#671E75', textTransform: 'uppercase' }}>Report Taxonomies</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{totalCategoriesCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#671E75', fontWeight: 600, marginTop: 2 }}>Distinct reporting categories</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Approved & Signed-off</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{approvedCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>Official audit readiness</div>
        </div>
      </div>

      {/* Featured / Executive Fast-Launch Strip */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Featured Executive & Governance Releases
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            One-click view & download
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {reports.filter(r => r.isFeatured).slice(0, 4).map(feat => (
            <div
              key={feat.id}
              onClick={() => handleOpenPreview(feat)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                borderLeft: '4px solid var(--ncgr-deep-blue, #074A76)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', fontWeight: 800, color: '#074A76', background: 'var(--bg-secondary, #F1F5F9)', padding: '1px 6px', borderRadius: 4 }}>
                  {feat.id}
                </span>
                <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#22A06B', background: '#E3FCEF', padding: '1px 5px', borderRadius: 4 }}>
                  {feat.status}
                </span>
              </div>

              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 4, lineHeight: 1.3 }}>
                {feat.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>
                <span>{feat.period}</span>
                <span style={{ color: 'var(--ncgr-deep-blue, #074A76)', fontWeight: 700 }}>Open →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Filter Cluster */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* View Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            paddingBottom: 12,
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'all' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'all' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'all' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Layers size={14} />
            <span>All Reports ({totalReportsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('executive_wsr_msr')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'executive_wsr_msr' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'executive_wsr_msr' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'executive_wsr_msr' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'executive_wsr_msr' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <FileText size={14} />
            <span>Executive & WSR / MSR / DSR</span>
          </button>

          <button
            onClick={() => setActiveTab('operations_sla')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'operations_sla' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'operations_sla' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'operations_sla' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'operations_sla' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Clock size={14} />
            <span>Service Operations & SLA</span>
          </button>

          <button
            onClick={() => setActiveTab('governance_audit')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'governance_audit' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'governance_audit' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'governance_audit' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'governance_audit' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ShieldCheck size={14} />
            <span>Governance, Audit & Risk</span>
          </button>

          <button
            onClick={() => setActiveTab('workforce_saudization')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'workforce_saudization' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'workforce_saudization' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'workforce_saudization' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'workforce_saudization' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Users size={14} />
            <span>Workforce, Saudization & KT</span>
          </button>

          <button
            onClick={() => setActiveTab('vendor_pmo')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'vendor_pmo' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'vendor_pmo' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'vendor_pmo' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'vendor_pmo' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Building2 size={14} />
            <span>Vendor & Programme Delivery</span>
          </button>

          <button
            onClick={() => setActiveTab('tech_transformation')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'tech_transformation' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'tech_transformation' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'tech_transformation' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'tech_transformation' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Bot size={14} />
            <span>Transformation & Technology</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeTab === 'favorites' ? '1px solid #E97F0A' : '1px solid var(--border, #E4E7EC)',
              background: activeTab === 'favorites' ? '#FFF7E6' : 'var(--bg-secondary, #F8FAFC)',
              color: activeTab === 'favorites' ? '#E97F0A' : 'var(--text-secondary, #475467)',
              fontSize: '0.75rem',
              fontWeight: activeTab === 'favorites' ? 700 : 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Star size={14} fill={activeTab === 'favorites' ? '#E97F0A' : 'none'} />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          {/* Global Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--bg-secondary, #F8FAFC)',
              flex: 1,
              minWidth: 220,
            }}
          >
            <Search size={15} color="var(--text-tertiary, #98A2B3)" />
            <input
              type="text"
              placeholder="Search reports by name, type, period, owner or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.8125rem',
                width: '100%',
                color: 'var(--text, #101828)',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary, #98A2B3)', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Reporting Period Filter */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">🗓️ Reporting Period (All)</option>
            <option value="Today">Today (17 Aug)</option>
            <option value="Yesterday">Yesterday (16 Aug)</option>
            <option value="This Week">This Week (Week 33)</option>
            <option value="Last Week">Last Week (Week 32)</option>
            <option value="This Month">This Month (August 2026)</option>
            <option value="Last Month">Last Month (July 2026)</option>
            <option value="Quarter">Quarter (Q3 2026)</option>
            <option value="Year">Full Year 2026</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
              maxWidth: 180,
            }}
          >
            <option value="ALL">📁 Report Category (All)</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Report Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
              maxWidth: 160,
            }}
          >
            <option value="ALL">📄 Report Type (All)</option>
            {uniqueTypes.map(typ => (
              <option key={typ} value={typ}>{typ}</option>
            ))}
          </select>

          {/* Owner Filter */}
          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">👤 Report Owner (All)</option>
            {uniqueOwners.map(own => (
              <option key={own} value={own}>{own}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">Status (All)</option>
            <option value="Approved">Approved</option>
            <option value="Published">Published</option>
            <option value="In Review">In Review</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {/* Clear Filters */}
          {(searchTerm || selectedPeriod !== 'ALL' || selectedCategory !== 'ALL' || selectedType !== 'ALL' || selectedOwner !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={handleClearFilters}
              style={{
                padding: '7px 12px',
                borderRadius: 6,
                border: '1px solid var(--border, #E4E7EC)',
                background: 'var(--bg-secondary, #F1F5F9)',
                color: 'var(--text-secondary, #475467)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Report Repository Data Table */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary, #F8FAFC)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            Report Repository Records ({filteredReports.length} matches)
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Showing {filteredReports.length} of {totalReportsCount} total reports
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <FileText size={36} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              No reports available for the selected period.
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Try clearing active search terms, adjusting the reporting period, or selecting another category.
            </p>
            <button
              onClick={handleClearFilters}
              style={{
                padding: '8px 18px',
                borderRadius: 6,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary, #F8FAFC)', borderBottom: '1px solid var(--border, #E4E7EC)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', width: 40, textAlign: 'center' }}>★</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Report Name & Identifier</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 170 }}>Category & Type</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 150 }}>Reporting Period</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 140 }}>Owner / Dept</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 100 }}>Generated</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 100 }}>Status</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 140, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => {
                  const isFav = favorites.includes(report.id);
                  const isApproved = report.status === 'Approved' || report.status === 'Published';

                  return (
                    <tr
                      key={report.id}
                      onClick={() => handleOpenPreview(report)}
                      style={{
                        borderBottom: '1px solid var(--border, #E4E7EC)',
                        cursor: 'pointer',
                        transition: 'background 0.1s ease',
                      }}
                      className="table-row-hover"
                    >
                      {/* Favorite Star */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <button
                          onClick={(e) => toggleFavorite(report.id, e)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: 0,
                            color: isFav ? '#E97F0A' : 'var(--text-tertiary, #98A2B3)',
                          }}
                          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Star size={16} fill={isFav ? '#E97F0A' : 'none'} />
                        </button>
                      </td>

                      {/* Report Name & ID */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              fontSize: '0.6875rem',
                              color: 'var(--ncgr-deep-blue, #074A76)',
                              background: 'var(--bg-secondary, #F1F5F9)',
                              padding: '1px 6px',
                              borderRadius: 4,
                              border: '1px solid var(--border, #E4E7EC)',
                            }}
                          >
                            {report.id}
                          </span>
                          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                            • {report.frequency}
                          </span>
                          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                            • {report.version}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text, #101828)', fontSize: '0.875rem' }}>
                          {report.name}
                        </div>
                      </td>

                      {/* Category & Type */}
                      <td style={{ padding: '12px 14px' }}>
                        <div
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: '#074A76',
                            background: '#E6F0FA',
                            padding: '2px 6px',
                            borderRadius: 4,
                            display: 'inline-block',
                            marginBottom: 2,
                          }}
                        >
                          {report.category}
                        </div>
                        <div style={{ fontSize: '0.71875rem', color: 'var(--text-secondary, #475467)' }}>
                          {report.type}
                        </div>
                      </td>

                      {/* Period */}
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text, #101828)' }}>
                        {report.period}
                      </td>

                      {/* Owner & Department */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{report.owner}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>{report.department}</div>
                      </td>

                      {/* Generated Date */}
                      <td style={{ padding: '12px 14px', color: 'var(--text-secondary, #475467)' }}>
                        {report.generatedDate}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 6,
                            background: isApproved ? '#E3FCEF' : report.status === 'In Review' ? '#FFF7E6' : '#F1F5F9',
                            color: isApproved ? '#22A06B' : report.status === 'In Review' ? '#E97F0A' : '#475467',
                          }}
                        >
                          {report.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPreview(report);
                            }}
                            style={{
                              padding: '4px 8px',
                              borderRadius: 4,
                              background: 'var(--bg-secondary, #F1F5F9)',
                              border: '1px solid var(--border, #E4E7EC)',
                              color: 'var(--ncgr-deep-blue, #074A76)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                            title="Open Preview"
                          >
                            <Eye size={12} />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={(e) => handleDirectDownload(report, 'PDF', e)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: 4,
                              background: 'var(--ncgr-deep-blue, #074A76)',
                              border: 'none',
                              color: '#FFFFFF',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                            title="Download PDF"
                          >
                            <Download size={12} />
                            <span>PDF</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Report Preview Slide-Over Drawer */}
      <ReportPreviewDrawer
        report={selectedReport}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelectRelatedReport={handleSelectRelatedReport}
      />
    </div>
  );
};

export default ReportsRepositoryPage;
