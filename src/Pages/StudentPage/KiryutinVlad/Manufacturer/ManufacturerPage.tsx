import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Manufacturer} from "./model"
import Button from "@mui/material/Button";
import axios from "axios";
import {kiryutinAxios} from "../KiryutinVladPage";

const ManufacturerPage = () => {

    const [ManufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    const getManufacturerFromHost = () => {
        kiryutinAxios.get<{ items:Manufacturer[] }>('https://canstudy.ru/orderapi/Manufacture/list')
            .then(res => {
                setManufacturerList(res.data.items)
            })
    }

    const removeManufacturerFromHost = (id:number) => {
        kiryutinAxios.delete('https://canstudy.ru/orderapi/Manufacture/' + id)
            .then(() => {
                setManufacturerList(prev =>
                    prev.filter(el => el.id !== id))
            })
    }

    useEffect(() => {
        getManufacturerFromHost();
    }, [])

    const onDeleteClick = (id:number) => {
        removeManufacturerFromHost(id)
    }

    const onEditClick = (id:number) => {
        const Manufacture = ManufacturerList.find(el => el.id === id)!;
        setEditManufacturer(Manufacture);
    }

    const onCreate = (Manufacturer:Manufacturer) => {
        setManufacturerList(prev => [...prev, Manufacturer])
    }

    const onEdit = (Manufacturer:Manufacturer) => {
        setManufacturerList(prev => {
            const curManufacturer = prev.find(el => el.id === Manufacturer.id)

            curManufacturer.name = Manufacturer.name;

            return [...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'name',
            headerName: 'Name'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e:any) => {
                return <div style={{display:'flex', gap:'10xp'}}>
                    <IconButton onClick={() => onEditClick(e.row.id)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ];

    const [createPopupOpened, setCreatePopupOpened] = useState(false)
    const [editManufacturer, setEditManufacturer] = useState<Manufacturer|null>(null)


    return (
        <div style={{width:'100%'}}>

            {/*{*/}
            {/*    createPopupOpened &&*/}
            {/*    <CreateManufacturePopup*/}
            {/*        open={createPopupOpened}*/}
            {/*        onClose={() => setCreatePopupOpened(false)}*/}
            {/*        onCreate={(newManufacture) => onCreate(newManufacture)}*/}
            {/*    />*/}
            {/*}*/}

            {/*{*/}
            {/*    editManufacture !== null &&*/}
            {/*    <EditManufacturePopup*/}
            {/*        open={editManufacture !== null}*/}
            {/*        onClose={() => setEditManufacture(null)}*/}
            {/*        Manufacture={editManufacture}*/}
            {/*        onEdit={(editManufacture) => onEdit(editManufacture)}*/}
            {/*    />*/}
            {/*}*/}

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1>Категории товаров:</h1>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    size="medium"
                    onClick={() => setCreatePopupOpened(true)}>
                    Создать категорию
                </Button>
            </div>
            <div style={{height: '90vh', width: '100%'}}>
                <DataGrid
                    rows={ManufacturerList}
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
export default ManufacturerPage;