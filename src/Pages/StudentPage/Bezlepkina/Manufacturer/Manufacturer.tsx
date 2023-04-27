import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import BezlepkinaPopup from '../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import {Button} from '@mui/material';
import axios from 'axios';
import {Manufacturer} from './models';
import CreateManufacturerPopup from "./PopApps/CreateManufacturePopup";
import EditManufacturerPopApp from "./PopApps/AdditManufacturePopup";

const BezlepkinaManufacturer = () => {
    const [authToken, setAuthToken] = useState('');

    const [ManufacturerList, setManufacturerList] = useState<Manufacturer[]>([

    ])

    const getManufacturer = () => {
        axios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/Manufacturer/list', {
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        })
            .then(res => {
                setManufacturerList(res.data.items)
            })
    }
    useEffect(() => {
        getManufacturer();
    },[])


    const onDeleteClick = (id: number) => {
        setManufacturerList(prev =>
            prev.filter(el => el.id !== id))
    }

    const onCreate = (ManufacturerList: Manufacturer) => {
        setManufacturerList(prevState => [...prevState, ManufacturerList])
    }

    const columns: GridColDef[] = [{
        field: 'id',
        headerName: 'название'
    },
        {
            field: 'name',
            headerName: 'название'
        },
        {
            field: 'country',
            headerName: 'страна'
        },
        {
            field: 'city',
            headerName: 'город'
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{display: 'flex', gap: '1em'}}>
                    <IconButton aria-label="delete"
                                onClick={() => onDeleteClick(e.row.id)}>
                        <DeleteIcon/>
                    </IconButton>

                    <IconButton
                        onClick={() => onEditClick(e.row.id)}
                        aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </div>
            }
        }
    ]
    const [creatrPopupOpened, setCreatePopupOpened] = useState(false)
    const [editManufacturer, setEditManufacturer] = useState<Manufacturer | null>(null)


    const onEditClick = (id: number) => {
        const Manufacturer = ManufacturerList.find(el => el.id === id)!;
        setEditManufacturer(Manufacturer)
    }
    const onEdit = (Manufacturer: Manufacturer) => {
        setManufacturerList(prev => {
            const curManufacturer = prev.find(el => el.id === Manufacturer.id)!;
            curManufacturer.name=Manufacturer.name;
            return [...prev]
        })
    }



    return (
        <div style={{width: '100%'}}>

          {creatrPopupOpened && <CreateManufacturerPopup
                open={creatrPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(cat) => onCreate(cat)}
            />}

            {editManufacturer != null && <EditManufacturerPopApp
                open={editManufacturer != null}
                onClose={() => setEditManufacturer(null)}
                Manufacturer={editManufacturer}
                onEdit={(EditManufacturer) => onEdit(EditManufacturer)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Manufacturer </h1>
            </div>

            <div>
                <Button variant="contained"
                        onClick={() => setCreatePopupOpened(true)}>
                    Add
                </Button>
            </div>
            <div style={{height: '80vh', width: '100%'}}>
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
                    checkboxSelection
                    disableRowSelectionOnClick
                />

            </div>
        </div>
    );
}
export default BezlepkinaManufacturer;