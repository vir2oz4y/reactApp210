import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import {sakoyanAxios} from "../SakoyanIvanPage";
import {Manufacturer} from "./Models";
import CreateManufacturerPopup from "./Popups/CreateManufacturerPopup";
import EditManufacturerPopup from "./Popups/EditManufacturerPopup";

const ManufacturerPage = () => {

    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    const getManufacturersFromHost = () => {
        sakoyanAxios.get<{ items:Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items)
            })
    }

    const removeManufacturerFromHost = (id:number) => {
        sakoyanAxios.delete('https://canstudy.ru/orderapi/manufacturer/' + id)
            .then(() => {
                setManufacturerList(prev =>
                    prev.filter(el => el.id !== id))
            })
    }

    useEffect(() => {
        getManufacturersFromHost();
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
            const curManufacturer = prev.find(el => el.id === manufacturer.id)

            curManufacturer.name = manufacturer.name;
            curManufacturer.city = manufacturer.city;
            curManufacturer.country = manufacturer.country;

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
            headerName: 'Name',
            flex:1
        },
        {
            field: 'city',
            headerName: 'City',
            flex:1
        },
        {
            field: 'country',
            headerName: 'Country',
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
                <h1>Производители товаров:</h1>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    size="medium"
                    onClick={() => setCreatePopupOpened(true)}>
                    Создать производителя
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