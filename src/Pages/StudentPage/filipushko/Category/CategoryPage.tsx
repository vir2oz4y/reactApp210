import {Button, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {Category} from "./Models"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilipushkoPopup from '../../../../Components/filipushko/filipushkoPopup/filipushkoPopup';
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";

const CategoryPage = () => {

    const [categoryList, setcategoryList] = useState<Category[]>([
        {
            id: 0,
            name: "category 1"
        },
        {
            id: 1,
            name: "category 2"
        }
    ])
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