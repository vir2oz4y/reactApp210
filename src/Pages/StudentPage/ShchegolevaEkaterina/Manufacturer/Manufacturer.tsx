import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { shchegolevaAxios } from '../ShchegolevaEkaterinaPage';
import {Manufacturer} from "./Models";
import CreateManufacturerPopup from "./Popups/CreateManufaturePopup";
import EditCategoryPopup from "../Category/Popups/EditCategoryPopup";
import EditManufacturerPopup from "./Popups/EditManufacturePopup";

const ShchegolevaManufacturer = () => {
    const [authToken, setAuthToken] = useState('');

    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([])

    //const doLogin = () => {
    //    axios.post<{authToken:string}>('https://canstudy.ru/orderapi/user/login', {
    //        identifier: '993D0C6A-3CFB-456C-9BA5-ADD5BC9FB80D'
    //    })
    //        .then(res => {
    //            setAuthToken(res.data.authToken)
    //        })
    //}

    const getManufacturers = () => {
        shchegolevaAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufacturerList(res.data.items)
            })
    }

    //useEffect(() => {
    //    doLogin();
    //},[])

    useEffect(() => {
        getManufacturers();
    },[])


    const onDeleteClick = (id: number) => {
        shchegolevaAxios.delete(`https://canstudy.ru/orderapi/manufacturer/` + id)
            .then(() => {
                setManufacturerList(prev=>prev.filter(el=>el.id !==id))
            })

    }
    const onEditClick = (id: number) => {
        const manufacturer=manufacturerList.find(el=>el.id===id)!;
        setEditManufacturer(manufacturer);
    }


    const onCreate=(manufacturer:Manufacturer)=>{
        setManufacturerList(prev=>[...prev,manufacturer])
    }

    const onEdit=(manufacturer:Manufacturer)=>{
        setManufacturerList(prev=>{
            const curmanufacturer=prev.find(el=>el.id===manufacturer.id)!
            curmanufacturer.name=manufacturer.name
            curmanufacturer.country=manufacturer.country
            curmanufacturer.city=manufacturer.city
            return[...prev]
        })
    }
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName:'Id'
        },
        {
            field: 'name',
            headerName: 'Name', flex:1
        },
        {
            field: 'country',
            headerName: 'country', flex:1
        },
        {
            field: 'city',
            headerName: 'city'
        },
        {
            field: '',
            headerName:'',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>
                    <IconButton aria-label="edit"
                                onClick={()=>onEditClick(e.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={()=>onDeleteClick(e.row.id)}
                                aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }

    ]

    const [createPopupOpened, setCreatePopupOpened]=useState(false)

    const [editManufacturer,setEditManufacturer]=useState<Manufacturer|null>(null)
    return (
        <div style={{ width: '100%' }}>

            {createPopupOpened && <CreateManufacturerPopup open={createPopupOpened}
                                                       onClose={()=>setCreatePopupOpened(false)}
                                                       onCreate={(newManufacturer)=>onCreate(newManufacturer)}/>}


            {editManufacturer !== null && <EditManufacturerPopup
                open={editManufacturer!==null}
                onClose={()=>setEditManufacturer(null)}
                Manufacturer={editManufacturer}
                onEdit={(editManufacturer)=>onEdit(editManufacturer)}/>}

            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems:'center'
            }}>
                <div>
                    <h1>Manufacturer</h1>
                </div>
                <div>
                    <Button variant="contained"
                            onClick={()=>setCreatePopupOpened(true)}>
                        Add Manufacturer
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
                    /*checkboxSelection*/
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ShchegolevaManufacturer;