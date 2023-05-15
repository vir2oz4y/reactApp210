import React, { useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Product } from '../models'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'

type Props = IPopup & {
	onEdit: (newProduct: Product) => void
	product: Product
}

const EditProductPopup = ({ open, onClose, product, onEdit }: Props) => {
	const editProduct = () => {
		simakovAxios
			.patch<{ item: Product }>('https://canstudy.ru/orderapi/product', {
				item: {
					id: product.id,
					categoryId: product.categoryId,
					manufacturerId: product.manufacturerId,
					name: product.name,
					cost: product.cost,
					description: product.description,
					categoryName: product.categoryName,
					manufacturerName: product.manufacturerName,
				},
			})
			.then((res) => {
				onEdit(productEdit)
				onClose()
			})
	}

	const [productEdit, setProductEdit] = useState(product)

	const onEditClick = () => {
		editProduct()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Изменить товар'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Название"
					variant="standard"
					fullWidth={true}
					value={productEdit.name}
					onChange={(e) => {
						let val = e.target.value
						setProductEdit((prev) => ({ ...prev, name: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Цена"
					variant="standard"
					fullWidth={true}
					value={productEdit.cost}
					onChange={(e) => {
						let val = parseInt(e.target.value)
						setProductEdit((prev) => ({ ...prev, cost: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Описание"
					variant="standard"
					fullWidth={true}
					value={productEdit.description}
					onChange={(e) => {
						let val = e.target.value
						setProductEdit((prev) => ({ ...prev, description: val }))
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

export default EditProductPopup
