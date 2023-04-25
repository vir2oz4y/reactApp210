import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Category} from "./models"
import Button from "@mui/material/Button";
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";
import axios from "axios";
import {kiryutinAxios} from "../KiryutinVladPage";

const CategoryPage = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const getCategoriesFromHost = () => {
        kiryutinAxios.get<{ items:Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items)
            })
    }

    const removeCategoryFromHost = (id:number) => {
        kiryutinAxios.delete('https://canstudy.ru/orderapi/category/' + id)
            .then(() => {
                setCategoryList(prev =>
                    prev.filter(el => el.id !== id))
            })
    }

    useEffect(() => {
        getCategoriesFromHost();
    }, [])

    const onDeleteClick = (id:number) => {
        removeCategoryFromHost(id)
    }

    const onEditClick = (id:number) => {
        const category = categoryList.find(el => el.id === id)!;
        setEditCategory(category);
    }

    const onCreate = (category:Category) => {
        setCategoryList(prev => [...prev, category])
    }

    const onEdit = (category:Category) => {
        setCategoryList(prev => {
            const curCategory = prev.find(el => el.id === category.id)

            curCategory.name = category.name;

            return [...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'name',
            headerName: 'Name'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e:any) => {
                return <div style={{display:'flex', gap:'10xp'}}>
                    <IconButton onClick={() => onEditClick(e.row.id)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ];

    const [createPopupOpened, setCreatePopupOpened] = useState(false)
    const [editCategory, setEditCategory] = useState<Category|null>(null)


    return (
        <div style={{width:'100%'}}>

            {
                createPopupOpened &&
                <CreateCategoryPopup
                    open={createPopupOpened}
                    onClose={() => setCreatePopupOpened(false)}
                    onCreate={(newCategory) => onCreate(newCategory)}
                />
            }

            {
                editCategory !== null &&
                <EditCategoryPopup
                    open={editCategory !== null}
                    onClose={() => setEditCategory(null)}
                    category={editCategory}
                    onEdit={(editCategory) => onEdit(editCategory)}
                />
            }

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1>Категории товаров:</h1>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    size="medium"
                    onClick={() => setCreatePopupOpened(true)}>
                    Создать категорию
                </Button>
            </div>
            <div style={{height: '90vh', width: '100%'}}>
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
};
export default CategoryPage;