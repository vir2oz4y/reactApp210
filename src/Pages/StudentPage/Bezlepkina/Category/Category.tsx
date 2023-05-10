import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import {Category} from './models'
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import BezlepkinaPopup from '../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import {Button} from '@mui/material';
import CreateCategoryPopApp from "./PopApps/CreateCategoryPopApp";
import EditCategoryPopApp from "./PopApps/AdditCategoryPopApp";
import axios from 'axios';
import {BezlepkinaAxios} from "../BezlepkinaPage";


const BezlepkinaCategory = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([])
    
    const getCategory = () => {
        BezlepkinaAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
    .then(res => {
            setCategoryList(res.data.items);
        })
    }
        
    useEffect(() => {
            getCategory();
    },[])
 

    const onDeleteClick = (id: number) => {
        BezlepkinaAxios.delete(`https://canstudy.ru/orderapi/category/${id}`)
            .then(res => {
                setCategoryList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id: number) => {
        const category = categoryList.find(el => el.id === id)!;
        setEditCategory(category)
    }

    const onCreate = (category: Category) => {
        setCategoryList(prev => [...prev, category])
    }
    const onEdit = (category: Category) => {
        setCategoryList(prev => {
            const curCategory = prev.find(el => el.id === category.id)!;

            curCategory.name = category.name;

            return [...prev]
        })
    }


    const columns: GridColDef[] = [{
        field: 'id',
        headerName: 'Id'
    },
        {
            field: 'name',
            headerName: 'Name'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>

                    <IconButton aria-label="delete"
                                onClick={() => onDeleteClick(e.row.id)}>
                        <DeleteIcon/>
                    </IconButton>

                    <IconButton
                        onClick={() => onEditClick(e.row.id)}
                        aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </div>
            }
        }
    ]
    const [creatrPopupOpened, setCreatePopupOpened] = useState(false)
    const [editCategory, setEditCategory] = useState<Category | null>(null)

    return (
        <div style={{width: '100%'}}>

            {creatrPopupOpened && <CreateCategoryPopApp
                open={creatrPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newCategory) => onCreate(newCategory)}
            />}

            {editCategory != null && <EditCategoryPopApp
                open={editCategory != null}
                onClose={() => setEditCategory(null)}
                category={editCategory}
                onEdit={(EditCategory) => onEdit(EditCategory)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Category </h1>
            </div>

            <div>
                <Button color={'primary'}
                    variant="contained"
                        onClick={() => setCreatePopupOpened(true)}>
                    ADD
                </Button>
            </div>

            <div style={{height: '80vh', width: '100%'}}>
                <DataGrid
                    rows={categoryList}
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
    );
}


export default BezlepkinaCategory;