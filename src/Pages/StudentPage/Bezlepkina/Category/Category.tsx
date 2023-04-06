
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Category } from './models'
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import BezlepkinaPopup from '../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import { Button } from '@mui/material';

const BezlepkinaCategory = () => {

    const [categoryList, setcategoryList] = useState<Category[]>([
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
        setcategoryList(prev =>
            prev.filter(el => el.id !== id))
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
                return <div style={{ display: 'flex', gap: '1em' }}>
                    <IconButton aria-label="delete"
                        onClick={() => onDeleteClick(e.row.id)}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </div>
            }
        }
    ]

    return (
        <div style={{ width: '100%' }}>
            <BezlepkinaPopup title={'category create'} open={true} onClose={() => { }}>
                </BezlepkinaPopup>
            <div style={{display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                 <h1>Category </h1>
            </div>
            
            <div>
                <Button variant="contained">
                    Add
                    </Button>
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
                    checkboxSelection
                    disableRowSelectionOnClick
                />
         
        </div>
        </div>
    );
};

export default BezlepkinaCategory;