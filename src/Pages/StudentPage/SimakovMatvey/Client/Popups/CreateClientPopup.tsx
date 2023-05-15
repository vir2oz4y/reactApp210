import React, { useEffect, useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'
import { Client } from '../models'

type Props = IPopup & {
	onCreate: (newClient: Client) => void
}

const CreateClientPopup = ({ open, onClose, onCreate }: Props) => {
	const createClient = () => {
		simakovAxios
			.post<{ item: Client }>('https://canstudy.ru/orderapi/client', {
				sex: client.sex,
				firstName: client.firstName,
				lastName: client.lastName,
				email: client.email,
				phoneNumber: client.phoneNumber,
			})
			.then((res) => {
				onCreate(res.data.item)
			})
	}

	const [client, setClient] = useState<Client>({
		id: 0,
		sex: 0,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		createdAt: '',
		updatedAt: '',
	})

	const onCreateClick = () => {
		createClient()

		onClose()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Зарегистрировать клиента'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Пол"
					variant="standard"
					fullWidth={true}
					value={client.sex}
					placeholder='0 - "Мужской", 1 - "Женский"'
					onChange={(e) => {
						let val = parseInt(e.target.value)
						if (val !== 0 && val !== 1) {
							e.target.value = ''
							return alert(
								'Пол может быть только 0 или 1. 0 - "Мужской", 1 - "Женский"'
							)
						}
						setClient((prev) => ({ ...prev, sex: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Имя"
					variant="standard"
					fullWidth={true}
					value={client.firstName}
					onChange={(e) => {
						let val = e.target.value
						setClient((prev) => ({ ...prev, firstName: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Фамилия"
					variant="standard"
					fullWidth={true}
					value={client.lastName}
					onChange={(e) => {
						let val = e.target.value
						setClient((prev) => ({ ...prev, lastName: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Почта"
					variant="standard"
					fullWidth={true}
					value={client.email}
					onChange={(e) => {
						let val = e.target.value
						setClient((prev) => ({ ...prev, email: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Номер телефона"
					variant="standard"
					fullWidth={true}
					value={client.phoneNumber}
					onChange={(e) => {
						let val = e.target.value
						setClient((prev) => ({ ...prev, phoneNumber: val }))
					}}
				/>

				<Button
					color={'primary'}
					variant={'contained'}
					style={{ fontSize: '10px' }}
					onClick={() => onCreateClick()}
				>
					Создать
				</Button>
			</div>
		</SimakovPopup>
	)
}

export default CreateClientPopup
