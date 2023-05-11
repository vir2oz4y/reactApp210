import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Product } from "./Model"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UdalovPopup from '../../../../Components/Udalov/UdalovPopup/UdalovPopup';
import axios from 'axios';
import { udalovAxios } from '../UdalovKirillPage';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CreateProductPopup from "./Popups/CreateProductPopup";
import EditProductPopup from "./Popups/EditProductPopup";

const ClientPage = () => {


    const [productList, setProductList] = useState<Product[]>([])

    /*    const [authToken, setAuthToken] = useState('');*/


    const getProduct = () => {
        udalovAxios.get<{ items: Product[] }>('https://canstudy.ru/orderapi/product/list')
            .then(res => {
                setProductList(res.data.items);
            })
    }

    /*    const doLogin = () => {
            axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
                identifier: '96CBFEBE-D484-433C-B511-ACFDCE2C57D0'
            })
                .then(res => {
                    setAuthToken(res.data.authToken)
                })
        }

        useEffect(() => {
            doLogin();
        }, [])*/


    useEffect(() => {
        getProduct();
    }, [])


    const deleteCategory = () => {

    }


    const onDeleteClick = (id: number) => {
        udalovAxios.delete(`https://canstudy.ru/orderapi/client/${id}`,
        )
            .then(res => {
                setProductList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id:number) => {
        const product = productList.find(el => el.id === id)!;
        setEditProduct(product)
    }

    const onCreate = (Product:Product) => {
        setProductList(prev => [...prev, Product])
    }

    const onEdit = (Product:Product) => {
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

            return[...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'name',
            headerName: 'Название',
            flex: 1
        },
        {
            field: 'cost',
            headerName: 'Цена',
            flex: 1
        },
        {
            field: 'categoryName',
            headerName: 'Категория',
            flex: 1
        },
        {
            field: 'manufacturerName',
            headerName: 'Производитель',
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

    const [editProduct, setEditProduct] = useState<Product|null>(null)

    return (
        <div style={{ width: '100%' }}>


            {createPopupOpened && <CreateProductPopup
                open = {createPopupOpened}
                onClose = {() => setCreatePopupOpened(false)}
                onCreate={(newClient:Product) => onCreate(newClient)}/>}

            {editProduct !== null && <EditProductPopup
                open = {editProduct !== null}
                onClose={() => setEditProduct(null)}
                Product = {editProduct}
                onEdit={(editProduct) => {onEdit(editProduct)}}/>}

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

            <div style={{ height: '80vh', width:'100%' }}>
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
                    //checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ClientPage;