import { Calendar, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import type { VisitorStatus } from '../types/visitor'

interface EmployeeVisit {
	id: string
	visitorName: string
	visitorCompany: string
	purpose: string
	dateTime: string
	status: VisitorStatus
}

const upcomingVisits: EmployeeVisit[] = [
	{
		id: '1',
		visitorName: 'Соколова Анна Викторовна',
		visitorCompany: 'АО "СтройИнвест"',
		purpose: 'Презентация проекта',
		dateTime: '2026-05-29 11:30',
		status: 'ожидается',
	},
	{
		id: '2',
		visitorName: 'Новиков Сергей Павлович',
		visitorCompany: 'ООО "БизнесКонсалт"',
		purpose: 'Консультация',
		dateTime: '2026-05-29 14:00',
		status: 'ожидается',
	},
	{
		id: '3',
		visitorName: 'Кузнецова Татьяна Олеговна',
		visitorCompany: 'ООО "ГлобалТех"',
		purpose: 'Техническое обслуживание',
		dateTime: '2026-05-29 15:30',
		status: 'ожидается',
	},
]

const pastVisits: EmployeeVisit[] = [
	{
		id: '4',
		visitorName: 'Волков Игорь Александрович',
		visitorCompany: 'ООО "ТехСтрой"',
		purpose: 'Переговоры по контракту',
		dateTime: '2026-05-28 10:00',
		status: 'убыл',
	},
	{
		id: '5',
		visitorName: 'Федоров Михаил Иванович',
		visitorCompany: 'ИП Федоров М.И.',
		purpose: 'Подписание документов',
		dateTime: '2026-05-27 09:00',
		status: 'убыл',
	},
]

export function MyVisitsPage() {
	const [activeTab, setActiveTab] = useState('upcoming')

	const getStatusBadge = (status: VisitorStatus) => {
		const variants = {
			ожидается: 'bg-yellow-100 text-yellow-800 border-yellow-300',
			прибыл: 'bg-green-100 text-green-800 border-green-300',
			убыл: 'bg-gray-100 text-gray-800 border-gray-300',
		}
		return variants[status]
	}

	const renderEmptyState = () => (
		<div className='flex flex-col items-center justify-center py-12 text-center'>
			<div className='rounded-full bg-muted p-6 mb-4'>
				<Users className='w-12 h-12 text-muted-foreground' />
			</div>
			<h3 className='text-lg font-semibold text-[#1E2A4A] mb-2'>Нет визитов</h3>
			<p className='text-muted-foreground'>
				{activeTab === 'upcoming'
					? 'У вас нет запланированных визитов'
					: 'История визитов пуста'}
			</p>
		</div>
	)

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-semibold text-[#1E2A4A]'>Мои визиты</h1>
				<p className='text-muted-foreground mt-1'>
					Посетители, которые приходят к вам
				</p>
			</div>

			<Card>
				<CardHeader>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className='grid w-full max-w-md grid-cols-2'>
							<TabsTrigger value='upcoming'>Предстоящие</TabsTrigger>
							<TabsTrigger value='past'>Прошедшие</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab}>
						<TabsContent value='upcoming'>
							{upcomingVisits.length === 0 ? (
								renderEmptyState()
							) : (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Посетитель</TableHead>
											<TableHead>Организация</TableHead>
											<TableHead>Цель визита</TableHead>
											<TableHead>Дата/время</TableHead>
											<TableHead>Статус</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{upcomingVisits.map(visit => (
											<TableRow key={visit.id} className='hover:bg-muted/50'>
												<TableCell className='font-medium'>
													{visit.visitorName}
												</TableCell>
												<TableCell>{visit.visitorCompany}</TableCell>
												<TableCell>{visit.purpose}</TableCell>
												<TableCell>
													<div className='flex items-center gap-2'>
														<Calendar className='w-4 h-4 text-muted-foreground' />
														{visit.dateTime}
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant='outline'
														className={getStatusBadge(visit.status)}
													>
														{visit.status}
													</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</TabsContent>
						<TabsContent value='past'>
							{pastVisits.length === 0 ? (
								renderEmptyState()
							) : (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Посетитель</TableHead>
											<TableHead>Организация</TableHead>
											<TableHead>Цель визита</TableHead>
											<TableHead>Дата/время</TableHead>
											<TableHead>Статус</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{pastVisits.map(visit => (
											<TableRow key={visit.id} className='hover:bg-muted/50'>
												<TableCell className='font-medium'>
													{visit.visitorName}
												</TableCell>
												<TableCell>{visit.visitorCompany}</TableCell>
												<TableCell>{visit.purpose}</TableCell>
												<TableCell>
													<div className='flex items-center gap-2'>
														<Calendar className='w-4 h-4 text-muted-foreground' />
														{visit.dateTime}
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant='outline'
														className={getStatusBadge(visit.status)}
													>
														{visit.status}
													</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}
