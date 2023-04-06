import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useState } from 'react';
import { Category } from "./Models"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UdalovPopup from '../../../../Components/Udalov/UdalovPopup/UdalovPopup';

const CategoryPage = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([
        {
            id: 0,
            name: "Category 1"
        },
        {
            id: 1,
            name: "Category 2"
        },
    ])

    const onDeleteClick = (id: number) => {
        setCategoryList(prev => prev.filter(el => el.id !== id))
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'id'
        },
        {
            field: 'Name',
            headerName: 'Name'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>

                    </div>
            }
        }

    ]

    return (
        <div style={{ width: '100%' }}>

            <UdalovPopup title='Category' open={true} onClose={() => { }}>
                <div>
                    123123
                </div>
            </UdalovPopup>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <h1>Category</h1>
            <div>
                <Button color={'primary'} variant={'contained'}>
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