import React, {useState} from 'react';
import {Category} from "./models"
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
                return <div>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ]
    return (
        <div>
            <h1>Category page</h1>
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
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default CategoryPage;