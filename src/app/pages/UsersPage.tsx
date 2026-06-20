import { Edit, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
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
import { mockEmployees, mockUsers } from '../data/mockData'
import type { User } from '../types/visitor'

export function UsersPage() {
	const [users] = useState(mockUsers)
	const [roleFilter, setRoleFilter] = useState<string>('all')
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [formData, setFormData] = useState({
		login: '',
		employeeId: '',
		role: 'Employee' as 'Admin' | 'Operator' | 'Employee',
		password: '',
		status: 'active' as 'active' | 'inactive',
	})

	const filteredUsers =
		roleFilter === 'all'
			? users
			: users.filter(user => user.role === roleFilter)

	const getRoleBadge = (role: string) => {
		const variants = {
			Admin: 'bg-purple-100 text-purple-800 border-purple-300',
			Operator: 'bg-blue-100 text-blue-800 border-blue-300',
			Employee: 'bg-gray-100 text-gray-800 border-gray-300',
		}
		return variants[role as keyof typeof variants]
	}

	const handleEdit = (user: User) => {
		setEditingUser(user)
		setFormData({
			login: user.login,
			employeeId: user.employeeId,
			role: user.role,
			password: '',
			status: user.status,
		})
		setIsDialogOpen(true)
	}

	const handleAdd = () => {
		setEditingUser(null)
		setFormData({
			login: '',
			employeeId: '',
			role: 'Employee',
			password: '',
			status: 'active',
		})
		setIsDialogOpen(true)
	}

	const handleSave = () => {
		console.log('Saving user:', formData)
		setIsDialogOpen(false)
	}

	const handleDelete = (id: string) => {
		console.log('Deleting user:', id)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#1E2A4A]'>
						Пользователи системы
					</h1>
					<p className='text-muted-foreground mt-1'>
						Управление пользователями и доступом
					</p>
				</div>
				<Button onClick={handleAdd} className='bg-[#2D9CDB] hover:bg-[#2589c4]'>
					<Plus className='w-4 h-4 mr-2' />
					Добавить пользователя
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle>Список пользователей</CardTitle>
						<Select value={roleFilter} onValueChange={setRoleFilter}>
							<SelectTrigger className='w-[200px]'>
								<SelectValue placeholder='Фильтр по роли' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все роли</SelectItem>
								<SelectItem value='Admin'>Администратор</SelectItem>
								<SelectItem value='Operator'>Оператор</SelectItem>
								<SelectItem value='Employee'>Сотрудник</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Логин</TableHead>
								<TableHead>ФИО сотрудника</TableHead>
								<TableHead>Роль</TableHead>
								<TableHead>Последний вход</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead className='text-right'>Действия</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.map(user => (
								<TableRow key={user.id} className='hover:bg-muted/50'>
									<TableCell className='font-medium'>{user.login}</TableCell>
									<TableCell>{user.employeeName}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={getRoleBadge(user.role)}
										>
											{user.role === 'Admin'
												? 'Администратор'
												: user.role === 'Operator'
													? 'Оператор'
													: 'Сотрудник'}
										</Badge>
									</TableCell>
									<TableCell>{user.lastLogin}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={
												user.status === 'active'
													? 'bg-green-100 text-green-800 border-green-300'
													: 'bg-gray-100 text-gray-800 border-gray-300'
											}
										>
											{user.status === 'active' ? 'Активен' : 'Неактивен'}
										</Badge>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex items-center justify-end gap-2'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleEdit(user)}
											>
												<Edit className='w-4 h-4' />
											</Button>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleDelete(user.id)}
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
							{editingUser
								? 'Редактировать пользователя'
								: 'Добавить пользователя'}
						</DialogTitle>
						<DialogDescription>
							Заполните информацию о пользователе системы
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label htmlFor='login'>Логин</Label>
							<Input
								id='login'
								value={formData.login}
								onChange={e =>
									setFormData({ ...formData, login: e.target.value })
								}
								placeholder='username'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='employee'>Сотрудник</Label>
							<Select
								value={formData.employeeId}
								onValueChange={value =>
									setFormData({ ...formData, employeeId: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Выберите сотрудника' />
								</SelectTrigger>
								<SelectContent>
									{mockEmployees.map(emp => (
										<SelectItem key={emp.id} value={emp.id}>
											{emp.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='role'>Роль</Label>
							<Select
								value={formData.role}
								onValueChange={(value: 'Admin' | 'Operator' | 'Employee') =>
									setFormData({ ...formData, role: value })
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Admin'>Администратор</SelectItem>
									<SelectItem value='Operator'>Оператор</SelectItem>
									<SelectItem value='Employee'>Сотрудник</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>
								{editingUser
									? 'Новый пароль (оставьте пустым, чтобы не менять)'
									: 'Пароль'}
							</Label>
							<Input
								id='password'
								type='password'
								value={formData.password}
								onChange={e =>
									setFormData({ ...formData, password: e.target.value })
								}
								placeholder='********'
							/>
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
