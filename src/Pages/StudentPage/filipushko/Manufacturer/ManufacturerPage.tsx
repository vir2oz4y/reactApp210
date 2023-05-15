import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilipushkoPopup from '../../../../Components/filipushko/1Popup/1Popup';
import axios from 'axios';
import { filipushkoAxios } from '../filipushkoPage';
import { Manufacturer } from "./Models";


import CreateManufacturerPopup from './popups/CreateManufacturerPopup.tsx';
import EditManufacturerPopup from './popups/EditManufacturerPopup.tsx';

const ManufacturerPage = () => {


    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])


    const getManufacturers = () => {
        filipushkoAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items);
            })
    }




    useEffect(() => {
        getManufacturers();
    }, [])


    const deleteManufacturer = () => {

    }


    const onDeleteClick = (id: number) => {
        filipushkoAxios.delete(`https://canstudy.ru/orderapi/manufacturer/${id}`,
        )
            .then(res => {
                setManufacturerList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id: number) => {
        const manufacturer = manufacturerList.find(el => el.id === id)!;
        setEditManufacturer(manufacturer)
    }

    const onCreate = (manufacturer: Manufacturer) => {
        setManufacturerList(prev => [...prev, manufacturer])
    }

    const onEdit = (manufacturer: Manufacturer) => {
        setManufacturerList(prev => {
            const curmanufacturer = prev.find(el => el.id === manufacturer.id)!;

            curmanufacturer.name = manufacturer.name;
            curmanufacturer.city = manufacturer.city;
            curmanufacturer.country = manufacturer.country

            return [...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'name',
            headerName: 'name',
            flex: 1
        },
        {
            field: 'country',
            headerName: 'country',
            flex: 1
        },
        {
            field: 'city',
            headerName: 'city',
            flex: 1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>
                    <IconButton aria-label="edit" onClick={() => onEditClick(e.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(e.row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>

                </div>
            }
        }

    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editManufacturer, setEditManufacturer] = useState<Manufacturer | null>(null)

    return (
        <div style={{ width: '100%' }}>


            {createPopupOpened && <CreateManufacturerPopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newManufacturer: Manufacturer) => onCreate(newManufacturer)} />}

            {editManufacturer !== null && <EditManufacturerPopup
                open={editManufacturer !== null}
                onClose={() => setEditManufacturer(null)}
                Manufacturer={editManufacturer}
                onEdit={(editmanufacturer: Manufacturer) => onEdit(editmanufacturer)} />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>manufacturer</h1>
                <div>
                    <Button color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                        Add manufacturer
                    </Button>
                </div>
            </div>

            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={manufacturerList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ManufacturerPage;