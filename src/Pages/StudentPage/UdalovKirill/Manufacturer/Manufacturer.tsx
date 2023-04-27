import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UdalovPopup from '../../../../Components/Udalov/UdalovPopup/UdalovPopup';
import axios from 'axios';
import { udalovAxios } from '../UdalovKirillPage';
import {Manufacturer} from "./Models";
import CreateManufacturerPopup from "./Popups/CreateManufacturerPopup";
import EditManufacturerPopup from "./Popups/EditManufacturerPopup";

const ManufacturerPage = () => {


    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    /*    const [authToken, setAuthToken] = useState('');*/


    const getManufacturers = () => {
        udalovAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items);
            })
    }

    /*    const doLogin = () => {
            axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
                identifier: '96CBFEBE-D484-433C-B511-ACFDCE2C57D0'
            })
                .then(res => {
                    setAuthToken(res.data.authToken)
                })
        }

        useEffect(() => {
            doLogin();
        }, [])*/


    useEffect(() => {
        getManufacturers();
    }, [])


    const deleteManufacturer = () => {

    }


    const onDeleteClick = (id: number) => {
        udalovAxios.delete(`https://canstudy.ru/orderapi/manufacturer/${id}`,
        )
            .then(res => {
                setManufacturerList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id:number) => {
        const manufacturer = manufacturerList.find(el => el.id === id)!;
        setEditManufacturer(manufacturer)
    }

    const onCreate = (manufacturer:Manufacturer) => {
        setManufacturerList(prev => [...prev, manufacturer])
    }

    const onEdit = (manufacturer:Manufacturer) => {
        setManufacturerList(prev => {
            const curmanufacturer = prev.find(el => el.id === manufacturer.id)!;

            curmanufacturer.name = manufacturer.name;
            curmanufacturer.city = manufacturer.city;
            curmanufacturer.country = manufacturer.country

            return[...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'name',
            headerName: 'Название',
            flex:1
        },
        {
            field: 'country',
            headerName: 'Страна',
            flex:1
        },
        {
            field: 'city',
            headerName: 'Город',
            flex:1
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

    const [editManufacturer, setEditManufacturer] = useState<Manufacturer|null>(null)

    return (
        <div style={{ width: '100%' }}>


            {createPopupOpened && <CreateManufacturerPopup
                open = {createPopupOpened}
                onClose = {() => setCreatePopupOpened(false)}
                onCreate={(newManufacturer) => onCreate(newManufacturer)}/>}

            {editManufacturer !== null && <EditManufacturerPopup
                open = {editManufacturer !== null}
                onClose={() => setEditManufacturer(null)}
                Manufacturer = {editManufacturer}
                onEdit={(editmanufacturer) => onEdit(editmanufacturer)}/>}

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

            <div style={{ height: '80vh', width:'100%' }}>
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
                    //checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ManufacturerPage;