import React, { useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Manufacturer } from '../models'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'

type Props = IPopup & {
	onEdit: (newManufacturer: Manufacturer) => void
	manufacturer: Manufacturer
}

const EditManufacturerPopup = ({
	open,
	onClose,
	manufacturer,
	onEdit,
}: Props) => {
	const editManufacturer = () => {
		simakovAxios
			.patch<{ item: Manufacturer }>(
				'https://canstudy.ru/orderapi/manufacturer',
				{
					item: {
						id: manufacturer.id,
						name: manufacturer.name,
						city: manufacturer.city,
						country: manufacturer.country,
					},
				}
			)
			.then((res) => {
				onEdit(manufacturerEdit)
				onClose()
			})
	}

	const [manufacturerEdit, setManufacturerEdit] = useState(manufacturer)

	const onEditClick = () => {
		editManufacturer()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Изменить поставщика'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Название поставщика"
					variant="standard"
					fullWidth={true}
					value={manufacturerEdit.name}
					onChange={(e) =>
						setManufacturerEdit((prev) => ({ ...prev, name: e.target.value }))
					}
				/>

				<TextField
					id="standard-basic"
					label="Город поставщика"
					variant="standard"
					fullWidth={true}
					value={manufacturerEdit.city}
					onChange={(e) =>
						setManufacturerEdit((prev) => ({ ...prev, city: e.target.value }))
					}
				/>

				<TextField
					id="standard-basic"
					label="Страна поставщика"
					variant="standard"
					fullWidth={true}
					value={manufacturerEdit.country}
					onChange={(e) =>
						setManufacturerEdit((prev) => ({
							...prev,
							country: e.target.value,
						}))
					}
				/>

				<Button
					color={'primary'}
					variant={'contained'}
					onClick={() => onEditClick()}
				>
					Изменить
				</Button>
			</div>
		</SimakovPopup>
	)
}

export default EditManufacturerPopup
