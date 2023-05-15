import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Product } from "./Model"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilipushkoPopup from '../../../../Components/filipushko/1Popup/1Popup';
import axios from 'axios';
import { filipushkoAxios } from '../filipushkoPage';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CreateProductPopup from "./popups/CreateProductPopup";
import EditProductPopup from "./popups/EditProductPopup";

const ClientPage = () => {


    const [productList, setProductList] = useState<Product[]>([])

    /*    const [authToken, setAuthToken] = useState('');*/


    const getProduct = () => {
        filipushkoAxios.get<{ items: Product[] }>('https://canstudy.ru/orderapi/product/list')
            .then(res => {
                setProductList(res.data.items);
            })
    }



    useEffect(() => {
        getProduct();
    }, [])


    const deleteCategory = () => {

    }


    const onDeleteClick = (id: number) => {
        filipushkoAxios.delete(`https://canstudy.ru/orderapi/client/${id}`,
        )
            .then(res => {
                setProductList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id: number) => {
        const product = productList.find(el => el.id === id)!;
        setEditProduct(product)
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
            headerName: 'name',
            flex: 1
        },
        {
            field: 'cost',
            headerName: 'cost',
            flex: 1
        },
        {
            field: 'categoryName',
            headerName: 'categoryName',
            flex: 1
        },
        {
            field: 'manufacturerName',
            headerName: 'manufacturerName',
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
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newClient: Product) => onCreate(newClient)} />}

            {editProduct !== null && <EditProductPopup
                open={editProduct !== null}
                onClose={() => setEditProduct(null)}
                Product={editProduct}
                onEdit={(editProduct) => { onEdit(editProduct) }} />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Product</h1>
                <div>
                    <Button color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                        Add Products
                    </Button>
                </div>
            </div>

            <div style={{ height: '80vh', width: '100%' }}>
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

                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ClientPage;