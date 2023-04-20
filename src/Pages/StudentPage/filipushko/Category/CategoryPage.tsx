import {Button, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import {Category} from "./Models"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilipushkoPopup from '../../../../Components/filipushko/filipushkoPopup/filipushkoPopup';
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";
import axios from 'axios';
import { filipushkoAxios } from '../FilipushkoPage';

const CategoryPage = () => {
    const [categoryList, setcategoryList] = useState<Category[]>([])
/*    const [ authToken, setAuthToken ] = useState('');
    const doLogin = () => {
        axios.post < { authToken:string }>('https://canstudy.ru/orderapi/user/login', {
            identifier:'05DA6784-075D-4859-9B30-49457DC210EF'
        })
            .then(res => {
                setAuthToken(res.data.authToken)
            }) 
    }
    useEffect(() => {
        doLogin();
    }, [])*/
    const getCategories = () => {
        filipushkoAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/Category/list')
            .then(res => {
                setcategoryList(res.data.items);
            })
    }



    useEffect(() => {
        
            getCategories();
        
    },[])

    
    const onDeleteClick = (id: number) => {
        setcategoryList(prev =>
            prev.filter(el => el.id !== id)
        )
    }
    const onEdit = (category: Category) => {
        setcategoryList(prev => {
            const curcategory = prev.find(el => el.id === category.id);
            curcategory.name = category.name;
            return [...prev]
        })
    }
    const onEditClick = (id: number) => {
        const category = categoryList.find(el => el.id === id);
        setEditCategory(category)
    }
    const onCreate = (category: Category) => {
        setcategoryList(prev => [...prev, category])
    }
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'name',
            headerName: 'name'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div>
                    <IconButton aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={(onEditClick) => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton></div>
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
                onCreate={(newCategory => onCreate(newCategory))}
            />}

            {editCategory !== null && <EditCategoryPopup
                open={editCategory !== null}
                onClose={() => setCreatePopupOpened(false)}
                onEdit={(editCategory) => {
                }}
                category={editCategory}/>}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Category</h1>
                <div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => setCreatePopupOpened(true)}
                    >
                        add category
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
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default CategoryPage;