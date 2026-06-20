import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'
import { mockEmployees } from '../data/mockData'
import type { Employee } from '../types/visitor'

export function EmployeesPage() {
	const [employees] = useState(mockEmployees)
	const [searchQuery, setSearchQuery] = useState('')
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
	const [formData, setFormData] = useState({
		name: '',
		position: '',
		department: '',
		email: '',
		phone: '',
		status: 'active' as 'active' | 'inactive',
	})

	const filteredEmployees = employees.filter(emp =>
		emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const handleEdit = (employee: Employee) => {
		setEditingEmployee(employee)
		setFormData({
			name: employee.name,
			position: employee.position,
			department: employee.department,
			email: employee.email,
			phone: employee.phone,
			status: employee.status,
		})
		setIsDialogOpen(true)
	}

	const handleAdd = () => {
		setEditingEmployee(null)
		setFormData({
			name: '',
			position: '',
			department: '',
			email: '',
			phone: '',
			status: 'active',
		})
		setIsDialogOpen(true)
	}

	const handleSave = () => {
		console.log('Saving employee:', formData)
		setIsDialogOpen(false)
	}

	const handleDelete = (id: string) => {
		console.log('Deleting employee:', id)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#1E2A4A]'>Сотрудники</h1>
					<p className='text-muted-foreground mt-1'>
						Управление базой сотрудников
					</p>
				</div>
				<Button onClick={handleAdd} className='bg-[#2D9CDB] hover:bg-[#2589c4]'>
					<Plus className='w-4 h-4 mr-2' />
					Добавить сотрудника
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className='flex items-center gap-4'>
						<div className='relative flex-1 max-w-md'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
							<Input
								placeholder='Поиск по имени...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='pl-10'
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ФИО</TableHead>
								<TableHead>Должность</TableHead>
								<TableHead>Отдел</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Телефон</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead className='text-right'>Действия</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredEmployees.map(employee => (
								<TableRow key={employee.id} className='hover:bg-muted/50'>
									<TableCell className='font-medium'>{employee.name}</TableCell>
									<TableCell>{employee.position}</TableCell>
									<TableCell>{employee.department}</TableCell>
									<TableCell>{employee.email}</TableCell>
									<TableCell>{employee.phone}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={
												employee.status === 'active'
													? 'bg-green-100 text-green-800 border-green-300'
													: 'bg-gray-100 text-gray-800 border-gray-300'
											}
										>
											{employee.status === 'active' ? 'Активен' : 'Неактивен'}
										</Badge>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex items-center justify-end gap-2'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleEdit(employee)}
											>
												<Edit className='w-4 h-4' />
											</Button>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleDelete(employee.id)}
												className='text-red-600 hover:text-red-700 hover:bg-red-50'
											>
												<Trash2 className='w-4 h-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className='max-w-2xl'>
					<DialogHeader>
						<DialogTitle>
							{editingEmployee
								? 'Редактировать сотрудника'
								: 'Добавить сотрудника'}
						</DialogTitle>
						<DialogDescription>
							Заполните информацию о сотруднике
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>ФИО</Label>
							<Input
								id='name'
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder='Иванов Иван Иванович'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='position'>Должность</Label>
								<Input
									id='position'
									value={formData.position}
									onChange={e =>
										setFormData({ ...formData, position: e.target.value })
									}
									placeholder='Менеджер'
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='department'>Отдел</Label>
								<Input
									id='department'
									value={formData.department}
									onChange={e =>
										setFormData({ ...formData, department: e.target.value })
									}
									placeholder='Отдел продаж'
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									value={formData.email}
									onChange={e =>
										setFormData({ ...formData, email: e.target.value })
									}
									placeholder='email@company.ru'
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='phone'>Телефон</Label>
								<Input
									id='phone'
									value={formData.phone}
									onChange={e =>
										setFormData({ ...formData, phone: e.target.value })
									}
									placeholder='+7 (495) 123-45-67'
								/>
							</div>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='status'>Статус</Label>
							<Select
								value={formData.status}
								onValueChange={(value: 'active' | 'inactive') =>
									setFormData({ ...formData, status: value })
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='active'>Активен</SelectItem>
									<SelectItem value='inactive'>Неактивен</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
							Отмена
						</Button>
						<Button
							onClick={handleSave}
							className='bg-[#2D9CDB] hover:bg-[#2589c4]'
						>
							Сохранить
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
