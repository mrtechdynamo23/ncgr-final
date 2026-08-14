import React from 'react';
import {
  X, Mail, Phone, Building, Calendar,
  CheckCircle2, ArrowRightLeft, BookOpen, Clock, User
} from 'lucide-react';
import type { MasterEmployee } from '../../data/master-employees';
import { resourceMobilization } from '../../data/resourceMobilization';

interface EmployeeDetailModalProps {
  employee: MasterEmployee | null;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, isOpen, onClose }) => {
  if (!isOpen || !employee) return null;

  // Find resource mobilization history if exists
  const resourceMob = resourceMobilization.find(
    r => r.employeeId === employee.employeeId || r.employeeName === employee.name
  );

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1100,
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: 680,
          maxHeight: '90vh',
          background: 'var(--surface-raised, #FFFFFF)',
          borderRadius: 16,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          zIndex: 1101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border, #E4E7EC)',
        }}
      >
        {/* Header Profile Banner */}
        <div
          style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, #074A76 0%, #05263F 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #40904F 0%, #1FBBB0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              {employee.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {employee.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: employee.status === 'Active' ? 'rgba(64, 144, 79, 0.3)' : 'rgba(233, 127, 10, 0.3)',
                    color: employee.status === 'Active' ? '#CFDB51' : '#FFA940',
                    border: '1px solid currentColor',
                  }}
                >
                  {employee.status}
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)' }}>
                {employee.role} • <span style={{ opacity: 0.8 }}>{employee.employeeId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* Quick Contact & Meta Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                <Building size={14} /> Tower / Department
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                {employee.tower} • {employee.department}
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                <User size={14} /> Reporting Manager
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                {employee.manager}
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                <Clock size={14} /> Shift & Location
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                {employee.shift.split(' ')[0]} • {employee.location}
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                <Calendar size={14} /> Join Date & Type
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                {employee.joiningDate} • {employee.expatLocal} ({employee.nationality})
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 10,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--card-bg, #FFFFFF)',
              marginBottom: 24,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                Official Email Address
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={14} /> {employee.email}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
                Mobile Contact (Authorized)
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={14} /> {employee.mobile}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={`mailto:${employee.email}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: 6,
                  background: 'var(--ncgr-deep-blue, #074A76)',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Mail size={14} /> Email
              </a>
              <a
                href={`tel:${employee.mobile.replace(/ /g, '')}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: 6,
                  background: 'var(--ncgr-mint-green, #40904F)',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Phone size={14} /> Call
              </a>
            </div>
          </div>

          {/* Current Assignment */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Current Assignment & Scope
            </h4>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                background: 'rgba(64, 144, 79, 0.05)',
                border: '1px solid rgba(64, 144, 79, 0.2)',
                color: 'var(--ncgr-mint-green, #40904F)',
                fontWeight: 600,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <CheckCircle2 size={16} />
              <span>{employee.currentAssignment || 'NCGR ITMS Managed Operations'}</span>
            </div>
          </div>

          {/* Assignment History (if available) */}
          {resourceMob && resourceMob.assignmentHistory && resourceMob.assignmentHistory.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowRightLeft size={16} /> Assignment History ({resourceMob.assignmentHistory.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {resourceMob.assignmentHistory.map((hist, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 6,
                      background: 'var(--bg-secondary, #F7F8FA)',
                      border: '1px solid var(--border, #E4E7EC)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{hist.project}</span>
                      <span style={{ color: 'var(--text-tertiary, #98A2B3)', marginLeft: 8 }}>• {hist.role}</span>
                    </div>
                    <span style={{ color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
                      {hist.year} ({hist.startDate} - {hist.endDate || 'Present'})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KT History (if available) */}
          {resourceMob && resourceMob.ktHistory && resourceMob.ktHistory.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={16} /> Knowledge Transfer Records
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {resourceMob.ktHistory.map((kt, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 6,
                      background: 'var(--bg-secondary, #F7F8FA)',
                      border: '1px solid var(--border, #E4E7EC)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>{kt.ktBatch}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: kt.status === 'Completed' ? '#22A06B' : '#E97F0A',
                        }}
                      >
                        {kt.status}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary, #475467)' }}>
                      <strong>Topics:</strong> {kt.topics}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDetailModal;
