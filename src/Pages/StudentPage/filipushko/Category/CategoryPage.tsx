import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, {useState} from 'react';
import {Category} from "./Models"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilipushkoPopup from '../../../../Components/filipushko/filipushkoPopup/filipushkoPopup';
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
            prev.filter(el => el.id !==id)
            )
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
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton></div>
            }
        }
    ]

    return (
        <div style={{ width: '100%' }}>

            <FilipushkoPopup
                open={true}
                title = '12312'
                onClose={() => { }}
                >
                <div>123</div>
            </FilipushkoPopup>

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
                    >
                        add category
                        </Button>
                </div>
            </div>
            <div>
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