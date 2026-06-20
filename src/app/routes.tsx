import { createBrowserRouter } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterVisitorPage } from './pages/RegisterVisitorPage';
import { VisitorDetailPage } from './pages/VisitorDetailPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { UsersPage } from './pages/UsersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MyVisitsPage } from './pages/MyVisitsPage';
import { AppLayout } from './components/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'register',
        element: <RegisterVisitorPage />,
      },
      {
        path: 'visitor/:id',
        element: <VisitorDetailPage />,
      },
      {
        path: 'employees',
        element: <EmployeesPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'audit',
        element: <AuditLogPage />,
      },
      {
        path: 'my-visits',
        element: <MyVisitsPage />,
      },
    ],
  },
]);
