import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Category } from './Models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShchegolevaPopup from '../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup';
import CreateCategoryPopup from "./Popups/CreateCategoryPopup";
import EditCategoryPopup from "./Popups/EditCategoryPopup";
import axios from 'axios';
import { shchegolevaAxios } from '../ShchegolevaEkaterinaPage';

const ShchegolevaCategory = () => {
    const [authToken, setAuthToken] = useState('');

    const [categoryList, setcategoryList] = useState<Category[]>([])

    //const doLogin = () => {
    //    axios.post<{authToken:string}>('https://canstudy.ru/orderapi/user/login', {
    //        identifier: '993D0C6A-3CFB-456C-9BA5-ADD5BC9FB80D'
    //    })
    //        .then(res => {
    //            setAuthToken(res.data.authToken)
    //        })
    //}

    const getCategories = () => {
        shchegolevaAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setcategoryList(res.data.items)
            })
    }

    //useEffect(() => {
    //    doLogin();
    //},[])

    useEffect(() => {
            getCategories();
    },[])

   
    const onDeleteClick = (id: number) => {
        shchegolevaAxios.delete(`https://canstudy.ru/orderapi/category/` + id)
            .then(() => {
                setcategoryList(prev=>prev.filter(el=>el.id !==id))
            })
        
        }
    const onEditClick = (id: number) => {
            const category=categoryList.find(el=>el.id===id)!;
            setEditCategory(category);
    }


        const onCreate=(category:Category)=>{
        setcategoryList(prev=>[...prev,category])
        }

        const onEdit=(category:Category)=>{
        setcategoryList(prev=>{
            const curcategory=prev.find(el=>el.id===category.id)!
            curcategory.name=category.name
            return[...prev]
        })
        }
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName:'Id'
        },
        {
            field: 'name',
            headerName: 'Name'
        },
        {
            field: '',
            headerName:'',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>
                    <IconButton aria-label="edit"
                                onClick={()=>onEditClick(e.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={()=>onDeleteClick(e.row.id)}
                        aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
            
    ]

    const [createPopupOpened, setCreatePopupOpened]=useState(false)

    const [editCategory,setEditCategory]=useState<Category|null>(null)
    return (
        <div style={{ width: '100%' }}>

            {createPopupOpened && <CreateCategoryPopup open={createPopupOpened}
                                 onClose={()=>setCreatePopupOpened(false)}
                                 onCreate={(newCategory)=>onCreate(newCategory)}/>}


            {editCategory !== null && <EditCategoryPopup
            open={editCategory!==null}
            onClose={()=>setEditCategory(null)}
            category={editCategory}
            onEdit={(editCategory)=>onEdit(editCategory)}/>}


            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems:'center'
            }}>
            <div>
            <h1>Category</h1>
            </div>
            <div>
                <Button variant="contained"
                onClick={()=>setCreatePopupOpened(true)}>
                    Add category
                </Button>
            </div>
           </div>
            <div style={{ height: '80vh', width: '100%' }}>
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
                    /*checkboxSelection*/
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ShchegolevaCategory;