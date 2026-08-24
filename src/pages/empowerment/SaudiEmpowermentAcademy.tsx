import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import {
  academyTrainingPrograms, detailedKTList, employeeDevelopmentRoster,
  type AcademyTrainingRecord, type DetailedKTRecord,
  type EmployeeDevelopmentRecord
} from '../../data/empowerment';
import {
  trainingCatalogue, employeeLearningProgress, getCurriculumStats,
  type TrainingCatalogueRecord, type EmployeeLearningProgress
} from '../../data/curriculum';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import {
  GraduationCap, Award, BookOpen, UserCheck,
  Layers
} from 'lucide-react';

const SaudiEmpowermentAcademy: React.FC = () => {
  const { employees } = useDataStore();
  const [activeTab, setActiveTab] = useState<'training' | 'kt' | 'development' | 'curriculum'>('curriculum');
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);

  const currStats = getCurriculumStats();

  const handleOpenEmployee = (empNameOrId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const emp = employees.find(
      x => x.employeeId === empNameOrId || x.name === empNameOrId || empNameOrId.includes(x.name)
    );
    if (emp) {
      setSelectedEmployee(emp);
      setIsEmpModalOpen(true);
    }
  };

  // ─── 1. TRAINING TABLE COLUMNS ────────────────────────────
  const trainingColumns: ColumnDef<AcademyTrainingRecord>[] = [
    {
      header: 'Training ID',
      accessorKey: 'id',
      width: '120px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Training / Course Name',
      accessorKey: 'courseName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.courseName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Target: {row.targetAudience}
          </div>
        </div>
      ),
    },
    {
      header: 'Knowledge Area',
      accessorKey: 'knowledgeArea',
      cell: (row) => (
        <span style={{ padding: '2px 8px', borderRadius: 4, background: '#E6F4FC', color: '#074A76', fontSize: '0.75rem', fontWeight: 600 }}>
          {row.knowledgeArea}
        </span>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
      width: '110px',
    },
    {
      header: 'Attendance & Progress',
      accessorKey: 'completionPct',
      cell: (row) => (
        <div style={{ minWidth: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 2 }}>
            <span>{row.completed} / {row.participants} Staff</span>
            <span style={{ fontWeight: 700, color: row.completionPct === 100 ? '#22A06B' : '#074A76' }}>
              {row.completionPct}%
            </span>
          </div>
          <div style={{ height: 5, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.completionPct}%`, background: row.completionPct === 100 ? '#40904F' : '#4AA6DC', borderRadius: 3 }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Certification Credential',
      accessorKey: 'certification',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          <Award size={13} color="#E97F0A" />
          <span>{row.certification}</span>
        </div>
      ),
    },
    {
      header: 'Academy Trainer / Owner',
      accessorKey: 'trainer',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{row.trainer}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '100px',
      cell: (row) => {
        const isComp = row.status === 'Completed';
        const isProg = row.status === 'In Progress';
        return (
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 12,
              fontSize: '0.75rem',
              fontWeight: 700,
              background: isComp ? '#E3FCEF' : isProg ? '#E6F4FC' : '#FFF7E6',
              color: isComp ? '#22A06B' : isProg ? '#074A76' : '#E97F0A',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const trainingFilters: FilterDef<AcademyTrainingRecord>[] = [
    { key: 'tower', label: 'Tower', options: ['Service Desk', 'Cloud', 'Infrastructure', 'Applications', 'Network', 'Security', 'Database', 'Digital Workplace'].map(t => ({ label: t, value: t })) },
    { key: 'status', label: 'Status', options: ['Completed', 'In Progress', 'Scheduled', 'Delayed'].map(s => ({ label: s, value: s })) },
  ];

  // ─── 2. KT COLUMNS ─────────────────────────────────────────
  const ktColumns: ColumnDef<DetailedKTRecord>[] = [
    {
      header: 'KT ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'KT ID & Batch',
      accessorKey: 'id',
      width: '120px',
      cell: (row) => (
        <div>
          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.id}</span>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.ktBatch}</div>
        </div>
      ),
    },
    {
      header: 'KT Provider (Previous Role Holder)',
      accessorKey: 'ktProvider',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{row.ktProvider}</span>
            {row.providerType === 'Delegated / Override' ? (
              <span style={{ fontSize: '0.625rem', color: '#E97F0A', background: '#FFF7E6', border: '1px solid #FFE7BA', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                Override
              </span>
            ) : (
              <span style={{ fontSize: '0.625rem', color: '#22A06B', background: '#E3FCEF', border: '1px solid #B7EB8F', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                Prev Holder
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            {row.overrideReason ? `Reason: ${row.overrideReason}` : `Role Holder: ${row.previousRoleHolder}`}
          </div>
        </div>
      ),
    },
    {
      header: 'KT Recipient (Active Resource)',
      accessorKey: 'ktRecipient',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.ktRecipient}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>ID: {row.employeeId} • {row.tower}</div>
        </div>
      ),
    },
    {
      header: 'Knowledge Area Scope',
      accessorKey: 'knowledgeArea',
      cell: (row) => <span style={{ fontWeight: 600, color: 'var(--text, #101828)' }}>{row.knowledgeArea}</span>,
    },
    {
      header: 'Sessions Completed',
      accessorKey: 'completionPct',
      cell: (row) => (
        <div style={{ minWidth: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 2 }}>
            <span>{row.sessionsCompleted} / {row.sessionsPlanned} sessions</span>
            <span style={{ fontWeight: 700, color: row.completionPct === 100 ? '#22A06B' : '#074A76' }}>
              {row.completionPct}%
            </span>
          </div>
          <div style={{ height: 5, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.completionPct}%`, background: row.completionPct === 100 ? '#40904F' : '#4AA6DC', borderRadius: 3 }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Target Date',
      accessorKey: 'targetCompletionDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.targetCompletionDate}</span>,
    },
    {
      header: 'Sign-off Status',
      accessorKey: 'signoffStatus',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 12,
            fontSize: '0.6875rem',
            fontWeight: 700,
            background: row.signoffStatus === 'Approved' ? '#E3FCEF' : row.signoffStatus === 'Pending Lead Sign-off' ? '#FFF7E6' : '#E6F4FC',
            color: row.signoffStatus === 'Approved' ? '#22A06B' : row.signoffStatus === 'Pending Lead Sign-off' ? '#E97F0A' : '#074A76',
          }}
        >
          {row.signoffStatus}
        </span>
      ),
    },
  ];

  // ─── 3. EMPLOYEE DEV COLUMNS ──────────────────────────────
  const devColumns: ColumnDef<EmployeeDevelopmentRecord>[] = [
    {
      header: 'Employee Name & ID',
      accessorKey: 'employeeName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.employeeName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>ID: {row.employeeId}</div>
        </div>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
    },
    {
      header: 'Current Role',
      accessorKey: 'currentRole',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.currentRole}</span>,
    },
    {
      header: 'Development Track',
      accessorKey: 'developmentTrack',
      cell: (row) => (
        <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(7, 74, 118, 0.08)', color: '#074A76', fontWeight: 600, fontSize: '0.75rem' }}>
          {row.developmentTrack}
        </span>
      ),
    },
    {
      header: 'Training Hours',
      accessorKey: 'trainingHours',
      cell: (row) => <span style={{ fontWeight: 700 }}>{row.trainingHours} hrs</span>,
    },
    {
      header: 'Certifications Completed',
      accessorKey: 'certificationsCompleted',
      cell: (row) => (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.certificationsCompleted.length > 0 ? (
            <span style={{ fontWeight: 600, color: '#40904F' }}>{row.certificationsCompleted.join(', ')}</span>
          ) : (
            <span style={{ color: 'var(--text-tertiary, #98A2B3)' }}>In progress</span>
          )}
        </div>
      ),
    },
    {
      header: 'Development Status',
      accessorKey: 'developmentStatus',
      cell: (row) => {
        const isTrack = row.developmentStatus === 'On Track' || row.developmentStatus === 'Completed';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 12,
              fontSize: '0.6875rem',
              fontWeight: 700,
              background: isTrack ? '#E3FCEF' : '#FFF7E6',
              color: isTrack ? '#22A06B' : '#E97F0A',
            }}
          >
            {row.developmentStatus}
          </span>
        );
      },
    },
  ];

  // ─── 4. TRAINING CATALOGUE COLUMNS (NEW) ──────────────────
  const catalogueColumns: ColumnDef<TrainingCatalogueRecord>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      width: '90px',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.id}</span>,
    },
    {
      header: 'Training Course Name',
      accessorKey: 'trainingName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.trainingName}</div>
          <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary, #98A2B3)' }}>Provider: {row.provider}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (row) => (
        <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(7, 74, 118, 0.08)', color: '#074A76', fontSize: '0.75rem', fontWeight: 600 }}>
          {row.category}
        </span>
      ),
    },
    {
      header: 'Delivery Mode',
      accessorKey: 'deliveryMode',
      width: '100px',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
          {row.deliveryMode}
        </span>
      ),
    },
    {
      header: 'Location',
      accessorKey: 'location',
      width: '110px',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: row.location === 'Within KSA' ? '#40904F' : '#671E75' }}>
          {row.location}
        </span>
      ),
    },
    {
      header: 'Duration',
      accessorKey: 'duration',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>
          {row.duration} {row.durationUnit}
        </span>
      ),
    },
    {
      header: 'Certification & Type',
      accessorKey: 'certification',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontSize: '0.8125rem' }}>{row.certification}</div>
          <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600 }}>{row.certificationType}</div>
        </div>
      ),
    },
    {
      header: 'Proficiency',
      accessorKey: 'proficiencyStage',
      width: '100px',
      cell: (row) => {
        const isExp = row.proficiencyStage === 'Expert';
        const isMid = row.proficiencyStage === 'Mid-Level';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 10,
              fontSize: '0.6875rem',
              fontWeight: 700,
              background: isExp ? 'rgba(64, 144, 79, 0.12)' : isMid ? 'rgba(74, 166, 220, 0.12)' : 'rgba(103, 30, 117, 0.12)',
              color: isExp ? '#22A06B' : isMid ? '#074A76' : '#671E75',
            }}
          >
            {row.proficiencyStage}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '100px',
      cell: (row) => {
        const isAvail = row.status === 'Available';
        const isProg = row.status === 'In Progress';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 12,
              fontSize: '0.6875rem',
              fontWeight: 700,
              background: isAvail ? '#E3FCEF' : isProg ? '#E6F4FC' : '#FFF7E6',
              color: isAvail ? '#22A06B' : isProg ? '#074A76' : '#E97F0A',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const catalogueFilters: FilterDef<TrainingCatalogueRecord>[] = [
    { key: 'category', label: 'Category', options: ['Normal Training', 'Offline Training', 'Webinar', 'Workshop', 'Classroom Training', 'Site Visit Training'].map(c => ({ label: c, value: c })) },
    { key: 'deliveryMode', label: 'Delivery', options: ['Virtual', 'In Person'].map(d => ({ label: d, value: d })) },
    { key: 'location', label: 'Location', options: ['Within KSA', 'Outside KSA'].map(l => ({ label: l, value: l })) },
    { key: 'certificationType', label: 'Cert Type', options: ['Core Technical', 'Soft Skill', 'Emerging Tech'].map(ct => ({ label: ct, value: ct })) },
    { key: 'proficiencyStage', label: 'Proficiency', options: ['Beginner', 'Mid-Level', 'Expert'].map(p => ({ label: p, value: p })) },
  ];

  // ─── 5. EMPLOYEE PROGRESS COLUMNS (NEW) ───────────────────
  const progressColumns: ColumnDef<EmployeeLearningProgress>[] = [
    {
      header: 'Employee ID',
      accessorKey: 'employeeId',
      width: '100px',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.employeeId}</span>,
    },
    {
      header: 'Employee Name & Role',
      accessorKey: 'employeeName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.employeeName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.role} • Tower: {row.tower}</div>
        </div>
      ),
    },
    {
      header: 'Level Progression',
      accessorKey: 'currentLevel',
      width: '130px',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-tertiary, #98A2B3)' }}>{row.originalLevel}</span>
          <span>→</span>
          <span style={{ fontWeight: 800, color: '#40904F' }}>{row.currentLevel}</span>
        </div>
      ),
    },
    {
      header: 'Onboarding Date',
      accessorKey: 'onboardingDate',
      width: '120px',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.onboardingDate}</span>,
    },
    {
      header: 'Training Hours',
      accessorKey: 'trainingHoursCompleted',
      width: '110px',
      cell: (row) => <span style={{ fontWeight: 800, color: '#074A76' }}>{row.trainingHoursCompleted} hrs</span>,
    },
    {
      header: 'Certs Passed',
      accessorKey: 'certificationsCompleted',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 800, color: '#22A06B', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Award size={13} color="#22A06B" />
          {row.certificationsCompleted}
        </span>
      ),
    },
    {
      header: 'Current Stage',
      accessorKey: 'currentProficiency',
      width: '110px',
      cell: (row) => {
        const isExp = row.currentProficiency === 'Expert';
        const isMid = row.currentProficiency === 'Mid-Level';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 10,
              fontSize: '0.6875rem',
              fontWeight: 700,
              background: isExp ? 'rgba(64, 144, 79, 0.12)' : isMid ? 'rgba(74, 166, 220, 0.12)' : 'rgba(103, 30, 117, 0.12)',
              color: isExp ? '#22A06B' : isMid ? '#074A76' : '#671E75',
            }}
          >
            {row.currentProficiency}
          </span>
        );
      },
    },
    {
      header: 'Demographics',
      accessorKey: 'expatLocal',
      width: '120px',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.expatLocal === 'Local' ? 'Saudi' : 'Expat'} • {row.gender}
        </span>
      ),
    },
  ];

  const progressFilters: FilterDef<EmployeeLearningProgress>[] = [
    { key: 'currentProficiency', label: 'Proficiency', options: ['Beginner', 'Mid-Level', 'Expert'].map(p => ({ label: p, value: p })) },
    { key: 'currentLevel', label: 'Level', options: ['L1', 'L2', 'L3', 'L4', 'SME/Manager'].map(l => ({ label: l, value: l })) },
    { key: 'expatLocal', label: 'Nationality', options: [{ label: 'Saudi National', value: 'Local' }, { label: 'Expatriate', value: 'Expat' }] },
    { key: 'gender', label: 'Gender', options: ['Male', 'Female'].map(g => ({ label: g, value: g })) },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
            Learning & Certification Curriculum
          </h1>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
              background: 'rgba(64, 144, 79, 0.1)',
              color: '#40904F',
              border: '1px solid rgba(64, 144, 79, 0.25)',
            }}
          >
            TALENT EMPOWERMENT & CAPABILITY
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Curriculum Courses</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{currStats.totalCourses}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Across 6 delivery modes</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>Active Training</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{currStats.activeTraining}</div>
          <div style={{ fontSize: '0.6875rem', color: '#40904F', fontWeight: 600, marginTop: 2 }}>In progress</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Certifications</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{currStats.certificationsAvailable}</div>
          <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600, marginTop: 2 }}>Industry credentials</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #1FBBB0' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#1FBBB0', textTransform: 'uppercase' }}>Talent in Track</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1FBBB0', marginTop: 2 }}>{currStats.employeesInDevelopment}</div>
          <div style={{ fontSize: '0.6875rem', color: '#1FBBB0', fontWeight: 600, marginTop: 2 }}>Enrolled engineers</div>
        </div>

        {/* Proficiency Progression Pipeline */}
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#671E75', textTransform: 'uppercase' }}>Proficiency Stages</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#671E75' }}>{currStats.beginnerCount} Beg</span>
            <span>→</span>
            <span style={{ color: '#074A76' }}>{currStats.midLevelCount} Mid</span>
            <span>→</span>
            <span style={{ color: '#22A06B' }}>{currStats.expertCount} Exp</span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Capability maturity</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, borderBottom: '1px solid var(--border, #E4E7EC)', marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('curriculum')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'curriculum' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'curriculum' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'curriculum' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Layers size={16} />
          <span>Curriculum & Capabilities ({trainingCatalogue.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'training' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'training' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'training' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <GraduationCap size={16} />
          <span>Training Programs ({academyTrainingPrograms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('kt')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'kt' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'kt' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'kt' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <BookOpen size={16} />
          <span>Knowledge Transfer (KT) ({detailedKTList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('development')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'development' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'development' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'development' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <UserCheck size={16} />
          <span>Capability Tracks ({employeeDevelopmentRoster.length})</span>
        </button>
      </div>

      {/* ─── TAB CONTENT ────────────────────────────────────── */}
      {activeTab === 'curriculum' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* 1. Training Catalogue Table */}
          <DataTable
            data={trainingCatalogue}
            columns={catalogueColumns}
            filters={catalogueFilters}
            searchPlaceholder="Search courses, certifications, provider, category..."
            searchKeys={['trainingName', 'category', 'certification', 'provider', 'deliveryMode', 'proficiencyStage']}
            pageSize={10}
            title="Enterprise Training & Certification Catalogue"
            subtitle="Catalogued courses by delivery mode (Normal, Offline, Webinar, Workshop, Classroom, Site Visit) and proficiency stage"
            exportFilename="ncgr_training_catalogue"
          />

          {/* 2. Employee Learning Progress Table */}
          <DataTable
            data={employeeLearningProgress}
            columns={progressColumns}
            filters={progressFilters}
            searchPlaceholder="Search employee progress, role, level, stage..."
            searchKeys={['employeeName', 'employeeId', 'role', 'tower', 'currentLevel', 'currentProficiency']}
            pageSize={10}
            onRowClick={(row) => handleOpenEmployee(row.employeeId)}
            title="Workforce Learning Progress & Level Progression"
            subtitle="Individual employee certification completions, training hours, and career tier progression"
            exportFilename="ncgr_employee_learning_progress"
          />
        </div>
      )}

      {activeTab === 'training' && (
        <DataTable
          data={academyTrainingPrograms}
          columns={trainingColumns}
          filters={trainingFilters}
          searchPlaceholder="Search training course, knowledge area, tower, trainer..."
          searchKeys={['courseName', 'knowledgeArea', 'tower', 'trainer', 'certification']}
          pageSize={10}
          title="Academy Training Curriculum Registry"
          subtitle="Formal enterprise training modules, certifications, and tower progress"
          exportFilename="ncgr_academy_training"
        />
      )}

      {activeTab === 'kt' && (
        <DataTable
          data={detailedKTList}
          columns={ktColumns}
          searchPlaceholder="Search KT ID, employee, knowledge area, provider..."
          searchKeys={['id', 'employeeName', 'knowledgeArea', 'ktProvider', 'ktRecipient', 'ktBatch', 'tower']}
          pageSize={10}
          onRowClick={(row) => handleOpenEmployee(row.employeeName)}
          title="Operational Knowledge Transfer (KT) Governance Registry"
          subtitle="Click any employee row to open the complete profile, KT records, and role transition timeline"
          exportFilename="ncgr_kt_tracking"
        />
      )}

      {activeTab === 'development' && (
        <DataTable
          data={employeeDevelopmentRoster}
          columns={devColumns}
          searchPlaceholder="Search employee, role, track, skills..."
          searchKeys={['employeeName', 'employeeId', 'tower', 'currentRole', 'developmentTrack']}
          pageSize={10}
          onRowClick={(row) => handleOpenEmployee(row.employeeName)}
          title="Saudi National Employee Career Progression & Capability Tracks"
          subtitle="Click any employee row to open the complete profile and development status"
          exportFilename="ncgr_employee_development"
        />
      )}

      {/* Universal Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
      />
    </div>
  );
};

export default SaudiEmpowermentAcademy;
