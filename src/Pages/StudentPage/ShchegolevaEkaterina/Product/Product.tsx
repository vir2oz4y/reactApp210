import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Product } from './Models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { shchegolevaAxios } from '../ShchegolevaEkaterinaPage';
import CreateProductPopup from "./Popups/CreateProductPopup";
import EditProductPopup from "./Popups/EditProductPopup";


const ShchegolevaProduct = () => {

    const [ProductList, setProductList] = useState<Product[]>([])

    const getProducts = () => {
        shchegolevaAxios.get<{ items: Product[] }>('https://canstudy.ru/orderapi/Product/list')
            .then(res => {
                setProductList(res.data.items);
            })
    }


    useEffect(() => {
        getProducts();
    }, [])


    const onDeleteClick = (id: number) => {
        shchegolevaAxios.delete(`https://canstudy.ru/orderapi/Product/${id}`)
            .then(res => {
                setProductList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id: number) => {
        const Product = ProductList.find(el => el.id === id)!;
        setEditProduct(Product)
    }

    const onCreate = (Product: Product) => {
        setProductList(prev => [...prev, Product])
    }

    const onEdit = (Product: Product) => {
        setProductList(prev => {

            const curProduct = prev.find(el => el.id === Product.id)!;

            if (curProduct) {
                curProduct.name = Product.name;
                curProduct.description = Product.description;
                curProduct.cost = Product.cost;
                curProduct.manufacturerId = Product.manufacturerId;
                curProduct.manufacturerName = Product.manufacturerName;
                curProduct.categoryId = Product.categoryId;
                curProduct.categoryName = Product.categoryName;
            }

            return [...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1
        },
        {
            field: 'categoryName',
            headerName: 'Category',
            flex: 1
        },
        {
            field: 'manufacturerName',
            headerName: 'Manufacturer',
            flex: 1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>

                    <IconButton aria-label="edit" onClick={() => onEditClick(e.row.id)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editProduct, setEditProduct] = useState<Product | null>(null)

    return (
        <div style={{ width: '100%' }}>

            {createPopupOpened && <CreateProductPopup
                open={createPopupOpened} onClose={() => setCreatePopupOpened(false)} onCreate={(newProduct) => onCreate(newProduct)}
            />}


            {editProduct !== null && <EditProductPopup open={editProduct !== null} onClose={() => setEditProduct(null)}
                Product={editProduct} onEdit={(editProduct) => onEdit(editProduct)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Product</h1>

                <div>
                    <Button
                        color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                        Add product
                    </Button>

                </div>
            </div>

            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={ProductList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ShchegolevaProduct;