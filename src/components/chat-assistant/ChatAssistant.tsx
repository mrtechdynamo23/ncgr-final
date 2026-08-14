import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDataStore } from '../../data/mockDataStore';
import { getLicenseStats } from '../../data/licenses';
import { searchPortalEntities, type SearchableEntity } from '../../data/search-index';
import {
  Bot, X, Send, Sparkles, ArrowRight,
  Phone, RefreshCw
} from 'lucide-react';

interface AbsenteeSummary {
  employeeName: string;
  tower: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  coveringEmployee?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  navigatePath?: string;
  navigateLabel?: string;
  entities?: SearchableEntity[];
  absenteesList?: AbsenteeSummary[];
  incidentHighlight?: { id: string; priority: string; desc: string; tower: string }[];
  standbyList?: { name: string; tower: string; phone: string }[];
  richStats?: { label: string; value: string; color?: string }[];
}

const quickPromptsEn = [
  { label: '👥 Absentees & On Leave', query: 'Who is on leave today?' },
  { label: '🚨 P1 Critical Incidents', query: 'Show active P1 critical incidents' },
  { label: '📞 Standby / On-Call', query: 'Who is on standby today?' },
  { label: '📊 Workforce Attendance', query: 'Show workforce capacity and attendance' },
  { label: '🏢 Top Vendor Risks', query: 'Show high risk vendors' },
  { label: '⚡ Automation Savings', query: 'How much SAR saved from AI & automation?' },
];

const quickPromptsAr = [
  { label: '👥 المتغيبين والإجازات اليوم', query: 'من في إجازة اليوم؟' },
  { label: '🚨 الحوادث الحرجة P1', query: 'عرض الحوادث الحرجة المفتوحة' },
  { label: '📞 المهندسين المناوبين', query: 'من هم مهندسي الطوارئ والمناوبة؟' },
  { label: '📊 الحضور وطاقة الفريق', query: 'تقرير الحضور والقدرة الاستيعابية' },
  { label: '🏢 مخاطر الموردين', query: 'عرض مخاطر الموردين الحرجة' },
  { label: '⚡ وفورات الأتمتة والذكاء', query: 'ما هي وفورات الأتمتة والذكاء الاصطناعي؟' },
];

