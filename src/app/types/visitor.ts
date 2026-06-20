export type VisitorStatus = 'ожидается' | 'прибыл' | 'убыл';

export interface Visitor {
  id: string;
  fullName: string;
  company: string;
  visitPurpose: string;
  hostEmployee: string;
  visitDate: string;
  visitTime: string;
  documentType: string;
  documentNumber: string;
  badgeNumber: string;
  status: VisitorStatus;
  checkInTime?: string;
  checkOutTime?: string;
  statusHistory: {
    status: VisitorStatus;
    timestamp: string;
  }[];
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  login: string;
  employeeId: string;
  employeeName: string;
  role: 'Admin' | 'Operator' | 'Employee';
  lastLogin: string;
  status: 'active' | 'inactive';
}

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'CHECKIN' | 'LOGOUT';

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: AuditAction;
  entity: string;
  description: string;
}
