import React, { useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Category } from '../models'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'

type Props = IPopup & {
	onEdit: (newCategory: Category) => void
	category: Category
}

const EditCategoryPopup = ({ open, onClose, category, onEdit }: Props) => {
	// TODO:
	const editCategory = () => {
		simakovAxios
			.patch<{ item: Category }>('https://canstudy.ru/orderapi/category', {
				item: {
					id: category.id,
					name: category.name,
				},
			})
			.then(() => {
				onEdit(categoryEdit)
				onClose()
			})
	}

	const [categoryEdit, setCategoryEdit] = useState(category)

	const onEditClick = () => {
		editCategory()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Изменить категорию'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Название категории"
					variant="standard"
					fullWidth={true}
					value={categoryEdit.name}
					onChange={(e) =>
						setCategoryEdit((prev) => ({ ...prev, name: e.target.value }))
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

export default EditCategoryPopup