export const ChatAssistant: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  const {
    employees,
    leaveRecords,
    incidents,
    vendorRisks,
    initiatives,
  } = useDataStore();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting = isRtl
    ? 'مرحباً بك! أنا المساعد الذكي لمركز عمليات ITMS. يمكنني مساعدتك في معرفة الموظفين المتغيبين والمجازين، الحوادث الحرجة P1، المناوبين، مخاطر الموردين، والتنقل في جميع أركان المنظومة.'
    : 'Hello! I am your NCGR ITMS AI Assistant. I can look up absentees & leaves, active P1 incidents, on-call standbys, vendor risks, software spend, or help you navigate any section.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (queryText?: string) => {
    const text = (queryText || input).trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const q = text.toLowerCase();
      let responseText = '';
      let navigatePath: string | undefined = undefined;
      let navigateLabel: string | undefined = undefined;
      let absenteesList: AbsenteeSummary[] | undefined = undefined;
      let incidentHighlight: { id: string; priority: string; desc: string; tower: string }[] | undefined = undefined;
      let standbyList: { name: string; tower: string; phone: string }[] | undefined = undefined;
      let richStats: { label: string; value: string; color?: string }[] | undefined = undefined;

      // ─── 1. ABSENTEES / LEAVES / WHO IS NOT AVAILABLE ───────────────
      if (
        q.includes('absent') ||
        q.includes('absentee') ||
        q.includes('leave') ||
        q.includes('who is not available') ||
        q.includes('who is absent') ||
        q.includes('out of office') ||
        q.includes('vacation') ||
        q.includes('time off') ||
        q.includes('إجاز') ||
        q.includes('غياب') ||
        q.includes('المتغيب') ||
        q.includes('غير متاح') ||
        q.includes('من في إجازة')
      ) {
        const activeLeaves = leaveRecords.filter(
          (l) => l.status === 'Approved' || l.status === 'Pending'
        );

        absenteesList = activeLeaves.slice(0, 8).map((l) => ({
          employeeName: l.employee,
          tower: l.tower,
          leaveType: l.leaveType,
          startDate: l.startDate,
          endDate: l.endDate,
          coveringEmployee: l.backupResource,
        }));

        const totalAbsentees = activeLeaves.length;
        if (isRtl) {
          responseText = `يوجد حالياً **${totalAbsentees} موظفاً** مسجلين في إجازات رسمية معتمدة أو قيد الإجراء لهذا الشهر عبر مختلف الأبراج التقنية. إليك أبرز الكوادر غير المتاحة حالياً:`;
          navigatePath = '/team-overview/leave';
          navigateLabel = 'الانتقال إلى نظام إدارة الإجازات الكامل';
        } else {
          responseText = `Currently, **${totalAbsentees} team members** are on approved leave or scheduled time-off this period. Here are the primary team members unavailable today:`;
          navigatePath = '/team-overview/leave';
          navigateLabel = 'Open Full Leave Management Dashboard';
        }
      }

      // ─── 2. STANDBY / ON-CALL ENGINEERS ─────────────────────────────
      else if (
        q.includes('standby') ||
        q.includes('on call') ||
        q.includes('on-call') ||
        q.includes('emergency contact') ||
        q.includes('who is on call') ||
        q.includes('مناوب') ||
        q.includes('طوارئ') ||
        q.includes('تحت الطلب')
      ) {
        const standbys = employees.filter((e) => e.status === 'Standby' || e.shift.includes('Night')).slice(0, 6);
        standbyList = standbys.map((e) => ({
          name: e.name,
          tower: e.tower,
          phone: e.mobile,
        }));

        if (isRtl) {
          responseText = `يوجد **42 مهندساً** على أهبة الاستعداد والمناوبة (Standby) على مدار الساعة عبر 9 أبراج عملياتية. إليك مناوبي الطوارئ المعتمدين:`;
          navigatePath = '/team-overview/contacts';
          navigateLabel = 'فتح دليل الاتصال السريع';
        } else {
          responseText = `There are **42 dedicated engineers** designated on 24x7 standby roster across all operational towers. Key on-call contacts:`;
          navigatePath = '/team-overview/contacts';
          navigateLabel = 'Open Contact Directory';
        }
      }

      // ─── 3. P1 / CRITICAL INCIDENTS ──────────────────────────────────
      else if (
        q.includes('p1') ||
        q.includes('critical incident') ||
        q.includes('major incident') ||
        q.includes('outage') ||
        q.includes('bridge') ||
        q.includes('حوادث حرجة') ||
        q.includes('عطل') ||
        q.includes('انقطاع')
      ) {
        const p1s = incidents.filter((i) => i.priority === 'P1');
        const p2s = incidents.filter((i) => i.priority === 'P2');
        incidentHighlight = [...p1s, ...p2s].slice(0, 4).map((i) => ({
          id: i.id,
          priority: i.priority,
          desc: i.title,
          tower: i.tower,
        }));

        richStats = [
          { label: 'P1 Active Bridges', value: `${p1s.length}`, color: '#DE350B' },
          { label: 'P2 High Incidents', value: `${p2s.length}`, color: '#E97F0A' },
          { label: 'Overall SLA Attainment', value: '99.3%', color: '#22A06B' },
        ];

        if (isRtl) {
          responseText = `يوجد حالياً **${p1s.length} حادث حرج (P1)** و **${p2s.length} حادث عالي (P2)** قيد المتابعة المباشرة مع جسور الطوارئ الفنية:`;
          navigatePath = '/command-center/critical-incidents';
          navigateLabel = 'الانتقال إلى جسر الحوادث الحرجة P1/P2';
        } else {
          responseText = `There are currently **${p1s.length} P1 Critical** and **${p2s.length} P2 High** active incidents under triage on the major incident bridges:`;
          navigatePath = '/command-center/critical-incidents';
          navigateLabel = 'Open Critical Incident Bridges';
        }
      }

      // ─── 4. WORKFORCE CAPACITY & ATTENDANCE ──────────────────────────
      else if (
        q.includes('attendance') ||
        q.includes('capacity') ||
        q.includes('headcount') ||
        q.includes('how many present') ||
        q.includes('workforce') ||
        q.includes('حضور') ||
        q.includes('طاقة') ||
        q.includes('عدد الموظفين')
      ) {
        richStats = [
          { label: 'Total Headcount', value: `${employees.length}`, color: '#074A76' },
          { label: 'Present Today', value: '275 (77.5%)', color: '#22A06B' },
          { label: 'Approved Leave', value: '24 (6.8%)', color: '#E97F0A' },
          { label: 'Standby / Training', value: '56 (15.7%)', color: '#4AA6DC' },
        ];

        if (isRtl) {
          responseText = `إجمالي القوة البشرية المعتمدة لمركز العمليات هو **${employees.length} موظفاً ومهندساً**. إليك توزيع الحضور والطاقة التشغيلية اليوم:`;
          navigatePath = '/team-overview/attendance';
          navigateLabel = 'فتح سجل الحضور والانصراف اللحظي';
        } else {
          responseText = `The total active workforce across 9 operational towers is **${employees.length} personnel**. Current operational capacity distribution:`;
          navigatePath = '/team-overview/attendance';
          navigateLabel = 'Open Live Attendance View';
        }
      }

      // ─── 5. VENDOR RISKS & SIAM ──────────────────────────────────────
      else if (
        q.includes('vendor') ||
        q.includes('siam') ||
        q.includes('supplier') ||
        q.includes('risk') ||
        q.includes('مورد') ||
        q.includes('مخاطر')
      ) {
        const criticalRisks = vendorRisks.filter((r) => r.riskScore >= 16);
        richStats = [
          { label: 'Active Vendors', value: '16 Contracts', color: '#074A76' },
          { label: 'Critical Risks (5x5)', value: `${criticalRisks.length} High Severity`, color: '#DE350B' },
          { label: 'SIAM Compliance', value: '94.8%', color: '#22A06B' },
        ];

        if (isRtl) {
          responseText = `تدير منظومة SIAM **16 عقداً رئيسياً للموردين** و **26 سجلاً للمخاطر** بمصفوفة 5×5. يوجد **${criticalRisks.length} مخاطر حرجة** قيد المتابعة اللصيقة:`;
          navigatePath = '/vendor-siam/risk';
          navigateLabel = 'فتح مصفوفة مخاطر الموردين 5×5';
        } else {
          responseText = `The SIAM governance matrix monitors **16 strategic IT suppliers** and **26 vendor risks**. Currently **${criticalRisks.length} risks** have high severity scores on the 5x5 matrix:`;
          navigatePath = '/vendor-siam/risk';
          navigateLabel = 'Open 5x5 Vendor Risk Heatmap';
        }
      }

      // ─── 6. AUTOMATION & AI SAVINGS ──────────────────────────────────
      else if (
        q.includes('automation') ||
        q.includes('ai') ||
        q.includes('savings') ||
        q.includes('roi') ||
        q.includes('hours saved') ||
        q.includes('أتمتة') ||
        q.includes('ذكاء') ||
        q.includes('وفر')
      ) {
        richStats = [
          { label: 'Active Initiatives', value: `${initiatives.length} Projects`, color: '#074A76' },
          { label: 'Financial Savings', value: 'SAR 4.2M / yr', color: '#22A06B' },
          { label: 'Hours Automated', value: '14,200 hrs/yr', color: '#4AA6DC' },
        ];

        if (isRtl) {
          responseText = `برنامج التحول الرقمي والذكاء الاصطناعي يشمل **18 مبادرة نشطة** وفرت أكثر من **4.2 مليون ريال سعودي** سنوياً وأتمتت **14,200 ساعة عمل**:`;
          navigatePath = '/transformation';
          navigateLabel = 'فتح منصة التحول والذكاء الاصطناعي';
        } else {
          responseText = `The Digital Transformation & AI program contains **18 active automation initiatives**, saving **SAR 4.2M annually** and eliminating **14,200 manual hours**:`;
          navigatePath = '/transformation';
          navigateLabel = 'Open AI & Transformation Hub';
        }
      }

      // ─── 7. SOFTWARE LICENSES ─────────────────────────────────────────
      else if (
        q.includes('license') ||
        q.includes('software') ||
        q.includes('spend') ||
        q.includes('تراخيص') ||
        q.includes('برمجيات')
      ) {
        const licStats = getLicenseStats();
        richStats = [
          { label: 'Licensed Products', value: `${licStats.total}`, color: '#074A76' },
          { label: 'Annual Spend', value: `SAR ${(licStats.totalCost / 1000000).toFixed(1)}M`, color: '#074A76' },
          { label: 'Healthy Licenses', value: `${licStats.healthy}`, color: '#22A06B' },
          { label: 'Expiring in 90 Days', value: `${licStats.expiringIn90Days} items`, color: '#E97F0A' },
        ];

        if (isRtl) {
          responseText = `تضم المنظومة **${licStats.total} اشتراكاً وترخيصاً برمجياً** بإجمالي إنفاق **${(licStats.totalCost / 1000000).toFixed(1)} مليون ريال**:`;
          navigatePath = '/license-health';
          navigateLabel = 'فتح سجل التراخيص والاستحقاقات';
        } else {
          responseText = `Tracking **${licStats.total} software enterprise licenses** with total annual value of **SAR ${(licStats.totalCost / 1000000).toFixed(1)}M**:`;
          navigatePath = '/license-health';
          navigateLabel = 'Open License Health Matrix';
        }
      }

      // ─── 8. FALLBACK TO PORTAL SEARCH INDEX ───────────────────────────
      else {
        const searchResults = searchPortalEntities(text, 4);
        if (searchResults.length > 0) {
          responseText = isRtl
            ? `عثرت على **${searchResults.length} عناصر مطابقة** لاستفسارك في بيانات المنظومة:`
            : `Found **${searchResults.length} matching entities** in the portal dataset:`;
        } else {
          responseText = isRtl
            ? `لم أجد نتيجة مباشرة لـ "${text}". يمكنك سؤالي عن المتغيبين، حوادث P1، المناوبين، تراخيص البرمجيات، أو مخاطر الموردين.`
            : `I could not find exact live data for "${text}". Try asking about absentees, P1 incidents, standby engineers, licenses, or vendor risks.`;
        }

        const assistantMsg: ChatMessage = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          entities: searchResults.length > 0 ? searchResults : undefined,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        navigatePath,
        navigateLabel,
        absenteesList,
        incidentHighlight,
        standbyList,
        richStats,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
  };

  const currentPrompts = isRtl ? quickPromptsAr : quickPromptsEn;

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chat-float-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open NCGR Assistant"
        title="NCGR ITMS Operations Assistant"
        style={{
          position: 'fixed',
          bottom: 24,
          right: isRtl ? 'auto' : 24,
          left: isRtl ? 24 : 'auto',
          width: 52,
          height: 52,
          borderRadius: 26,
          background: 'linear-gradient(135deg, var(--ncgr-deep-blue, #074A76) 0%, var(--ncgr-mint-green, #40904F) 100%)',
          color: 'white',
          boxShadow: '0 8px 24px rgba(7, 74, 118, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <Bot size={26} />
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 86,
            right: isRtl ? 'auto' : 24,
            left: isRtl ? 24 : 'auto',
            width: 440,
            maxWidth: '92vw',
            height: 580,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border-strong, #D0D5DD)',
            borderRadius: 16,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out',
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #074A76 0%, #40904F 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                  {isRtl ? 'المساعد الذكي لعمليات NCGR' : 'NCGR ITMS Operations Assistant'}
                </div>
                <div style={{ fontSize: '0.6875rem', opacity: 0.9 }}>
                  {isRtl ? 'بيانات لحظية • 355+ موظف • 103 حادث' : 'Live Data Engine • 355+ Staff • 103 Incidents'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: 'white',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: 8,
                padding: 6,
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              padding: '14px 16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              background: 'var(--bg-secondary, #F7F8FA)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '92%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: msg.sender === 'user' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--card-bg, #FFFFFF)',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text, #101828)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.5,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                  {/* Rich Stats Cards */}
                  {msg.richStats && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                        gap: 6,
                        marginTop: 10,
                      }}
                    >
                      {msg.richStats.map((stat, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '6px 8px',
                            borderRadius: 6,
                            background: 'var(--bg-secondary, #F7F8FA)',
                            border: '1px solid var(--border, #E4E7EC)',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
                            {stat.label}
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: stat.color || 'var(--text, #101828)', marginTop: 2 }}>
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Absentees List Cards */}
                  {msg.absenteesList && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {msg.absenteesList.map((abs, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '8px 10px',
                            background: 'var(--bg-secondary, #F7F8FA)',
                            borderRadius: 6,
                            borderLeft: '3px solid #E97F0A',
                            fontSize: '0.75rem',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{abs.employeeName}</span>
                            <span
                              style={{
                                padding: '1px 6px',
                                borderRadius: 4,
                                background: '#FFF7E6',
                                color: '#E97F0A',
                                fontWeight: 700,
                                fontSize: '0.6875rem',
                              }}
                            >
                              {abs.leaveType}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                            Tower: <strong>{abs.tower}</strong> • Period: {abs.startDate} to {abs.endDate}
                          </div>
                          {abs.coveringEmployee && (
                            <div style={{ fontSize: '0.6875rem', color: '#40904F', marginTop: 1 }}>
                              Backup: {abs.coveringEmployee}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Incident Highlights */}
                  {msg.incidentHighlight && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {msg.incidentHighlight.map((inc, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '8px 10px',
                            background: 'var(--bg-secondary, #F7F8FA)',
                            borderRadius: 6,
                            borderLeft: `3px solid ${inc.priority === 'P1' ? '#DE350B' : '#E97F0A'}`,
                            fontSize: '0.75rem',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                              {inc.id}
                            </span>
                            <span
                              style={{
                                padding: '1px 6px',
                                borderRadius: 4,
                                background: inc.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
                                color: inc.priority === 'P1' ? '#DE350B' : '#E97F0A',
                                fontWeight: 800,
                                fontSize: '0.6875rem',
                              }}
                            >
                              {inc.priority}
                            </span>
                          </div>
                          <div style={{ color: 'var(--text, #101828)', marginTop: 2, fontWeight: 600 }}>{inc.desc}</div>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>Tower: {inc.tower}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standby Contacts */}
                  {msg.standbyList && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {msg.standbyList.map((st, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-secondary, #F7F8FA)',
                            borderRadius: 6,
                            borderLeft: '3px solid #4AA6DC',
                            fontSize: '0.75rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{st.name}</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>{st.tower}</div>
                          </div>
                          <a
                            href={`tel:${st.phone.replace(/\s/g, '')}`}
                            style={{
                              padding: '3px 8px',
                              borderRadius: 4,
                              background: '#E6F4FC',
                              color: '#074A76',
                              fontWeight: 700,
                              fontSize: '0.6875rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <Phone size={11} /> {st.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search Entities */}
                  {msg.entities && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.entities.map((e) => (
                        <div
                          key={e.id}
                          onClick={() => {
                            navigate(e.path);
                            setIsOpen(false);
                          }}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-secondary, #F7F8FA)',
                            border: '1px solid var(--border, #E4E7EC)',
                            borderRadius: 6,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>{e.title}</div>
                          <div style={{ color: 'var(--text-secondary, #475467)', fontSize: '0.6875rem' }}>{e.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Action Link Button */}
                  {msg.navigatePath && (
                    <button
                      onClick={() => {
                        navigate(msg.navigatePath!);
                        setIsOpen(false);
                      }}
                      style={{
                        marginTop: 10,
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, var(--ncgr-deep-blue, #074A76) 0%, var(--ncgr-mint-green, #40904F) 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {msg.navigateLabel} <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                <div
                  style={{
                    fontSize: '0.625rem',
                    color: 'var(--text-tertiary, #98A2B3)',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    padding: '0 4px',
                  }}
                >
                  {msg.timestamp}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '8px 14px',
                  background: 'var(--card-bg, #FFFFFF)',
                  border: '1px solid var(--border, #E4E7EC)',
                  borderRadius: 12,
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary, #475467)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <RefreshCw size={13} className="spin" />
                <span>{isRtl ? 'جاري تحليل واسترجاع البيانات...' : 'Analyzing live portal data...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Pills Strip */}
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--card-bg, #FFFFFF)',
              borderTop: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {currentPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                style={{
                  padding: '4px 10px',
                  background: 'var(--bg-secondary, #F7F8FA)',
                  border: '1px solid var(--border, #E4E7EC)',
                  borderRadius: 14,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary, #475467)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E6F4FC';
                  e.currentTarget.style.color = '#074A76';
                  e.currentTarget.style.borderColor = '#4AA6DC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-secondary, #F7F8FA)';
                  e.currentTarget.style.color = 'var(--text-secondary, #475467)';
                  e.currentTarget.style.borderColor = 'var(--border, #E4E7EC)';
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div
            style={{
              padding: 12,
              background: 'var(--card-bg, #FFFFFF)',
              borderTop: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder={isRtl ? 'اسأل عن المتغيبين، حوادث P1، الموردين...' : 'Ask about absentees, P1 incidents, vendors...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '9px 12px',
                background: 'var(--input-bg, #F7F8FA)',
                border: '1px solid var(--border, #D0D5DD)',
                borderRadius: 8,
                color: 'var(--input-text, #101828)',
                fontSize: '0.8125rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                padding: '9px 14px',
                background: 'linear-gradient(135deg, var(--ncgr-deep-blue, #074A76) 0%, var(--ncgr-mint-green, #40904F) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
