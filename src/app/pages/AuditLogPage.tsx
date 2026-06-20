import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon, Download } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../components/ui/popover'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'
import { mockAuditLogs } from '../data/mockData'
import type { AuditAction } from '../types/visitor'

export function AuditLogPage() {
	const [auditLogs] = useState(mockAuditLogs)
	const [dateFrom, setDateFrom] = useState<Date>()
	const [dateTo, setDateTo] = useState<Date>()

	const getActionBadge = (action: AuditAction) => {
		const variants = {
			CREATE: 'bg-blue-100 text-blue-800 border-blue-300',
			UPDATE: 'bg-amber-100 text-amber-800 border-amber-300',
			DELETE: 'bg-red-100 text-red-800 border-red-300',
			CHECKIN: 'bg-green-100 text-green-800 border-green-300',
			LOGOUT: 'bg-gray-100 text-gray-800 border-gray-300',
		}
		return variants[action]
	}

	const handleExport = () => {
		console.log('Exporting to Excel...')
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#1E2A4A]'>
						Журнал аудита
					</h1>
					<p className='text-muted-foreground mt-1'>
						История действий пользователей
					</p>
				</div>
				<Button
					onClick={handleExport}
					className='bg-[#2D9CDB] hover:bg-[#2589c4]'
				>
					<Download className='w-4 h-4 mr-2' />
					Экспорт в Excel
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle>Фильтр по дате</CardTitle>
						<div className='flex gap-4'>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className='w-[200px] justify-start text-left'
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{dateFrom
											? format(dateFrom, 'dd.MM.yyyy', { locale: ru })
											: 'От'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={dateFrom}
										onSelect={setDateFrom}
									/>
								</PopoverContent>
							</Popover>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className='w-[200px] justify-start text-left'
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{dateTo
											? format(dateTo, 'dd.MM.yyyy', { locale: ru })
											: 'До'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={dateTo}
										onSelect={setDateTo}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Дата/время</TableHead>
								<TableHead>Пользователь</TableHead>
								<TableHead>Действие</TableHead>
								<TableHead>Сущность</TableHead>
								<TableHead>Описание</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{auditLogs.map(log => (
								<TableRow key={log.id} className='hover:bg-muted/50'>
									<TableCell className='font-medium'>{log.timestamp}</TableCell>
									<TableCell>{log.user}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={getActionBadge(log.action)}
										>
											{log.action}
										</Badge>
									</TableCell>
									<TableCell>{log.entity}</TableCell>
									<TableCell className='max-w-md'>{log.description}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
