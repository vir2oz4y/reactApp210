import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Category } from './Models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShchegolevaPopup from '../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup';

const ShchegolevaCategory = () => {
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
    const onDeleteClick = (id:number) => {
        setcategoryList(prev=>prev.filter(el=>el.id !==id))
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
                    <IconButton aria-label="edit">
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

    return (
        <div style={{ width: '100%' }}>
            <ShchegolevaPopup title={'Category  create'} open={true} onClose={() => { }}>
                123
            </ShchegolevaPopup>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems:'center'
            }}>
            <div>
            <h1>Category</h1>
            </div>
            <div>
                <Button variant="contained" >
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