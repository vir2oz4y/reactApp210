import {Button, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
//import manufacture from "./models";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ageevAxios} from '../AgeevAlexandrPage';
import {Manufacture} from "./models";
import CreateManufacturePopup from "./Popups/CreateManufacturePopup";
import EditManufacturePopup from "./Popups/EditManufacturePopup";

const ManufacturePage = () => {

    const [manufactureList, setManufactureList] = useState<Manufacture[]>([])

    const getManufacturies = () => {
        ageevAxios.get<{ items: Manufacture[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items);
            })
    }


    useEffect(() => {
        getManufacturies();
    }, [])


    const onDeleteClick = (id: number) => {

        ageevAxios.delete(`https://canstudy.ru/orderapi/manufacturer/${id}`)
            .then(res => {
                setManufactureList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id: number) => {
        const manufacture = manufactureList.find(el => el.id === id)!;
        setEditmanufacture(manufacture)
    }

    const onCreate = (manufacture: Manufacture) => {
        setManufactureList(prev => [...prev, manufacture])
    }

    const onEdit = (manufacture: Manufacture) => {
        setManufactureList(prev => {
            const curmanufacture = prev.find(el => el.id === manufacture.id)!;

            curmanufacture.name = manufacture.name;
            curmanufacture.country = manufacture.country;
            curmanufacture.city = manufacture.city;

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
            headerName: 'Название',
            flex: 1
        },
        {
            field: 'country',
            headerName: 'Страна',
            flex: 1
        },
        {
            field: 'city',
            headerName: 'Город',
            flex: 1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{display: 'flex', gap: '1em'}}>

                    <IconButton
                        aria-label="edit"
                        onClick={() => onEditClick(e.row.id)}
                    >
                        <EditIcon/>
                    </IconButton>

                    <IconButton
                        onClick={() => onDeleteClick(e.row.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            }
        }
    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editmanufacture, setEditmanufacture] = useState<Manufacture | null>(null)

    return (
        <div style={{width: '100%'}}>

            {createPopupOpened && <CreateManufacturePopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newManufacture) => onCreate(newManufacture)}
            />}

            {editmanufacture !== null && <EditManufacturePopup
                open={editmanufacture !== null}
                onClose={() => setEditmanufacture(null)}
                Manufacture={editmanufacture}
                onEdit={(editmanufacture) => onEdit(editmanufacture)}
            />}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Производители</h1>

                <div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => setCreatePopupOpened(true)}
                    >
                        Добавить производителя
                    </Button>

                </div>
            </div>


            <div style={{height: '80vh', width: '100%'}}>
                <DataGrid
                    rows={manufactureList}
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

export default ManufacturePage;