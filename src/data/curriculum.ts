/**
 * Learning & Certification Curriculum Data
 * Training Catalogue, Employee Learning Progress
 */

export type TrainingCategory = 'Normal Training' | 'Offline Training' | 'Webinar' | 'Workshop' | 'Classroom Training' | 'Site Visit Training';
export type DeliveryMode = 'Virtual' | 'In Person';
export type TrainingLocation = 'Within KSA' | 'Outside KSA';
export type CertificationType = 'Core Technical' | 'Soft Skill' | 'Emerging Tech';
export type ProficiencyStage = 'Beginner' | 'Mid-Level' | 'Expert';

export interface TrainingCatalogueRecord {
  id: string;
  trainingName: string;
  category: TrainingCategory;
  deliveryMode: DeliveryMode;
  location: TrainingLocation;
  duration: number;
  /** Business rule: Site Visit → Days, all others → Hours */
  durationUnit: 'Hours' | 'Days';
  certification: string;
  certificationType: CertificationType;
  proficiencyStage: ProficiencyStage;
  provider: string;
  status: 'Available' | 'In Progress' | 'Completed' | 'Upcoming';
}

export interface EmployeeLearningProgress {
  employeeId: string;
  employeeName: string;
  role: string;
  originalLevel: string;
  currentLevel: string;
  onboardingDate: string;
  trainingHoursCompleted: number;
  certificationsCompleted: number;
  currentProficiency: ProficiencyStage;
  tower: string;
  expatLocal: 'Local' | 'Expat';
  gender: 'Male' | 'Female';
}

