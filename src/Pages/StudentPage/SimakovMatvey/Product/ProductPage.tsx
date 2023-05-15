import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import { simakovAxios } from '../SimakovMatveyPage'
import { Product } from './models'
import CreateProductPopup from './Popups/CreateProductPopup'
import EditProductPopup from './Popups/EditProductPopup'

const ProductPage = () => {
	const [productList, setProductList] = useState<Product[]>([])

	const getProductsFromHost = () => {
		simakovAxios
			.get<{ items: Product[] }>('https://canstudy.ru/orderapi/product/list')
			.then((res) => {
				setProductList(res.data.items)
			})
	}

	const removeProductFromHost = (id: number) => {
		simakovAxios
			.delete('https://canstudy.ru/orderapi/product/' + id)
			.then(() => {
				setProductList((prev) => prev.filter((el) => el.id !== id))
			})
	}

	useEffect(() => {
		getProductsFromHost()
	}, [])

	const onDeleteClick = (id: number) => {
		removeProductFromHost(id)
	}

	const onEditClick = (id: number) => {
		const product = productList.find((el) => el.id === id)!
		setEditProduct(product)
	}

	const onCreate = (product: Product) => {
		setProductList((prev) => [...prev, product])
	}

	const onEdit = (product: Product) => {
		setProductList((prev) => {
			let curProduct = prev.find((el) => el.id === product.id)
			if (!curProduct)
				// can be undefined
				curProduct = {
					id: 0,
					categoryId: 0,
					manufacturerId: 0,
					name: '',
					cost: 0,
					description: '',
					categoryName: '',
					manufacturerName: '',
				}

			curProduct.id = product.id
			curProduct.categoryId = product.categoryId
			curProduct.manufacturerId = product.manufacturerId
			curProduct.name = product.name
			curProduct.cost = product.cost
			curProduct.description = product.description
			curProduct.categoryName = product.categoryName
			curProduct.manufacturerName = product.manufacturerName

			return [...prev]
		})
	}

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'categoryId',
			headerName: 'ID категории',
			flex: 1,
		},
		{
			field: 'manufacturerId',
			headerName: 'ID производителя',
			flex: 1,
		},
		{
			field: 'name',
			headerName: 'Название',
			flex: 1,
		},
		{
			field: 'cost',
			headerName: 'Цена',
		},
		{
			field: 'description',
			headerName: 'Описание',
			flex: 2,
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
	const [editProduct, setEditProduct] = useState<Product | null>(null)

	return (
		<div style={{ width: '100%' }}>
			{createPopupOpened && (
				<CreateProductPopup
					open={createPopupOpened}
					onClose={() => setCreatePopupOpened(false)}
					onCreate={(newProduct) => onCreate(newProduct)}
				/>
			)}

			{editProduct !== null && (
				<EditProductPopup
					open={editProduct !== null}
					onClose={() => setEditProduct(null)}
					product={editProduct}
					onEdit={(editProduct) => onEdit(editProduct)}
				/>
			)}

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1>Список товаров:</h1>
				<Button
					color={'primary'}
					variant={'contained'}
					size="medium"
					onClick={() => setCreatePopupOpened(true)}
				>
					Добавить товар
				</Button>
			</div>
			<div style={{ height: '90vh', width: '100%' }}>
				<DataGrid
					rows={productList}
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

export default ProductPage
