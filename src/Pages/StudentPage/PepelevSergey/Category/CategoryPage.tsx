import React from 'react';
import {Category} from "./model";
import {useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import PepelevPopup from "../../../../Components/Pepelev/PepelevPopup/PepelevPopup";

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
                    <IconButton aria-label="delete">
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
    return (
        <div style={{width: '100%'}}>

            <PepelevPopup
                title={'category create'}
                open={true}
                onClose={()=>{ }}>
                <div>
                    123123
                </div>
            </PepelevPopup>

            <div style ={{
               display: 'flex',
               justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Category page</h1>
            <div>
                <button
                    color={'primary'}
                >
                    добавить категорию
                </button>
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