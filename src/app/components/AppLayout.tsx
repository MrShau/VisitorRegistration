import { Outlet, useNavigate, useLocation } from 'react-router';
import { Building2, LayoutDashboard, UserPlus, Users, FileText, BarChart3, ShieldCheck, Calendar, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Главная' },
    { path: '/register', icon: UserPlus, label: 'Регистрация' },
    { path: '/employees', icon: Users, label: 'Сотрудники' },
    { path: '/users', icon: ShieldCheck, label: 'Пользователи' },
    { path: '/analytics', icon: BarChart3, label: 'Аналитика' },
    { path: '/audit', icon: FileText, label: 'Журнал аудита' },
    { path: '/my-visits', icon: Calendar, label: 'Мои визиты' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E2A4A] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D9CDB] rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">Регистрация</h2>
              <p className="text-xs text-gray-300">Посетителей</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-[#2D9CDB] text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Выход
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
