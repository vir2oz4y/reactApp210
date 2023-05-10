import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Client } from './Models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { shchegolevaAxios } from '../ShchegolevaEkaterinaPage';
import CreateClientPopup from "./Popups/CreateClientPopup";
import EditClientPopup from "./Popups/EditClientPopup";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const ShchegolevaClient = () => {

    const [ClientList, setClientList] = useState<Client[]>([])

    const getClients = () => {
        shchegolevaAxios.get<{ items: Client[] }>('https://canstudy.ru/orderapi/Client/list')
            .then(res => {
                setClientList(res.data.items);
            })
    }


    useEffect(() => {
        getClients();
    }, [])


    const onDeleteClick = (id: number) => {
        shchegolevaAxios.delete(`https://canstudy.ru/orderapi/Client/${id}`)
            .then(res => {
                setClientList(prev =>
                    prev.filter(el => el.id !== id)
                )
            })
    }

    const onEditClick = (id: number) => {
        const Client = ClientList.find(el => el.id === id)!;
        setEditClient(Client)
    }

    const onCreate = (Client: Client) => {
        setClientList(prev => [...prev, Client])
    }

    const onEdit = (Client: Client) => {
        setClientList(prev => {
            const curClient = prev.find(el => el.id === Client.id)!;

            if (curClient) {
                curClient.firstName = Client.firstName;
                curClient.lastName = Client.lastName;
                curClient.phoneNumber = Client.phoneNumber;
                curClient.email = Client.email;
                curClient.sex = Client.sex;
            }

            return [...prev]
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id'
        },
        {
            field: 'sex',
            headerName: 'Sex',
            flex: 1,
            renderCell: (e) => {
                if (e.value?.toString() === "0")
                    return <MaleIcon />
                return <FemaleIcon />
            }
        },
        {
            field: 'firstName',
            headerName: 'FirstName',
            flex: 1
        },
        {
            field: 'lastName',
            headerName: 'LastName',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'phoneNumber',
            headerName: 'PhoneNumber',
            flex: 1
        },
        {
            field: '',
            headerName: '',
            renderCell: (e: any) => {
                return <div style={{ display: 'flex', gap: '1em' }}>

                    <IconButton aria-label="edit"
                        onClick={() => onEditClick(e.row.id)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete"
                        onClick={() => onDeleteClick(e.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        }
    ]

    const [createPopupOpened, setCreatePopupOpened] = useState(false)

    const [editClient, setEditClient] = useState<Client | null>(null)

    return (
        <div style={{ width: '100%' }}>

            {createPopupOpened && <CreateClientPopup
                open={createPopupOpened}
                onClose={() => setCreatePopupOpened(false)}
                onCreate={(newClient) => onCreate(newClient)}/>}


            {editClient !== null && <EditClientPopup
                open={editClient !== null}
                onClose={() => setEditClient(null)}
                client={editClient}
                onEdit={(editClient) => onEdit(editClient)}/>}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <h1>Client</h1>

                <div>
                    <Button color={'primary'} variant={'contained'}
                        onClick={() => setCreatePopupOpened(true)}>
                        Add client
                    </Button>

                </div>
            </div>

            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={ClientList}
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

export default ShchegolevaClient;