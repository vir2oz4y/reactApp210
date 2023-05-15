import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { agaevAxios } from '../AgaevAlbertPage';
import { Manufacturer } from "./Models";
import CreateManufacturerPopup from "./Popups/CreateManufacturerPopup";
import EditManufacturerPopup from "./Popups/EditManufacturerPopup";

const ManufacturerPage = () => {

    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    const getManufacturers = () => {
        agaevAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items);
            })
    }

    useEffect(() => {
        getManufacturers();
    }, [])

    const onDeleteClick = (id: number) => {
        agaevAxios.delete(`https://canstudy.ru/orderapi/manufacturer/${id}`,
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
            headerName: 'ID'
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
                <h1>Производители</h1>
                <div>
                    <Button color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                        Добавить производителя
                    </Button>
                </div>
            </div>

            <div style={{ height: '70vh', width:'100%' }}>
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