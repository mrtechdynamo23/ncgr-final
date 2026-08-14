/**
 * Service Requests — 50+ records
 */

export interface ServiceRequest {
  id: string;
  requestType: string;
  requestedBy: string;
  department: string;
  tower: string;
  service: string;
  catalogItem: string;
  assignmentGroup: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  submittedDate: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Fulfilled' | 'Closed' | 'Cancelled';
  assignedEngineer: string;
  aging: string;
  fulfillmentState: string;
  description: string;
}

const requestTypes = ['Access Request', 'Software Installation', 'Hardware Request', 'Account Management', 'Information Request', 'Service Change', 'New Service', 'Configuration Change'];
const catalogItems = ['AD Account Creation', 'Software License Allocation', 'Laptop Provisioning', 'VPN Access Setup', 'Email Distribution List', 'Shared Drive Access', 'Application Access', 'Mobile Device Enrollment', 'Printer Setup', 'Password Reset', 'Group Policy Change', 'Firewall Rule Request', 'SSL Certificate Request', 'Database Access', 'Cloud Resource Provisioning'];
const departments = ['IT Operations', 'Infrastructure', 'Applications', 'Service Management', 'Cyber Security', 'PMO', 'Enterprise Architecture', 'Digital Transformation', 'Finance', 'HR', 'Legal', 'Procurement'];
const twrs = ['Infrastructure', 'Network', 'Service Desk', 'Applications', 'SAP', 'Database', 'Cloud', 'Security', 'Digital Workplace'];
const requesters = ['Fahad Al-Ghamdi', 'Sultan Al-Malki', 'Turki Al-Zahrani', 'Abdulaziz Al-Rashidi', 'Nasser Al-Subaie', 'Majed Al-Enezi', 'Bandar Al-Dossary', 'Maha Al-Hajri', 'Reem Al-Khaldi', 'Dalal Al-Tamimi', 'Hanan Al-Juhani', 'Lama Al-Bogami', 'Abeer Al-Thani', 'Amira Al-Fadhli', 'Dina Al-Ahmadi'];
const engineers = ['Ahmed Al-Qahtani', 'Mohammed Al-Dosari', 'Sara Al-Otaibi', 'Khalid Al-Shammari', 'Priya Nair', 'Omar Al-Mutairi', 'Arjun Menon', 'Layla Hassan', 'Daniel Mathew', 'Rakesh Kumar', 'Aisha Rahman', 'Huda Al-Salem'];
const groups = ['Service Desk L1', 'Service Desk L2', 'Infrastructure Operations', 'Network Operations', 'Application Support', 'Cloud Operations', 'Security Operations', 'Database Operations', 'SAP Basis', 'Digital Workplace'];

function genServiceRequests(): ServiceRequest[] {
  const result: ServiceRequest[] = [];
  const statusArr: ServiceRequest['status'][] = ['Open', 'In Progress', 'Fulfilled', 'Closed', 'Cancelled'];
  const priorities: ServiceRequest['priority'][] = ['Low', 'Medium', 'Medium', 'High', 'Medium', 'Low', 'High', 'Medium', 'Critical', 'Low'];
  const fulfillmentStates = ['Pending Assignment', 'Work In Progress', 'Pending Approval', 'Pending Customer', 'Fulfilled', 'Closed Complete', 'Cancelled'];

  for (let i = 0; i < 55; i++) {
    const reqType = requestTypes[i % requestTypes.length];
    const catalog = catalogItems[i % catalogItems.length];
    const day = String(1 + (i % 12)).padStart(2, '0');
    const dueDay = String(10 + (i % 20)).padStart(2, '0');
    const status = statusArr[i % statusArr.length];

    result.push({
      id: `REQ00${10000 + i}`,
      requestType: reqType,
      requestedBy: requesters[i % requesters.length],
      department: departments[i % departments.length],
      tower: twrs[i % twrs.length],
      service: `${twrs[i % twrs.length]} Services`,
      catalogItem: catalog,
      assignmentGroup: groups[i % groups.length],
      priority: priorities[i % priorities.length],
      submittedDate: `2026-08-${day}`,
      dueDate: `2026-08-${dueDay}`,
      status,
      assignedEngineer: engineers[i % engineers.length],
      aging: `${i % 15 + 1} days`,
      fulfillmentState: status === 'Fulfilled' || status === 'Closed' ? fulfillmentStates[4 + (i % 2)] : fulfillmentStates[i % 4],
      description: `${reqType}: ${catalog} — Requested by ${requesters[i % requesters.length]} from ${departments[i % departments.length]} department`,
    });
  }

  return result;
}

export const serviceRequests: ServiceRequest[] = genServiceRequests();

export function getServiceRequestStats() {
  const total = serviceRequests.length;
  const open = serviceRequests.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
  const fulfilled = serviceRequests.filter(r => r.status === 'Fulfilled' || r.status === 'Closed').length;
  const cancelled = serviceRequests.filter(r => r.status === 'Cancelled').length;
  return { total, open, fulfilled, cancelled };
}
