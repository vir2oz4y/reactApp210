import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import { simakovAxios } from '../SimakovMatveyPage'
import { Client } from './models'
import CreateClientPopup from './Popups/CreateClientPopup'
import EditClientPopup from './Popups/EditClientPopup'

const ClientPage = () => {
	const [clientList, setClientList] = useState<Client[]>([])

	const getClientsFromHost = () => {
		simakovAxios
			.get<{ items: Client[] }>('https://canstudy.ru/orderapi/client/list')
			.then((res) => {
				setClientList(res.data.items)
			})
	}

	const removeClientFromHost = (id: number) => {
		simakovAxios
			.delete('https://canstudy.ru/orderapi/client/' + id)
			.then(() => {
				setClientList((prev) => prev.filter((el) => el.id !== id))
			})
	}

	useEffect(() => {
		getClientsFromHost()
	}, [])

	const onDeleteClick = (id: number) => {
		removeClientFromHost(id)
	}

	const onEditClick = (id: number) => {
		const client = clientList.find((el) => el.id === id)!
		setEditClient(client)
	}

	const onCreate = (client: Client) => {
		setClientList((prev) => [...prev, client])
	}

	const onEdit = (client: Client) => {
		setClientList((prev) => {
			let curClient = prev.find((el) => el.id === client.id)
			if (!curClient)
				// can be undefined
				curClient = {
					id: 0,
					sex: 0,
					firstName: '',
					lastName: '',
					email: '',
					phoneNumber: '',
					createdAt: '',
					updatedAt: '',
				}

			curClient.id = client.id
			curClient.sex = client.sex
			curClient.firstName = client.firstName
			curClient.lastName = client.lastName
			curClient.email = client.email
			curClient.phoneNumber = client.phoneNumber
			curClient.createdAt = client.createdAt
			curClient.updatedAt = client.updatedAt

			return [...prev]
		})
	}

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'sex',
			headerName: 'Sex',
		},
		{
			field: 'firstName',
			headerName: 'First Name',
			flex: 1,
		},
		{
			field: 'lastName',
			headerName: 'Last Name',
			flex: 1,
		},
		{
			field: 'email',
			headerName: 'E-mail',
			flex: 1,
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone Number',
			flex: 1,
		},
		{
			field: '',
			headerName: '',
			renderCell: (e: any) => {
				return (
					<div style={{ display: 'flex', gap: '10xp' }}>
						<IconButton onClick={() => onEditClick(e.row.id)} aria-label="edit">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={() => onDeleteClick(e.row.id)}
							aria-label="delete"
						>
							<DeleteIcon />
						</IconButton>
					</div>
				)
			},
		},
	]

	const [createPopupOpened, setCreatePopupOpened] = useState(false)
	const [editClient, setEditClient] = useState<Client | null>(null)

	return (
		<div style={{ width: '100%' }}>
			{createPopupOpened && (
				<CreateClientPopup
					open={createPopupOpened}
					onClose={() => setCreatePopupOpened(false)}
					onCreate={(newClient) => onCreate(newClient)}
				/>
			)}

			{editClient !== null && (
				<EditClientPopup
					open={editClient !== null}
					onClose={() => setEditClient(null)}
					client={editClient}
					onEdit={(editClient) => onEdit(editClient)}
				/>
			)}

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1>Список клиентов:</h1>
				<Button
					color={'primary'}
					variant={'contained'}
					size="medium"
					onClick={() => setCreatePopupOpened(true)}
				>
					Зарегистрировать клиента
				</Button>
			</div>
			<div style={{ height: '90vh', width: '100%' }}>
				<DataGrid
					rows={clientList}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					// checkboxSelection
					disableRowSelectionOnClick
				/>
			</div>
		</div>
	)
}

export default ClientPage