// ─── TRAINING CATALOGUE (25+ entries) ─────────────────────────
export const trainingCatalogue: TrainingCatalogueRecord[] = [
  { id: 'CUR-001', trainingName: 'ITIL 4 Foundation & Managing Professional', category: 'Classroom Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 40, durationUnit: 'Hours', certification: 'ITIL 4 MP Certified', certificationType: 'Core Technical', proficiencyStage: 'Beginner', provider: 'Axelos Accredited Partner', status: 'Available' },
  { id: 'CUR-002', trainingName: 'AWS Solutions Architect Professional', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 60, durationUnit: 'Hours', certification: 'AWS SAP Certified', certificationType: 'Core Technical', proficiencyStage: 'Expert', provider: 'AWS Training Partner', status: 'In Progress' },
  { id: 'CUR-003', trainingName: 'Microsoft Azure Administrator (AZ-104)', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 32, durationUnit: 'Hours', certification: 'Azure Administrator Associate', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Microsoft Learning Partner', status: 'Available' },
  { id: 'CUR-004', trainingName: 'CISSP Security Professional', category: 'Classroom Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 48, durationUnit: 'Hours', certification: 'CISSP Certified', certificationType: 'Core Technical', proficiencyStage: 'Expert', provider: 'ISC² Partner', status: 'Upcoming' },
  { id: 'CUR-005', trainingName: 'ServiceNow Certified System Administrator', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 24, durationUnit: 'Hours', certification: 'ServiceNow CSA', certificationType: 'Core Technical', proficiencyStage: 'Beginner', provider: 'ServiceNow Academy', status: 'Completed' },
  { id: 'CUR-006', trainingName: 'PMP Project Management Professional', category: 'Classroom Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 35, durationUnit: 'Hours', certification: 'PMP Certified', certificationType: 'Soft Skill', proficiencyStage: 'Mid-Level', provider: 'PMI REP Partner', status: 'Available' },
  { id: 'CUR-007', trainingName: 'Kubernetes Administrator (CKA)', category: 'Workshop', deliveryMode: 'In Person', location: 'Within KSA', duration: 24, durationUnit: 'Hours', certification: 'CKA Certified', certificationType: 'Emerging Tech', proficiencyStage: 'Mid-Level', provider: 'CNCF Training Partner', status: 'In Progress' },
  { id: 'CUR-008', trainingName: 'Data Center Site Visit — Riyadh Primary', category: 'Site Visit Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 3, durationUnit: 'Days', certification: 'DC Operations Familiarization', certificationType: 'Core Technical', proficiencyStage: 'Beginner', provider: 'Internal — NCGR', status: 'Completed' },
  { id: 'CUR-009', trainingName: 'Leadership & Team Management', category: 'Workshop', deliveryMode: 'In Person', location: 'Within KSA', duration: 16, durationUnit: 'Hours', certification: 'Leadership Excellence', certificationType: 'Soft Skill', proficiencyStage: 'Mid-Level', provider: 'Dale Carnegie KSA', status: 'Available' },
  { id: 'CUR-010', trainingName: 'AI/ML Operations & MLOps Fundamentals', category: 'Webinar', deliveryMode: 'Virtual', location: 'Within KSA', duration: 12, durationUnit: 'Hours', certification: 'MLOps Foundation', certificationType: 'Emerging Tech', proficiencyStage: 'Beginner', provider: 'Google Cloud Training', status: 'Upcoming' },
  { id: 'CUR-011', trainingName: 'Oracle Database Administration', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 40, durationUnit: 'Hours', certification: 'Oracle DBA OCP', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Oracle University', status: 'Available' },
  { id: 'CUR-012', trainingName: 'SolarWinds Network Performance Monitor', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 16, durationUnit: 'Hours', certification: 'SolarWinds SCP', certificationType: 'Core Technical', proficiencyStage: 'Beginner', provider: 'SolarWinds Academy', status: 'Completed' },
  { id: 'CUR-013', trainingName: 'DR Site Visit — Jeddah Secondary', category: 'Site Visit Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 2, durationUnit: 'Days', certification: 'DR Familiarization', certificationType: 'Core Technical', proficiencyStage: 'Beginner', provider: 'Internal — NCGR', status: 'Available' },
  { id: 'CUR-014', trainingName: 'DevOps Engineering with Ansible & Terraform', category: 'Workshop', deliveryMode: 'In Person', location: 'Within KSA', duration: 24, durationUnit: 'Hours', certification: 'HashiCorp Terraform Associate', certificationType: 'Emerging Tech', proficiencyStage: 'Mid-Level', provider: 'HashiCorp Partner', status: 'In Progress' },
  { id: 'CUR-015', trainingName: 'Communication & Presentation Skills', category: 'Offline Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 8, durationUnit: 'Hours', certification: 'Communication Excellence', certificationType: 'Soft Skill', proficiencyStage: 'Beginner', provider: 'Internal — NCGR HR', status: 'Completed' },
  { id: 'CUR-016', trainingName: 'Splunk Enterprise Administration', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 24, durationUnit: 'Hours', certification: 'Splunk Enterprise Certified Admin', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Splunk Education', status: 'Available' },
  { id: 'CUR-017', trainingName: 'GCP Professional Cloud Architect', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 48, durationUnit: 'Hours', certification: 'GCP PCA Certified', certificationType: 'Core Technical', proficiencyStage: 'Expert', provider: 'Google Cloud Training', status: 'Upcoming' },
  { id: 'CUR-018', trainingName: 'Cybersecurity Awareness for IT Staff', category: 'Webinar', deliveryMode: 'Virtual', location: 'Within KSA', duration: 4, durationUnit: 'Hours', certification: 'Security Awareness Certificate', certificationType: 'Soft Skill', proficiencyStage: 'Beginner', provider: 'Internal — Security Team', status: 'Completed' },
  { id: 'CUR-019', trainingName: 'VMware vSphere Administration', category: 'Classroom Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 40, durationUnit: 'Hours', certification: 'VCP-DCV Certified', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'VMware VATC', status: 'Available' },
  { id: 'CUR-020', trainingName: 'SAP Basis Administration Advanced', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Outside KSA', duration: 32, durationUnit: 'Hours', certification: 'SAP Certified Technology Associate', certificationType: 'Core Technical', proficiencyStage: 'Expert', provider: 'SAP Training Hub', status: 'In Progress' },
  { id: 'CUR-021', trainingName: 'Vendor Site Visit — Gulf Technology Services', category: 'Site Visit Training', deliveryMode: 'In Person', location: 'Outside KSA', duration: 5, durationUnit: 'Days', certification: 'Vendor Operations Certificate', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Gulf Technology Services', status: 'Upcoming' },
  { id: 'CUR-022', trainingName: 'Agile & Scrum Master Certification', category: 'Workshop', deliveryMode: 'In Person', location: 'Within KSA', duration: 16, durationUnit: 'Hours', certification: 'PSM I Certified', certificationType: 'Soft Skill', proficiencyStage: 'Mid-Level', provider: 'Scrum.org Partner', status: 'Available' },
  { id: 'CUR-023', trainingName: 'Network Security & Firewall Management', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 24, durationUnit: 'Hours', certification: 'Fortinet NSE 4', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Fortinet Academy', status: 'Available' },
  { id: 'CUR-024', trainingName: 'Microsoft 365 Administration', category: 'Normal Training', deliveryMode: 'Virtual', location: 'Within KSA', duration: 32, durationUnit: 'Hours', certification: 'MS-102 Admin Certified', certificationType: 'Core Technical', proficiencyStage: 'Mid-Level', provider: 'Microsoft Learning', status: 'Completed' },
  { id: 'CUR-025', trainingName: 'IoT & Edge Computing Fundamentals', category: 'Webinar', deliveryMode: 'Virtual', location: 'Within KSA', duration: 8, durationUnit: 'Hours', certification: 'IoT Foundation', certificationType: 'Emerging Tech', proficiencyStage: 'Beginner', provider: 'Coursera Enterprise', status: 'Upcoming' },
  { id: 'CUR-026', trainingName: 'Change Management & ADKAR Workshop', category: 'Offline Training', deliveryMode: 'In Person', location: 'Within KSA', duration: 12, durationUnit: 'Hours', certification: 'Prosci Change Practitioner', certificationType: 'Soft Skill', proficiencyStage: 'Mid-Level', provider: 'Prosci KSA', status: 'Available' },
];

// ─── EMPLOYEE LEARNING PROGRESS (derived from master employees) ─
export const employeeLearningProgress: EmployeeLearningProgress[] = [
  { employeeId: 'NCGR-1001', employeeName: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', originalLevel: 'SME/Manager', currentLevel: 'SME/Manager', onboardingDate: '2022-03-15', trainingHoursCompleted: 120, certificationsCompleted: 5, currentProficiency: 'Expert', tower: 'Service Desk', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1002', employeeName: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', originalLevel: 'L4', currentLevel: 'L4', onboardingDate: '2022-05-01', trainingHoursCompleted: 96, certificationsCompleted: 4, currentProficiency: 'Expert', tower: 'Infrastructure', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1004', employeeName: 'Sara Al-Otaibi', role: 'Application Support Lead', originalLevel: 'L4', currentLevel: 'L4', onboardingDate: '2023-01-15', trainingHoursCompleted: 72, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Applications', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1005', employeeName: 'Khalid Al-Shammari', role: 'NOC Senior Engineer', originalLevel: 'L3', currentLevel: 'L3', onboardingDate: '2023-03-20', trainingHoursCompleted: 64, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Network', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1006', employeeName: 'Priya Nair', role: 'Cloud Engineer', originalLevel: 'L2', currentLevel: 'L3', onboardingDate: '2023-04-12', trainingHoursCompleted: 88, certificationsCompleted: 4, currentProficiency: 'Mid-Level', tower: 'Cloud', expatLocal: 'Expat', gender: 'Female' },
  { employeeId: 'NCGR-1007', employeeName: 'Omar Al-Mutairi', role: 'Database Administrator', originalLevel: 'L1', currentLevel: 'L2', onboardingDate: '2022-09-01', trainingHoursCompleted: 56, certificationsCompleted: 2, currentProficiency: 'Mid-Level', tower: 'Database', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1008', employeeName: 'Aisha Rahman', role: 'Service Desk Lead', originalLevel: 'L4', currentLevel: 'L4', onboardingDate: '2023-02-01', trainingHoursCompleted: 80, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Service Desk', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1009', employeeName: 'Arjun Menon', role: 'Automation Engineer', originalLevel: 'L2', currentLevel: 'L2', onboardingDate: '2023-07-15', trainingHoursCompleted: 48, certificationsCompleted: 2, currentProficiency: 'Mid-Level', tower: 'Applications', expatLocal: 'Expat', gender: 'Male' },
  { employeeId: 'NCGR-1010', employeeName: 'Noura Al-Qahtani', role: 'Program Manager', originalLevel: 'SME/Manager', currentLevel: 'SME/Manager', onboardingDate: '2022-01-10', trainingHoursCompleted: 104, certificationsCompleted: 4, currentProficiency: 'Expert', tower: 'Service Desk', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1011', employeeName: 'Rakesh Kumar', role: 'Infrastructure Engineer', originalLevel: 'L2', currentLevel: 'L2', onboardingDate: '2023-05-18', trainingHoursCompleted: 40, certificationsCompleted: 2, currentProficiency: 'Mid-Level', tower: 'Infrastructure', expatLocal: 'Expat', gender: 'Male' },
  { employeeId: 'NCGR-1012', employeeName: 'Layla Hassan', role: 'Digital Workplace Engineer', originalLevel: 'L2', currentLevel: 'L2', onboardingDate: '2023-08-01', trainingHoursCompleted: 32, certificationsCompleted: 2, currentProficiency: 'Beginner', tower: 'Digital Workplace', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1013', employeeName: 'Daniel Mathew', role: 'Security Engineer', originalLevel: 'L2', currentLevel: 'L3', onboardingDate: '2023-06-01', trainingHoursCompleted: 72, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Security', expatLocal: 'Expat', gender: 'Male' },
  { employeeId: 'NCGR-1014', employeeName: 'Huda Al-Salem', role: 'Change Manager', originalLevel: 'SME/Manager', currentLevel: 'SME/Manager', onboardingDate: '2022-11-15', trainingHoursCompleted: 88, certificationsCompleted: 3, currentProficiency: 'Expert', tower: 'Service Desk', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1015', employeeName: 'Vivek Srinivasan', role: 'PMO Analyst', originalLevel: 'L1', currentLevel: 'L1', onboardingDate: '2023-09-01', trainingHoursCompleted: 24, certificationsCompleted: 1, currentProficiency: 'Beginner', tower: 'Service Desk', expatLocal: 'Expat', gender: 'Male' },
  { employeeId: 'NCGR-1016', employeeName: 'Fahad Al-Harbi', role: 'Infrastructure Senior Engineer', originalLevel: 'L3', currentLevel: 'L3', onboardingDate: '2022-08-01', trainingHoursCompleted: 64, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Infrastructure', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1020', employeeName: 'Sultan Al-Malki', role: 'Infrastructure Engineer', originalLevel: 'L2', currentLevel: 'L2', onboardingDate: '2023-06-15', trainingHoursCompleted: 36, certificationsCompleted: 1, currentProficiency: 'Beginner', tower: 'Infrastructure', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1025', employeeName: 'Turki Al-Zahrani', role: 'Network Engineer', originalLevel: 'L2', currentLevel: 'L2', onboardingDate: '2023-10-01', trainingHoursCompleted: 28, certificationsCompleted: 1, currentProficiency: 'Beginner', tower: 'Network', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1030', employeeName: 'Reem Al-Qahtani', role: 'Service Desk Analyst', originalLevel: 'L1', currentLevel: 'L1', onboardingDate: '2024-01-15', trainingHoursCompleted: 16, certificationsCompleted: 1, currentProficiency: 'Beginner', tower: 'Service Desk', expatLocal: 'Local', gender: 'Female' },
  { employeeId: 'NCGR-1035', employeeName: 'Abdulaziz Al-Rashidi', role: 'SAP Specialist', originalLevel: 'L3', currentLevel: 'L3', onboardingDate: '2023-04-01', trainingHoursCompleted: 56, certificationsCompleted: 2, currentProficiency: 'Mid-Level', tower: 'SAP', expatLocal: 'Local', gender: 'Male' },
  { employeeId: 'NCGR-1040', employeeName: 'Sneha Sharma', role: 'Cloud Specialist', originalLevel: 'L3', currentLevel: 'L3', onboardingDate: '2023-07-01', trainingHoursCompleted: 60, certificationsCompleted: 3, currentProficiency: 'Mid-Level', tower: 'Cloud', expatLocal: 'Expat', gender: 'Female' },
];

// ─── CURRICULUM STATS ─────────────────────────────────────────
export function getCurriculumStats() {
  const totalCourses = trainingCatalogue.length;
  const activeTraining = trainingCatalogue.filter(t => t.status === 'In Progress').length;
  const certificationsAvailable = new Set(trainingCatalogue.map(t => t.certification)).size;
  const employeesInDevelopment = employeeLearningProgress.length;
  const beginnerCount = employeeLearningProgress.filter(e => e.currentProficiency === 'Beginner').length;
  const midLevelCount = employeeLearningProgress.filter(e => e.currentProficiency === 'Mid-Level').length;
  const expertCount = employeeLearningProgress.filter(e => e.currentProficiency === 'Expert').length;

  return { totalCourses, activeTraining, certificationsAvailable, employeesInDevelopment, beginnerCount, midLevelCount, expertCount };
}
