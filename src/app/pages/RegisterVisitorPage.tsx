import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockEmployees } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

export function RegisterVisitorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    visitPurpose: '',
    hostEmployee: '',
    visitDate: '',
    visitTime: '',
    documentType: '',
    documentNumber: '',
    badgeNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register visitor:', formData);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация посетителя</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">ФИО посетителя *</Label>
                <Input
                  id="fullName"
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Организация *</Label>
                <Input
                  id="company"
                  placeholder="ООО «Название компании»"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitPurpose">Цель визита *</Label>
              <Textarea
                id="visitPurpose"
                placeholder="Деловая встреча, переговоры..."
                value={formData.visitPurpose}
                onChange={(e) => setFormData({ ...formData, visitPurpose: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostEmployee">К кому *</Label>
              <Select
                value={formData.hostEmployee}
                onValueChange={(value) => setFormData({ ...formData, hostEmployee: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.name}>
                      {employee.name} — {employee.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Дата визита *</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitTime">Время визита *</Label>
                <Input
                  id="visitTime"
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="documentType">Тип документа *</Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) => setFormData({ ...formData, documentType: value })}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Выберите тип документа" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Паспорт РФ</SelectItem>
                    <SelectItem value="foreign_passport">Загранпаспорт</SelectItem>
                    <SelectItem value="driver_license">Водительское удостоверение</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentNumber">Номер документа *</Label>
                <Input
                  id="documentNumber"
                  placeholder="0000 000000"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="badgeNumber">Пропуск №</Label>
              <Input
                id="badgeNumber"
                placeholder="B-0000"
                value={formData.badgeNumber}
                onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                className="h-11 max-w-xs"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                type="submit" 
                className="bg-[#2D9CDB] hover:bg-[#2589c4] h-11 px-8"
              >
                Зарегистрировать
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                className="h-11 px-8"
              >
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
