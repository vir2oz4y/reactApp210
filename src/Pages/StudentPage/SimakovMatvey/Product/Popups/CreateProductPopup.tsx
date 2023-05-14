import React, { useState } from 'react'
import SimakovPopup, {
	IPopup,
} from '../../../../../Components/SimakovMatvey/SimakovPopup/SimakovPopup'
import { Button, TextField } from '@mui/material'
import { simakovAxios } from '../../SimakovMatveyPage'
import { Product } from '../models'

type Props = IPopup & {
	onCreate: (newProduct: Product) => void
}

const CreateProductPopup = ({ open, onClose, onCreate }: Props) => {
	const createProduct = () => {
		simakovAxios
			.post<{ item: Product }>('https://canstudy.ru/orderapi/product', {
				id: product.id,
				categoryId: product.categoryId,
				manufacturerId: product.manufacturerId,
				name: product.name,
				cost: product.cost,
				description: product.description,
				categoryName: product.categoryName,
				manufacturerName: product.manufacturerName,
			})
			.then((res) => {
				onCreate(res.data.item)
			})
	}

	const [product, setProduct] = useState<Product>({
		id: 0,
		categoryId: 0,
		manufacturerId: 0,
		name: '',
		cost: 0,
		description: '',
		categoryName: '',
		manufacturerName: '',
	})

	const onCreateClick = () => {
		createProduct()

		onClose()
	}

	return (
		<SimakovPopup
			open={open}
			onClose={() => onClose()}
			title={'Добавить товар'}
		>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
				<TextField
					id="standard-basic"
					label="Название"
					variant="standard"
					fullWidth={true}
					value={product.name}
					onChange={(e) => {
						let val = e.target.value
						setProduct((prev) => ({ ...prev, name: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Цена"
					variant="standard"
					fullWidth={true}
					value={product.cost}
					onChange={(e) => {
						let val = parseInt(e.target.value)
						setProduct((prev) => ({ ...prev, cost: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="Описание"
					variant="standard"
					fullWidth={true}
					value={product.description}
					onChange={(e) => {
						let val = e.target.value
						setProduct((prev) => ({ ...prev, description: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="ID категории"
					variant="standard"
					fullWidth={true}
					value={product.categoryId}
					onChange={(e) => {
						let val = parseInt(e.target.value)
						if (isNaN(val)) return
						setProduct((prev) => ({ ...prev, categoryId: val }))
					}}
				/>

				<TextField
					id="standard-basic"
					label="ID производителя"
					variant="standard"
					fullWidth={true}
					value={product.manufacturerId}
					onChange={(e) => {
						let val = parseInt(e.target.value)
						if (isNaN(val)) return
						setProduct((prev) => ({ ...prev, manufacturerId: val }))
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

export default CreateProductPopup
