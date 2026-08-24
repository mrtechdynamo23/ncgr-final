import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDataStore } from '../../data/mockDataStore';
import { getLicenseStats } from '../../data/licenses';
import { getSaudizationStats } from '../../data/master-employees';
import { searchPortalEntities, type SearchableEntity } from '../../data/search-index';
import { INITIAL_MEETINGS } from '../../data/master-meetings';
import { MASTER_REPORTS } from '../../data/master-reports';
import {
  X, Send, Sparkles, ArrowRight, Phone
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
  { label: '👥 Absentees & Leaves', query: 'Who is on leave today?' },
  { label: '🚨 P1 Critical Incidents', query: 'Show active P1 critical incidents' },
  { label: '📅 Today & Upcoming Meetings', query: 'What meetings are scheduled today?' },
  { label: '📑 Reports Repository', query: 'Show latest WSR and MSR reports' },
  { label: '🇸🇦 Saudization Progress', query: 'What is our Saudization percentage?' },
  { label: '📞 Standby / On-Call', query: 'Who is on standby today?' },
  { label: '🏢 Top Vendor Risks', query: 'Show high risk vendors' },
];

const quickPromptsAr = [
  { label: '👥 المتغيبين والإجازات اليوم', query: 'من في إجازة اليوم؟' },
  { label: '🚨 الحوادث الحرجة P1', query: 'عرض الحوادث الحرجة المفتوحة' },
  { label: '📅 اجتماعات اليوم وجدول الحوكمة', query: 'ما هي اجتماعات اليوم المجدولة؟' },
  { label: '📑 تقارير WSR و MSR المركزية', query: 'عرض تقارير WSR و MSR' },
  { label: '🇸🇦 نسبة التوطين والسعودة', query: 'ما هي نسبة السعودة الحالية؟' },
  { label: '📞 المهندسين المناوبين', query: 'من هم مهندسي الطوارئ والمناوبة؟' },
  { label: '🏢 مخاطر الموردين', query: 'عرض مخاطر الموردين الحرجة' },
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
  } = useDataStore();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting = isRtl
    ? 'مرحباً بك! أنا المساعد المحلي لمركز عمليات ITMS. يمكنني مساعدتك فوراً في الاستعلام عن الموظفين المتغيبين والمجازين، الحوادث الحرجة P1، جدول الاجتماعات وحوكمة المكالمات، تقارير WSR/MSR، ومخاطر الموردين، مع التنقل السريع في المنظومة.'
    : 'Hello! I am your NCGR ITMS Local Assistant. I can instantly look up absentees & leaves, active P1 incidents, meeting schedules & MOMs, WSR/MSR reports repository, Saudization %, vendor risks, or navigate you anywhere across the portal.';

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

  const getLocalResponse = (q: string, text: string) => {
    let responseText = '';
    let navigatePath: string | undefined = undefined;
    let navigateLabel: string | undefined = undefined;
    let absenteesList: AbsenteeSummary[] | undefined = undefined;
    let incidentHighlight: { id: string; priority: string; desc: string; tower: string }[] | undefined = undefined;
    let standbyList: { name: string; tower: string; phone: string }[] | undefined = undefined;
    let richStats: { label: string; value: string; color?: string }[] | undefined = undefined;
    let entities: SearchableEntity[] | undefined = undefined;

    // ─── 1. CALENDAR & MEETINGS (WSR, MSR, DSR, SCRUM) ───────────────
    if (
      q.includes('meeting') ||
      q.includes('calendar') ||
      q.includes('schedule') ||
      q.includes('wsr meeting') ||
      q.includes('msr meeting') ||
      q.includes('scrum') ||
      q.includes('mom') ||
      q.includes('اجتماع') ||
      q.includes('تقويم') ||
      q.includes('جدول') ||
      q.includes('محضر')
    ) {
      richStats = [
        { label: 'Today (17 Aug)', value: '3 Sessions', color: '#074A76' },
        { label: 'Tomorrow (18 Aug)', value: '3 Sessions', color: '#22A06B' },
        { label: 'High Priority Calls', value: `${INITIAL_MEETINGS.filter(m => m.priority === 'Critical' || m.priority === 'High Priority').length}`, color: '#DE350B' },
      ];

      if (isRtl) {
        responseText = `يحتوي تقويم الحوكمة المركزي على **${INITIAL_MEETINGS.length} جلسة مجدولة** عبر دورة الشهرين (WSR, MSR, DSR, Daily Scrum, CAB). يمكنك استعراض محاضر الاجتماعات (MOM) والإجراءات المنبثقة:`;
        navigatePath = '/calendar';
        navigateLabel = 'فتح التقويم المركزي وحوكمة الاجتماعات';
      } else {
        responseText = `The Central Calendar & Meeting Governance module contains **${INITIAL_MEETINGS.length} scheduled sessions** across a 2-month horizon (WSR, MSR, DSR, Scrum, CAB). You can inspect live schedules, MOM minutes, and assigned action items:`;
        navigatePath = '/calendar';
        navigateLabel = 'Open Central Meeting Governance Calendar';
      }
    }

    // ─── 2. REPORTS REPOSITORY (REPOS) ──────────────────────────────
    else if (
      q.includes('report') ||
      q.includes('repos') ||
      q.includes('repository') ||
      q.includes('download report') ||
      q.includes('wsr report') ||
      q.includes('msr report') ||
      q.includes('تقرير') ||
      q.includes('تقارير') ||
      q.includes('مستودع')
    ) {
      richStats = [
        { label: 'Total Cataloged Reports', value: `${MASTER_REPORTS.length}`, color: '#074A76' },
        { label: 'Reporting Categories', value: '16 Taxonomies', color: '#671E75' },
        { label: 'Latest Approved Release', value: 'WSR Week 33', color: '#22A06B' },
      ];

      if (isRtl) {
        responseText = `يوفر **مستودع التقارير المركزي (Repos)** وصولاً شاملاً لـ **${MASTER_REPORTS.length} تقريراً معتمداً** مصنفة ضمن 16 فئة (تقارير الإدارة التنفيذية، WSR، MSR، DSR، العمليات، ومؤشرات SLA).`;
        navigatePath = '/repos';
        navigateLabel = 'الانتقال إلى مستودع التقارير المركزي (Repos)';
      } else {
        responseText = `The **Repos** module is the central repository for **${MASTER_REPORTS.length} official reports** across 16 categories including Executive Management, WSR Week 33, MSR July, SLA Assurance, and Audit Compliance.`;
        navigatePath = '/repos';
        navigateLabel = 'Open Central Reports Repository (Repos)';
      }
    }

    // ─── 2B. SLA MANAGEMENT & ASSURANCE ─────────────────────────────
    else if (
      q.includes('sla') ||
      q.includes('service level') ||
      q.includes('target vs actual') ||
      q.includes('tool-measured') ||
      q.includes('soft sla') ||
      q.includes('مستوى الخدمة') ||
      q.includes('اتفاقية مستوى الخدمة')
    ) {
      richStats = [
        { label: 'Contractual SLAs', value: '123 Records', color: '#074A76' },
        { label: 'Current Attainment', value: '99.2% Met', color: '#22A06B' },
        { label: 'Data-Driven Telemetry', value: '71 Tool-Measured', color: '#074A76' },
        { label: 'Soft / Governance', value: '52 Manual/QA', color: '#671E75' },
      ];

      if (isRtl) {
        responseText = `تتم متابعة **123 اتفاقية مستوى خدمة (SLA)** معتمدة مصنفة وفق مستويين صارمين: **Data-Driven (بيانات مؤتمتة)** و **Soft / Manual (حوكمة ومراجعة مستندية)** مع إمكانية تحديث القيم وإرفاق الأدلة.`;
        navigatePath = '/assurance/sla';
        navigateLabel = 'الانتقال إلى نظام إدارة اتفاقيات مستوى الخدمة (SLA)';
      } else {
        responseText = `Tracking **123 authoritative contractual SLAs** across 9 towers categorized into strict **Data-Driven / Tool-Measured** and **Soft / Manual** streams with active compliance calculations and evidence workflows.`;
        navigatePath = '/assurance/sla';
        navigateLabel = 'Open SLA Management Workspace';
      }
    }

    // ─── 3. ABSENTEES / LEAVES / WHO IS NOT AVAILABLE ───────────────
    else if (
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

    // ─── 4. STANDBY / ON-CALL ENGINEERS ─────────────────────────────
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

    // ─── 5. P1 / CRITICAL INCIDENTS ──────────────────────────────────
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

    // ─── 6. WORKFORCE CAPACITY & ATTENDANCE ──────────────────────────
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

    // ─── 7. SAUDIZATION TRACKER ──────────────────────────────────────
    else if (
      q.includes('saudi') ||
      q.includes('saudization') ||
      q.includes('nitaqat') ||
      q.includes('nationalization') ||
      q.includes('expat') ||
      q.includes('سعودة') ||
      q.includes('توطين') ||
      q.includes('نطاقات') ||
      q.includes('سعودي')
    ) {
      const saudStats = getSaudizationStats();
      const expatCount = saudStats.overallTotal - saudStats.overallSaudiCount;
      richStats = [
        { label: 'Overall Saudization', value: `${saudStats.overallPct}%`, color: '#22A06B' },
        { label: 'Ministry Baseline', value: '60.0%', color: '#074A76' },
        { label: 'Saudi Engineers', value: `${saudStats.overallSaudiCount}`, color: '#22A06B' },
        { label: 'Expatriate Specialists', value: `${expatCount}`, color: '#475467' },
      ];

      if (isRtl) {
        responseText = `نسبة السعودة الكلية المحققة حالياً هي **${saudStats.overallPct}%** متجاوزة المستهدف الأساسي للوزارة (60.0%)، وتضم **${saudStats.overallSaudiCount} مهندساً سعودياً** و **${expatCount} خبيراً وافداً**.`;
        navigatePath = '/saudization-tracker';
        navigateLabel = 'الانتقال إلى متتبع نسب السعودة والتوطين';
      } else {
        responseText = `The overall Saudization rate is **${saudStats.overallPct}%**, exceeding the Ministry baseline of 60.0%. Total headcount comprises **${saudStats.overallSaudiCount} Saudi professionals** and **${expatCount} Expatriate specialists**.`;
        navigatePath = '/saudization-tracker';
        navigateLabel = 'Open Saudization Tracker';
      }
    }

    // ─── 8. VENDOR RISKS & SIAM ──────────────────────────────────────
    else if (
      q.includes('vendor') ||
      q.includes('siam') ||
      q.includes('supplier') ||
      q.includes('contract') ||
      q.includes('wipro') ||
      q.includes('elm') ||
      q.includes('sbm') ||
      q.includes('مورد') ||
      q.includes('موردين') ||
      q.includes('عقد') ||
      q.includes('شركاء')
    ) {
      const highRisks = vendorRisks.filter((r) => r.likelihood === 'Very High' || r.likelihood === 'High');
      richStats = [
        { label: 'Strategic Vendors', value: '16 Partners', color: '#074A76' },
        { label: 'Active Risks Tracked', value: `${vendorRisks.length}`, color: '#E97F0A' },
        { label: 'High Priority Risks', value: `${highRisks.length}`, color: '#DE350B' },
        { label: 'Supplier SLA Compliance', value: '98.6%', color: '#22A06B' },
      ];

      if (isRtl) {
        responseText = `تتم إدارة **16 مورداً استراتيجياً** بنموذج SIAM، وهناك **${highRisks.length} مخاطر عالية** قيد المتابعة والعلاج الفني:`;
        navigatePath = '/vendor-siam';
        navigateLabel = 'الانتقال إلى بوابة حوكمة الموردين SIAM';
      } else {
        responseText = `We actively govern **16 key suppliers** under the SIAM framework with **${highRisks.length} high-severity risk items** under mitigation:`;
        navigatePath = '/vendor-siam';
        navigateLabel = 'Open Vendor & SIAM Governance';
      }
    }

    // ─── 9. AUTOMATION & AI SAVINGS ──────────────────────────────────
    else if (
      q.includes('automation') ||
      q.includes('ai') ||
      q.includes('transformation') ||
      q.includes('saving') ||
      q.includes('sar') ||
      q.includes('أتمتة') ||
      q.includes('ذكاء') ||
      q.includes('تحول') ||
      q.includes('وفر')
    ) {
      richStats = [
        { label: 'Annual Cost Avoidance', value: 'SAR 1.48M', color: '#22A06B' },
        { label: 'Automated Resolutions', value: '418 Incidents', color: '#074A76' },
        { label: 'Labor Hours Saved', value: '184 Hrs/Mo', color: '#671E75' },
      ];

      if (isRtl) {
        responseText = `حققت مبادرات التحول الرقمي والأتمتة وفورات سنوية بلغت **1.48 مليون ريال سعودي** مع تشغيل 418 مسار معالجة ذاتية للأعطال.`;
        navigatePath = '/transformation';
        navigateLabel = 'الانتقال إلى لوحة التحول الرقمي والذكاء الاصطناعي';
      } else {
        responseText = `Digital Transformation & AI Automation initiatives have delivered **SAR 1.48M in operational savings** with 418 automated incident resolutions.`;
        navigatePath = '/transformation';
        navigateLabel = 'Open Digital Transformation & AI Dashboard';
      }
    }

    // ─── 10. SOFTWARE LICENSES & ENTITLEMENTS ────────────────────────
    else if (
      q.includes('license') ||
      q.includes('entitlement') ||
      q.includes('oracle') ||
      q.includes('vmware') ||
      q.includes('microsoft') ||
      q.includes('ترخيص') ||
      q.includes('تراخيص')
    ) {
      const licStats = getLicenseStats();
      richStats = [
        { label: 'Total Tracked Licenses', value: `${licStats.total}`, color: '#074A76' },
        { label: 'Optimal Health', value: `${licStats.healthy}`, color: '#22A06B' },
        { label: 'Renewal Attention', value: `${licStats.nearExpiry}`, color: '#E97F0A' },
        { label: 'Annual Investment', value: 'SAR 14.2M', color: '#671E75' },
      ];

      if (isRtl) {
        responseText = `تتم إدارة **${licStats.total} ترخيصاً برمجياً استراتيجياً** (Oracle, VMware, Microsoft, RedHat, ServiceNow) بقيمة 14.2 مليون ريال سعودي.`;
        navigatePath = '/license-health';
        navigateLabel = 'الانتقال إلى صحة التراخيص والاستحقاقات';
      } else {
        responseText = `Tracking **${licStats.total} enterprise software entitlements** valued at SAR 14.2M across Oracle, VMware, Microsoft, RedHat, and ServiceNow.`;
        navigatePath = '/license-health';
        navigateLabel = 'Open License & Entitlement Health';
      }
    }

    // ─── 11. GENERAL / ENTITY SEARCH FALLBACK ────────────────────────
    else {
      const searchResults = searchPortalEntities(text);
      if (searchResults.length > 0) {
        entities = searchResults.slice(0, 4);
        if (isRtl) {
          responseText = `وجدت **${searchResults.length} نتيجة مطابقة** في سجلات مركز العمليات. إليك الروابط المباشرة:`;
        } else {
          responseText = `Found **${searchResults.length} matching entity records** across the ITMS database. Here are direct quick-links:`;
        }
      } else {
        if (isRtl) {
          responseText = `أنا المساعد المحلي الجاهز لخدمتك. يمكنك سؤالي عن:\n• **من في إجازة اليوم؟** أو المهندسين المناوبين\n• **الحوادث الحرجة P1** وحالة غرف العمليات\n• **اجتماعات اليوم والتقويم المركزي** (WSR / MSR / CAB)\n• **مستودع التقارير المركزي (Repos)**\n• **نسبة السعودة والتوطين** وتوزيع الكوادر\n• **مخاطر الموردين** ووفورات الأتمتة`;
        } else {
          responseText = `I am your local ITMS operations assistant. You can ask me about:\n• **"Who is on leave today?"** or on-call standby contacts\n• **"Show active P1 incidents"** and bridge status\n• **"What meetings are scheduled today?"** (WSR / MSR / CAB)\n• **"Show reports repository"** to view or download releases\n• **"What is our Saudization percentage?"**\n• **"Show top vendor risks"** and SIAM governance`;
        }
      }
    }

    return {
      responseText,
      navigatePath,
      navigateLabel,
      absenteesList,
      incidentHighlight,
      standbyList,
      richStats,
      entities,
    };
  };

  const handleSend = async (queryText?: string) => {
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

    // Instant local parsing with smooth realistic typing feedback
    await new Promise((res) => setTimeout(res, 280));
    const localResult = getLocalResponse(text.toLowerCase(), text);
    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text: localResult.responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      navigatePath: localResult.navigatePath,
      navigateLabel: localResult.navigateLabel,
      absenteesList: localResult.absenteesList,
      incidentHighlight: localResult.incidentHighlight,
      standbyList: localResult.standbyList,
      richStats: localResult.richStats,
      entities: localResult.entities,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const currentPrompts = isRtl ? quickPromptsAr : quickPromptsEn;

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chat-float-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title={isRtl ? 'المساعد الذكي لمركز العمليات' : 'NCGR ITMS Operations Assistant'}
        aria-label="Toggle AI Assistant"
      >
        <Sparkles size={22} color="#FFFFFF" />
        <span className="chat-float-pulse" />
      </button>

      {/* Slide-over / Modal Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 84,
            right: isRtl ? 'auto' : 24,
            left: isRtl ? 24 : 'auto',
            width: 440,
            maxWidth: 'calc(100vw - 32px)',
            height: 620,
            maxHeight: 'calc(100vh - 120px)',
            background: 'var(--surface-raised, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderRadius: 16,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1300,
            animation: 'modalSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                    {isRtl ? 'المساعد الذكي لعمليات NCGR' : 'NCGR ITMS Operations Assistant'}
                  </span>
                  <span
                    style={{
                      padding: '1px 6px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.2)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                    }}
                  >
                    Local Engine
                  </span>
                </div>
                <div style={{ fontSize: '0.6875rem', opacity: 0.9 }}>
                  {isRtl ? 'بيانات لحظية • 355+ موظف • 103 حادث • 74 تقريراً' : 'Live Telemetry • 355+ Staff • 103 Incidents • 74 Reports'}
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
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background:
                      msg.sender === 'user'
                        ? 'var(--ncgr-deep-blue, #074A76)'
                        : 'var(--card-bg, #FFFFFF)',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text, #101828)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    border:
                      msg.sender === 'user'
                        ? 'none'
                        : '1px solid var(--border, #E4E7EC)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}

                  {/* Rich Stats Strip */}
                  {msg.richStats && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 6,
                        marginTop: 10,
                      }}
                    >
                      {msg.richStats.map((st, i) => (
                        <div
                          key={i}
                          style={{
                            background: 'var(--bg-secondary, #F8FAFC)',
                            padding: '6px 8px',
                            borderRadius: 6,
                            border: '1px solid var(--border, #E4E7EC)',
                          }}
                        >
                          <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary, #475467)' }}>
                            {st.label}
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: st.color || '#074A76' }}>
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Absentees List Card */}
                  {msg.absenteesList && msg.absenteesList.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.absenteesList.map((abs, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '6px 8px',
                            background: 'var(--bg-secondary, #F8FAFC)',
                            borderRadius: 6,
                            border: '1px solid var(--border, #E4E7EC)',
                            fontSize: '0.6875rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <strong style={{ color: 'var(--text, #101828)' }}>{abs.employeeName}</strong>
                            <div style={{ color: 'var(--text-secondary, #475467)' }}>
                              {abs.tower} • {abs.leaveType}
                            </div>
                          </div>
                          <span style={{ color: '#E97F0A', fontWeight: 700 }}>
                            {abs.coveringEmployee ? `Cover: ${abs.coveringEmployee}` : 'On Leave'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standby Contacts Card */}
                  {msg.standbyList && msg.standbyList.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.standbyList.map((st, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '6px 8px',
                            background: 'var(--bg-secondary, #F8FAFC)',
                            borderRadius: 6,
                            border: '1px solid var(--border, #E4E7EC)',
                            fontSize: '0.6875rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <strong style={{ color: 'var(--text, #101828)' }}>{st.name}</strong>
                            <div style={{ color: 'var(--text-secondary, #475467)' }}>{st.tower}</div>
                          </div>
                          <a
                            href={`tel:${st.phone}`}
                            style={{
                              color: '#22A06B',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <Phone size={11} />
                            {st.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Incident Highlights Card */}
                  {msg.incidentHighlight && msg.incidentHighlight.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.incidentHighlight.map((inc, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '6px 8px',
                            background: inc.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
                            borderRadius: 6,
                            border: `1px solid ${inc.priority === 'P1' ? '#DE350B' : '#E97F0A'}`,
                            fontSize: '0.6875rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 800, color: inc.priority === 'P1' ? '#DE350B' : '#E97F0A' }}>
                              [{inc.priority}] {inc.id}
                            </span>
                            <div style={{ color: '#101828' }}>{inc.desc}</div>
                          </div>
                          <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary, #475467)' }}>
                            {inc.tower}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search Entities Links */}
                  {msg.entities && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {msg.entities.map((ent, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            navigate(ent.path);
                            setIsOpen(false);
                          }}
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            background: 'var(--bg-secondary, #F8FAFC)',
                            border: '1px solid var(--border, #E4E7EC)',
                            borderRadius: 6,
                            fontSize: '0.6875rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <strong>{ent.title}</strong>
                            <div style={{ color: 'var(--text-secondary, #475467)' }}>{ent.subtitle}</div>
                          </div>
                          <ArrowRight size={12} color="#074A76" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Action Link Button */}
                  {msg.navigatePath && (
                    <button
                      onClick={() => {
                        navigate(msg.navigatePath!);
                        setIsOpen(false);
                      }}
                      style={{
                        marginTop: 8,
                        padding: '6px 12px',
                        borderRadius: 6,
                        background: 'var(--ncgr-deep-blue, #074A76)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        width: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      <span>{msg.navigateLabel || (isRtl ? 'فتح في المنظومة' : 'Navigate')}</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '0.625rem',
                    color: 'var(--text-tertiary, #98A2B3)',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    padding: '0 4px',
                  }}
                >
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '8px 12px',
                  borderRadius: '12px 12px 12px 2px',
                  background: 'var(--card-bg, #FFFFFF)',
                  border: '1px solid var(--border, #E4E7EC)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary, #475467)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#074A76', animation: 'pulse 1s infinite' }} />
                <span>{isRtl ? 'جاري التحليل واستخراج البيانات...' : 'Analyzing telemetry data...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div
            style={{
              padding: '6px 12px',
              background: 'var(--card-bg, #FFFFFF)',
              borderTop: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {currentPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 12,
                  background: 'var(--bg-secondary, #F1F5F9)',
                  border: '1px solid var(--border, #E4E7EC)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary, #475467)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '10px 14px',
              background: 'var(--card-bg, #FFFFFF)',
              borderTop: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <input
              type="text"
              placeholder={isRtl ? 'اسأل عن الموظفين، الحوادث، التقويم، التقارير...' : 'Ask about absentees, incidents, calendar, reports...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid var(--border, #D0D5DD)',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: '0.8125rem',
                outline: 'none',
                background: 'var(--input-bg, #F8FAFC)',
                color: 'var(--text, #101828)',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: input.trim() ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F1F5F9)',
                color: input.trim() ? '#FFFFFF' : 'var(--text-tertiary, #98A2B3)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
