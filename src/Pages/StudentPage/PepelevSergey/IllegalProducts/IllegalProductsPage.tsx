import {Button, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import {IllegalProduct} from './model';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {pepelevAxios} from '../PepelevSergeyPage';
import CreateIllegalProductPopup from "./Popups/CreateIllegalProductPopup";
import EditIllegalProductPopup from './Popups/EditIllegalProductPopup';


const IllegalProductPage = () => {

    const [IllegalProductList, setIllegalProductList] = useState<IllegalProduct[]>([])

    const getIllegalProducts = () => {
        pepelevAxios.get<{ items: IllegalProduct[] }>('https://canstudy.ru/orderapi/IllegalProduct/list')
            .then(res => {
                setIllegalProductList(res.data.items);
            })
    }


    useEffect(() => {
        getIllegalProducts();
    }, [])


    const onDeleteClick = (id: number) => {
        pepelevAxios.delete(`https://canstudy.ru/orderapi/IllegalProduct/${id}`)
            .then(res => {
                setIllegalProductList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id: number) => {
        const IllegalProduct = IllegalProductList.find(el => el.id === id)!;
        setEditIllegalProduct(IllegalProduct)
    }

    const onCreate = (IllegalProduct: IllegalProduct) => {
        setIllegalProductList(prev => [...prev, IllegalProduct])
    }

    const onEdit = (IllegalProduct: IllegalProduct) => {
        setIllegalProductList(prev => {

            const curIllegalProduct = prev.find(el => el.id === IllegalProduct.id)!;

            if (curIllegalProduct) {
                curIllegalProduct.name = IllegalProduct.name;
                curIllegalProduct.description = IllegalProduct.description;
                curIllegalProduct.cost = IllegalProduct.cost;
                curIllegalProduct.manufacturerId = IllegalProduct.manufacturerId;
                curIllegalProduct.manufacturerName = IllegalProduct.manufacturerName;
                curIllegalProduct.categoryId = IllegalProduct.categoryId;
                curIllegalProduct.categoryName = IllegalProduct.categoryName;
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
                return <div style={{display: 'flex', gap: '1em'}}>

                    <IconButton
                        aria-label="edit"
                        onClick={() => onEditClick(e.row.id)}
                    >
                        <EditIcon/>
                    </IconButton>

                    <IconButton
                        onClick={() => onDeleteClick(e.row.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            }
        }
    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editIllegalProduct, setEditIllegalProduct] = useState<IllegalProduct | null>(null)

    return (
        <div style={{width: '100%'}}>

            {createPopupOpened && <CreateIllegalProductPopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newIllegalProduct) => onCreate(newIllegalProduct)}
            />}


            {editIllegalProduct !== null && <EditIllegalProductPopup
                open={editIllegalProduct !== null}
                onClose={() => setEditIllegalProduct(null)}
                IllegalProduct={editIllegalProduct}
                onEdit={(editIllegalProduct) => onEdit(editIllegalProduct)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Забористый товар</h1>

                <div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => setCreatePopupOpened(true)}
                    >
                        Создать товар
                    </Button>

                </div>
            </div>


            <div style={{height: '80vh', width: '100%'}}>
                <DataGrid
                    rows={IllegalProductList}
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

export default IllegalProductPage;