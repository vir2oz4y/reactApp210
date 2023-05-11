import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Client } from "./Model"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UdalovPopup from '../../../../Components/Udalov/UdalovPopup/UdalovPopup';
import CreateClientPopup from "./Popups/CreateClientPopup";
import axios from 'axios';
import { udalovAxios } from '../UdalovKirillPage';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EditClientPopup from "./Popups/EditClientPopup";

const ClientPage = () => {


    const [clientList, setClientList] = useState<Client[]>([])

    /*    const [authToken, setAuthToken] = useState('');*/


    const getClient = () => {
        udalovAxios.get<{ items: Client[] }>('https://canstudy.ru/orderapi/client/list')
            .then(res => {
                setClientList(res.data.items);
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
        getClient();
    }, [])


    const deleteCategory = () => {

    }


    const onDeleteClick = (id: number) => {
        udalovAxios.delete(`https://canstudy.ru/orderapi/client/${id}`,
        )
            .then(res => {
                setClientList(prev => prev.filter(el => el.id !== id))
            })
    }

    const onEditClick = (id:number) => {
        const client = clientList.find(el => el.id === id)!;
        setEditClient(client)
    }

    const onCreate = (Client:Client) => {
        setClientList(prev => [...prev, Client])
    }

    const onEdit = (Client:Client) => {
        setClientList(prev => {
            const curClient = prev.find(el => el.id === Client.id)!;

            if (curClient) {
                curClient.firstName = Client.firstName;
                curClient.lastName = Client.lastName;
                curClient.phoneNumber = Client.phoneNumber;
                curClient.email = Client.email;
                curClient.sex = Client.sex;
            }

            return[...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'sex',
            headerName: 'Пол',
            flex: 1,
            renderCell:(e)=>{
                if (e.value?.toString() === "0")
                    return <MaleIcon/>

                return <FemaleIcon/>
            }
        },
        {
            field: 'firstName',
            headerName: 'Имя',
            flex: 1
        },
        {
            field: 'lastName',
            headerName: 'Фамилия',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Почта',
            flex: 1
        },
        {
            field: 'phoneNumber',
            headerName: 'Телефон',
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

    const [editClient, setEditClient] = useState<Client|null>(null)

    return (
        <div style={{ width: '100%' }}>


            {createPopupOpened && <CreateClientPopup
                open = {createPopupOpened}
                onClose = {() => setCreatePopupOpened(false)}
                onCreate={(newClient:Client) => onCreate(newClient)}/>}

            {editClient !== null && <EditClientPopup
                open = {editClient !== null}
                onClose={() => setEditClient(null)}
                client = {editClient}
                onEdit={(editClient) => {onEdit(editClient)}}/>}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>Category</h1>
                <div>
                    <Button color={'primary'} variant={'contained'} onClick={() => setCreatePopupOpened(true)}>
                        Add Client
                    </Button>
                </div>
            </div>

            <div style={{ height: '80vh', width:'100%' }}>
                <DataGrid
                    rows={clientList}
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

export default ClientPage;