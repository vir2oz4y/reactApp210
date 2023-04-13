import React from 'react';
import {Category} from "./model";
import {useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import PepelevPopup from "../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";

const CategoryPage = () => {

    const [categoryList, setcategoryList] = useState<Category[]>([
        {
            id:0,
            name:"Категория 1"
        },
        {
            id:1,
            name:"Категория 2"
        }
    ])


    const onDeleteClick = (id:number) =>{
        setcategoryList(prev => prev.filter(el=>el.id !== id))
    }
    const onEditClick = (id:number) =>{
        const category = categoryList.find(el=>el.id ===id)!;
        setEditCategory(category)
    }
    const onCreate=(category:Category)=>{
        setcategoryList(prev=>[...prev,category])
    }

    const onEdit = (category: Category) =>{
        setcategoryList(prev=>{
            const curCategory = prev.find(el=>el.id === category.id)!;
            curCategory.name = category.name;
            return[...prev]
        })
    }
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: '',
            headerName: '',
            renderCell: (e:any)=> {
                return <div style ={{display: "flex", gap: '1em'}}>
                    <IconButton onClick={() => onEditClick(e.row.id)} aria-label="edit" >
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                            onClick={() => onDeleteClick(e.row.id)}
                            aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)
    const [editCategory, setEditCategory] = useState<Category|null>(null)
    return (
        <div style={{width: '100%'}}>

            {createPopupOpened && <CreateCategoryPopup
            open={createPopupOpened}
            onClose={()=>setCreatePopupOpened(false)}
            onCreate={(newCategory)=>onCreate(newCategory)}/>}

            {editCategory !== null && <EditCategoryPopup
                open={editCategory !==null}
                onClose={()=>setEditCategory(null)}
                category={editCategory}
                onEdit={(editCategory)=>onEdit(editCategory)}
            />}

            <div style ={{
               display: 'flex',
               justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Category page</h1>
            <div>
                <Button
                    color={'primary'}
                    variant={'contained'}
                >
                    добавить категорию
                </Button>
            </div>
            </div>
            <div style={{height: '80vh', width:'100%'}}>
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