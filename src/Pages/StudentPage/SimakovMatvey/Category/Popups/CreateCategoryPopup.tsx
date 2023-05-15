import React, { useEffect, useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Button, TextField } from '@mui/material'
import { Category } from '../models'
import { simakovAxios } from '../../SimakovMatveyPage'

type Props = IPopup & {
	onCreate: (newCategory: Category) => void
}

const CreateCategoryPopup = ({ open, onClose, onCreate }: Props) => {
	const createCategory = () => {
		simakovAxios
			.post<{ item: Category }>('https://canstudy.ru/orderapi/category', {
				name: categoryName,
			})
			.then((res) => {
				onCreate(res.data.item)
			})
	}

	const [categoryName, setCategoryName] = useState('')

	const onCreateClick = () => {
		createCategory()
		onClose()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Создать категорию'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Название категории"
					variant="standard"
					fullWidth={true}
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
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

export default CreateCategoryPopup
