import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import BezlepkinaPopup from '../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import {Button} from '@mui/material';
import axios from 'axios';
import {Manufacture} from './models';
import CreateManufacturePopup from "./PopApps/CreateManufacturePopup";
import EditManufacturePopApp from "./PopApps/AdditManufacturePopup";
import { BezlepkinaAxios } from '../BezlepkinaPage';

const BezlepkinaManufacture = () => {

    const [ManufactureList, setManufactureList] = useState<Manufacture[]>([])

    const getManufacture = () => {
        BezlepkinaAxios.get<{ items: Manufacture[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items)
            })
    }
    useEffect(() => {
        getManufacture();
    },[])

    const onDeleteClick = (id: number) => {
        BezlepkinaAxios.delete(`https://canstudy.ru/orderapi/manufacturer/${id}`)
            .then(res => {
                setManufactureList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onCreate = (Manufacture: Manufacture) => {
        setManufactureList(prev => [...prev, Manufacture])
    }

    const columns: GridColDef[] = [{
            field: 'id',
            headerName: 'Id'
         },
        {
            field: 'name',
            headerName: 'название',
            flex:1
        },
        {
            field: 'country',
            headerName: 'страна',
             flex: 1
        },
        {
            field: 'city',
            headerName: 'город',
            flex: 1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>

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
    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editManufacture, setEditManufacture] = useState<Manufacture | null>(null)


    const onEditClick = (id: number) => {
        const Manufacture = ManufactureList.find(el => el.id === id)!;
        setEditManufacture(Manufacture)
    }
    const onEdit = (Manufacture: Manufacture) => {
        setManufactureList(prev => {
            const curManufacture = prev.find(el => el.id === Manufacture.id)!;

            curManufacture.name=Manufacture.name;
            curManufacture.name=Manufacture.country;
            curManufacture.name = Manufacture.city;

            return [...prev]
        })
    }



    return (
        <div style={{width: '100%'}}>

          {createPopupOpened && <CreateManufacturePopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newManufacture) => onCreate(newManufacture)}
            />}

            {editManufacture !== null && <EditManufacturePopApp
                open={editManufacture !== null}
                onClose={() => setEditManufacture(null)}
                Manufacture={editManufacture}
                onEdit={(EditManufacture) => onEdit(EditManufacture)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Manufacture </h1>
            </div>

            <div>
                <Button color={'primary'}
                    variant={'contained'}
                    onClick={() => setCreatePopupOpened(true)}>
                    Add manufacturer
                </Button>
            </div>

            <div style={{height: '80vh', width: '100%'}}>
                <DataGrid
                    rows={ManufactureList}
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
}
export default BezlepkinaManufacture;