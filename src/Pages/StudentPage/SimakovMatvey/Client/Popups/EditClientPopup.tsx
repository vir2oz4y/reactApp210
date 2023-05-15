import React, { useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Client } from '../models'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'

type Props = IPopup & {
	onEdit: (newClient: Client) => void
	client: Client
}

const EditClientPopup = ({ open, onClose, client, onEdit }: Props) => {
	const editClient = () => {
		simakovAxios
			.patch<{ item: Client }>('https://canstudy.ru/orderapi/client', {
				item: {
					id: client.id,
					sex: client.sex,
					firstName: client.firstName,
					lastName: client.lastName,
					email: client.email,
					phoneNumber: client.phoneNumber,
					createdAt: client.createdAt,
					updatedAt: client.updatedAt,
				},
			})
			.then((res) => {
				onEdit(clientEdit)
				onClose()
			})
	}

	const [clientEdit, setClientEdit] = useState(client)

	const onEditClick = () => {
		editClient()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Изменить клиента'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Пол"
					variant="standard"
					fullWidth={true}
					value={clientEdit.sex}
					placeholder='0 - "Мужской", 1 - "Женский"'
					onChange={(e) => {
						let val = parseInt(e.target.value)
						if (val !== 0 && val !== 1)
							return alert(
								'Пол может быть только 0 или 1. 0 - "Мужской", 1 - "Женский"'
							)
						setClientEdit((prev) => ({ ...prev, sex: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Имя"
					variant="standard"
					fullWidth={true}
					value={clientEdit.firstName}
					onChange={(e) => {
						let val = e.target.value
						setClientEdit((prev) => ({ ...prev, firstName: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Фамилия"
					variant="standard"
					fullWidth={true}
					value={clientEdit.lastName}
					onChange={(e) => {
						let val = e.target.value
						setClientEdit((prev) => ({ ...prev, lastName: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Почта"
					variant="standard"
					fullWidth={true}
					value={clientEdit.email}
					onChange={(e) => {
						let val = e.target.value
						setClientEdit((prev) => ({ ...prev, email: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Номер телефона"
					variant="standard"
					fullWidth={true}
					value={clientEdit.phoneNumber}
					onChange={(e) => {
						let val = e.target.value
						setClientEdit((prev) => ({ ...prev, phoneNumber: val }))
					}}
				/>

				<Button
					color={'primary'}
					variant={'contained'}
					style={{ fontSize: '10px' }}
					onClick={() => onEditClick()}
				>
					Изменить
				</Button>
			</div>
		</SimakovPopup>
	)
}

export default EditClientPopup
