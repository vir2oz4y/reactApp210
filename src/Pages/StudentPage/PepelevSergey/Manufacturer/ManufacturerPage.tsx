import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import PepelevPopup from "../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import axios from "axios";
import {pepelevAxios} from "../PepelevSergeyPage";
import {Manufacturer} from "./model";
import CreateManufacturerPopup from "./Popups/CreateManufacrurerPopup";
import EditManufacturerPopup from "./Popups/EditManufacturerPopup";

const ManufacturerPage = () => {

    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    const getManufacturerFromHost = () => {
        pepelevAxios.get<{ items:Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items)
            })
    }

    const removeManufacturerFromHost = (id:number) => {
        pepelevAxios.delete('https://canstudy.ru/orderapi/manufacturer/' + id)
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
        const manufacturer = manufacturerList.find(el => el.id === id)!;
        setEditManufacturer(manufacturer);
    }

    const onCreate = (manufacturer:Manufacturer) => {
        setManufacturerList(prev => [...prev, manufacturer])
    }

    const onEdit = (manufacturer:Manufacturer) => {
        setManufacturerList(prev => {
            const curmanufacturer = prev.find(el => el.id === manufacturer.id)
            curmanufacturer.name = manufacturer.name;
            curmanufacturer.city = manufacturer.city;
            curmanufacturer.country = manufacturer.country;
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
            headerName: 'Название',
            flex:1
        },{
            field: 'country',
            headerName: 'Страна',
            flex:1
        },{
            field: 'city',
            headerName: 'Город',
            flex:1
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
            {
                createPopupOpened &&
                <CreateManufacturerPopup
                    open={createPopupOpened}
                    onClose={() => setCreatePopupOpened(false)}
                    onCreate={(newManufacturer) => onCreate(newManufacturer)}
                />
            }
            {
                editManufacturer !== null &&
                <EditManufacturerPopup
                    open={editManufacturer !== null}
                    onClose={() => setEditManufacturer(null)}
                    manufacturer={editManufacturer}
                    onEdit={(editManufacturer) => onEdit(editManufacturer)}
                />
            }
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1>Производитель:</h1>
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
                    // checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};
export default ManufacturerPage;