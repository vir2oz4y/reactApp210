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


const BezlepkinaCategory = () => {
  const [authToken, setAuthToken] = useState('');

    const [categoryList, setcategoryList] = useState<Category[]>([
        
    ])
    
    const getCategory = () => {
        axios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/user/login', {
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        })
            .then(res => {
                setcategoryList(res.data.items)
            })
    }
    useEffect(() => {
            getCategory();
    },[])
 

    const onDeleteClick = (id: number) => {
        setcategoryList(prev =>
            prev.filter(el => el.id !== id))
    }

    const onCreate = (categoryList: Category) => {
        setcategoryList(prevState => [...prevState, categoryList])
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
                return <div style={{display: 'flex', gap: '1em'}}>
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


    const onEditClick = (id: number) => {
        const category = categoryList.find(el => el.id === id)!;
        setEditCategory(category)
    }
    const onEdit = (category: Category) => {
        setcategoryList(prev => {
            const curCategory = prev.find(el => el.id === category.id)!;
            curCategory.name=category.name;
            return [...prev]
        })
    }


    return (
        <div style={{width: '100%'}}>

            {creatrPopupOpened && <CreateCategoryPopApp
                open={creatrPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(cat) => onCreate(cat)}
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
                <Button variant="contained"
                        onClick={() => setCreatePopupOpened(true)}>
                    Add
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
                    checkboxSelection
                    disableRowSelectionOnClick
                />

            </div>
        </div>
    );
}


export default BezlepkinaCategory;