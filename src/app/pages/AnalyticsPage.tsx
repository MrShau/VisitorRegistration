import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { CalendarIcon, TrendingUp, Users, Calendar as CalendarDays } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const weeklyData = [
  { day: 'Пн', visits: 12 },
  { day: 'Вт', visits: 15 },
  { day: 'Ср', visits: 8 },
  { day: 'Чт', visits: 18 },
  { day: 'Пт', visits: 14 },
  { day: 'Сб', visits: 3 },
  { day: 'Вс', visits: 2 },
];

const employeeData = [
  { name: 'Смирнова О.П.', value: 28, color: '#2D9CDB' },
  { name: 'Иванов Д.С.', value: 22, color: '#1E2A4A' },
  { name: 'Петрова М.А.', value: 18, color: '#60A5FA' },
  { name: 'Козлов А.В.', value: 15, color: '#93C5FD' },
  { name: 'Морозова Е.И.', value: 12, color: '#DBEAFE' },
];

const monthlyData = [
  { date: '01.05', visits: 8 },
  { date: '05.05', visits: 12 },
  { date: '10.05', visits: 15 },
  { date: '15.05', visits: 10 },
  { date: '20.05', visits: 18 },
  { date: '25.05', visits: 14 },
  { date: '29.05', visits: 16 },
];

export function AnalyticsPage() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const totalVisits = 93;
  const avgPerDay = 3.1;
  const peakDay = 'Четверг, 20 мая';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E2A4A]">Аналитика посещаемости</h1>
          <p className="text-muted-foreground mt-1">Статистика и отчеты по визитам</p>
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, 'dd.MM.yyyy', { locale: ru }) : 'От'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, 'dd.MM.yyyy', { locale: ru }) : 'До'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-[#2D9CDB]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего визитов
            </CardTitle>
            <Users className="w-5 h-5 text-[#2D9CDB]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E2A4A]">{totalVisits}</div>
            <p className="text-xs text-muted-foreground mt-1">За текущий месяц</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-400">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Среднее в день
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E2A4A]">{avgPerDay}</div>
            <p className="text-xs text-muted-foreground mt-1">Посетителей</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-400">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Пиковый день
            </CardTitle>
            <CalendarDays className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#1E2A4A]">{peakDay}</div>
            <p className="text-xs text-muted-foreground mt-1">18 визитов</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Посещаемость по дням недели</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#2D9CDB" name="Визиты" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ-5 принимающих сотрудников</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employeeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {employeeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Динамика визитов за месяц</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#2D9CDB"
                strokeWidth={2}
                name="Визиты"
                dot={{ fill: '#2D9CDB' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
