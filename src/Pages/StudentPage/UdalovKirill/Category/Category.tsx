import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Category } from "./Models"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UdalovPopup from '../../../../Components/Udalov/UdalovPopup/UdalovPopup';
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";
import axios from 'axios';
import { udalovAxios } from '../UdalovKirillPage';

const CategoryPage = () => {


    const [categoryList, setCategoryList] = useState<Category[]>([])

/*    const [authToken, setAuthToken] = useState('');*/


    const getCategories = () => {
        udalovAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
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
       getCategories();
    }, [])


    const deleteCategory = () => {
       
    }


    const onDeleteClick = (id: number) => {
        udalovAxios.delete(`https://canstudy.ru/orderapi/category/${id}`,
        )
            .then(res => {
                setCategoryList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id:number) => {
        const category = categoryList.find(el => el.id === id)!;
        setEditCategory(category)
    }

    const onCreate = (category:Category) => {
        setCategoryList(prev => [...prev, category])
    }

    const onEdit = (category:Category) => {
        setCategoryList(prev => {
            const curCategory = prev.find(el => el.id === category.id)!;

            curCategory.name = category.name;

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
            headerName: 'Name'
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

    const [editCategory, setEditCategory] = useState<Category|null>(null)

    return (
        <div style={{ width: '100%' }}>


            {createPopupOpened && <CreateCategoryPopup
                open = {createPopupOpened}
                onClose = {() => setCreatePopupOpened(false)}
                onCreate={(newCategory:Category) => onCreate(newCategory)}/>}

            {editCategory !== null && <EditCategoryPopup
                open = {editCategory !== null}
                onClose={() => setEditCategory(null)}
                category = {editCategory}
                onEdit={(editCategory) => onEdit(editCategory)}/>}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <h1>Category</h1>
            <div>
                <Button color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                    Add Category
                </Button>
              </div>
            </div>

            <div style={{ height: '80vh', width:'100%' }}>
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