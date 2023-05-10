import React, { useState } from 'react';
import ShchegolevaPopup, { IPopup } from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Client } from "../Models";
import { shchegolevaAxios } from '../../ShchegolevaEkaterinaPage';

type Props = IPopup & {
    onEdit: (newClient: Client) => void;
    client: Client
}

const EditClientPopup = ({ open, onClose, client: clientEdit, onEdit }: Props) => {

    const [client, setClient] = useState(clientEdit)

    const onEditClick = () => {

        shchegolevaAxios.patch<{ item: Client }>('https://canstudy.ru/orderapi/Client',
            {
                item: {
                    ...client
                }
            })
            .then(res => {
                onEdit(res.data.item)
                onClose();
            })
    }

    return (
        <ShchegolevaPopup
            title={'Client edit'}
            open={open}
            onClose={() => onClose()}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em'
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="sex">Sex</InputLabel>
                    <Select labelId="sex" value={client.sex} label="Sex"
                        onChange={(e) => setClient(prev => ({ ...prev, sex: e.target.value as any }))}>
                        <MenuItem value={0}>Female</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                    </Select>
                </FormControl>


                <TextField label="FirstName" variant="standard" fullWidth={true} value={client.firstName}
                    onChange={e => setClient(prev => ({ ...prev, firstName: e.target.value }))}/>

                <TextField label="LastName" variant="standard" fullWidth={true} value={client.lastName}
                    onChange={e => setClient(prev => ({ ...prev, lastName: e.target.value }))}/>

                <TextField label="Email" variant="standard" fullWidth={true} value={client.email}
                    onChange={e => setClient(prev => ({ ...prev, email: e.target.value }))}/>

                <TextField label="PhoneNumber" variant="standard" fullWidth={true} value={client.phoneNumber}
                    onChange={e => setClient(prev => ({ ...prev, phoneNumber: e.target.value }))}/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color={'primary'} variant={'contained'}
                        onClick={() => onEditClick()}>
                        Edit
                    </Button>
                </div>

            </div>
        </ShchegolevaPopup>
    );
};

export default EditClientPopup;