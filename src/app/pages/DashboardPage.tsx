import {
	CheckCircle,
	Clock,
	Eye,
	Plus,
	UserCheck,
	UserX,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'
import { mockVisitors } from '../data/mockData'
import type { VisitorStatus } from '../types/visitor'

export function DashboardPage() {
	const navigate = useNavigate()
	const [visitors] = useState(mockVisitors)

	const expectedCount = visitors.filter(v => v.status === 'ожидается').length
	const arrivedCount = visitors.filter(v => v.status === 'прибыл').length
	const leftCount = visitors.filter(v => v.status === 'убыл').length

	const getStatusBadge = (status: VisitorStatus) => {
		const variants = {
			ожидается: 'bg-yellow-100 text-yellow-800 border-yellow-300',
			прибыл: 'bg-green-100 text-green-800 border-green-300',
			убыл: 'bg-gray-100 text-gray-800 border-gray-300',
		}
		return variants[status]
	}

	const handleCheckIn = (id: string) => {
		console.log('Check in visitor:', id)
	}

	const handleCheckOut = (id: string) => {
		console.log('Check out visitor:', id)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#1E2A4A]'>Посетители</h1>
					<p className='text-muted-foreground mt-1'>Сегодня, 29 мая 2026</p>
				</div>
				<Button
					onClick={() => navigate('/register')}
					className='bg-[#2D9CDB] hover:bg-[#2589c4]'
				>
					<Plus className='w-4 h-4 mr-2' />
					Зарегистрировать посетителя
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<Card className='border-l-4 border-l-yellow-400'>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>
							Ожидаются сегодня
						</CardTitle>
						<Clock className='w-5 h-5 text-yellow-600' />
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold text-[#1E2A4A]'>
							{expectedCount}
						</div>
					</CardContent>
				</Card>

				<Card className='border-l-4 border-l-green-400'>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>
							Уже прибыли
						</CardTitle>
						<UserCheck className='w-5 h-5 text-green-600' />
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold text-[#1E2A4A]'>
							{arrivedCount}
						</div>
					</CardContent>
				</Card>

				<Card className='border-l-4 border-l-gray-400'>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>
							Покинули офис
						</CardTitle>
						<UserX className='w-5 h-5 text-gray-600' />
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold text-[#1E2A4A]'>{leftCount}</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Посетители на сегодня</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ФИО</TableHead>
								<TableHead>Компания</TableHead>
								<TableHead>К кому идёт</TableHead>
								<TableHead>Время визита</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead className='text-right'>Действия</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{visitors.map(visitor => (
								<TableRow key={visitor.id} className='hover:bg-muted/50'>
									<TableCell className='font-medium'>
										{visitor.fullName}
									</TableCell>
									<TableCell>{visitor.company}</TableCell>
									<TableCell>{visitor.hostEmployee}</TableCell>
									<TableCell>{visitor.visitTime}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={getStatusBadge(visitor.status)}
										>
											{visitor.status}
										</Badge>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex items-center justify-end gap-2'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => navigate(`/visitor/${visitor.id}`)}
											>
												<Eye className='w-4 h-4' />
											</Button>
											{visitor.status === 'ожидается' && (
												<Button
													variant='ghost'
													size='sm'
													onClick={() => handleCheckIn(visitor.id)}
													className='text-green-600 hover:text-green-700 hover:bg-green-50'
												>
													<CheckCircle className='w-4 h-4' />
												</Button>
											)}
											{visitor.status === 'прибыл' && (
												<Button
													variant='ghost'
													size='sm'
													onClick={() => handleCheckOut(visitor.id)}
													className='text-gray-600 hover:text-gray-700 hover:bg-gray-50'
												>
													<XCircle className='w-4 h-4' />
												</Button>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
