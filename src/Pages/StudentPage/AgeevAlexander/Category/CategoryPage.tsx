import {Button, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import {Category} from './models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AgeevAlexandrPage, { ageevAxios } from '../AgeevAlexandrPage';
import AgeevPopup from '../../../../Components/Ageev/AgeevPopup/AgeevPopup';
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";
import axios from 'axios';

const CategoryPage = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const getCategories = () => {
        ageevAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
            })
    }


    useEffect(() => {
        getCategories();
    }, [])



    const onDeleteClick = (id: number) => {
        ageevAxios.delete(`https://canstudy.ru/orderapi/category/${id}`)
            .then(res => {
                setCategoryList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id:number) =>{
        const category = categoryList.find(el=>el.id === id)!;
        setEditCategory(category)
    }

    const onCreate = (category: Category) => {
        setCategoryList(prev => [...prev, category])
    }

    const onEdit = (category: Category) =>{
        setCategoryList(prev=>{
            const curCategory = prev.find(el=>el.id === category.id)!;

            curCategory.name = category.name;

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
            flex:1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{display: 'flex', gap: '1em'}}>

                    <IconButton
                        aria-label="edit"
                        onClick={()=> onEditClick(e.row.id)}
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

    const [editCategory, setEditCategory] = useState<Category | null>(null)

    return (
        <div style={{width: '100%'}}>

            {createPopupOpened && <CreateCategoryPopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newCategory) => onCreate(newCategory)}
            />}

            {editCategory !== null && <EditCategoryPopup
                open={editCategory !== null}
                onClose={() => setEditCategory(null)}
                category={editCategory}
                onEdit={(editCategory) => onEdit(editCategory)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Категории</h1>

                <div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => setCreatePopupOpened(true)}
                    >
                        Создать категорию
                    </Button>

                </div>
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
                    //checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default CategoryPage;