import { ArrowLeft, Building2, Calendar, Clock, CreditCard, FileText, Printer, User } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { mockVisitors } from '../data/mockData'
import type { VisitorStatus } from '../types/visitor'

export function VisitorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const visitor = mockVisitors.find(v => v.id === id);

  if (!visitor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Посетитель не найден</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">
          Вернуться на главную
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: VisitorStatus) => {
    const variants = {
      'ожидается': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'прибыл': 'bg-green-100 text-green-800 border-green-300',
      'убыл': 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[status];
  };

  const handlePrintBadge = () => {
    console.log('Print badge for visitor:', visitor.id);
    alert('Печать пропуска...');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к списку
        </Button>
        <Button 
          onClick={handlePrintBadge}
          className="bg-[#2D9CDB] hover:bg-[#2589c4]"
        >
          <Printer className="w-4 h-4 mr-2" />
          Печать пропуска
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{visitor.fullName}</CardTitle>
              <p className="text-muted-foreground mt-1">{visitor.company}</p>
            </div>
            <Badge 
              variant="outline" 
              className={`${getStatusBadge(visitor.status)} text-sm px-4 py-1`}
            >
              {visitor.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Дата визита</p>
                  <p className="font-medium">
                    {new Date(visitor.visitDate).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Время визита</p>
                  <p className="font-medium">{visitor.visitTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">К кому</p>
                  <p className="font-medium">{visitor.hostEmployee}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Организация</p>
                  <p className="font-medium">{visitor.company}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Документ</p>
                  <p className="font-medium">{visitor.documentType}</p>
                  <p className="text-sm text-muted-foreground">{visitor.documentNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#2D9CDB] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Пропуск</p>
                  <p className="font-medium">{visitor.badgeNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Цель визита</p>
            <p className="font-medium">{visitor.visitPurpose}</p>
          </div>

          {(visitor.checkInTime || visitor.checkOutTime) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visitor.checkInTime && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Время прибытия</p>
                    <p className="text-lg font-semibold text-green-600">{visitor.checkInTime}</p>
                  </div>
                )}
                {visitor.checkOutTime && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Время убытия</p>
                    <p className="text-lg font-semibold text-gray-600">{visitor.checkOutTime}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div>
            <h3 className="font-semibold mb-4 text-[#1E2A4A]">История статусов</h3>
            <div className="space-y-3">
              {visitor.statusHistory.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 text-sm">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusBadge(entry.status)} w-28 justify-center`}
                  >
                    {entry.status}
                  </Badge>
                  <span className="text-muted-foreground">{entry.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
