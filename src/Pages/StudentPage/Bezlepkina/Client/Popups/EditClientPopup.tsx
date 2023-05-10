import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import BezlepkinaPopup, { IPopup } from '../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import { BezlepkinaAxios } from '../../BezlepkinaPage';
import { Client } from '../models';

type Props = IPopup & {
    onEdit: (newClient: Client) => void;
    Client: Client
}

const EditClientPopup = ({ open, onClose, Client: clientEdit, onEdit }: Props) => {

    const [Client, setClient] = useState(clientEdit)

    const onEditClick = () => {

        BezlepkinaAxios.patch<{ item: Client }>('https://canstudy.ru/orderapi/Client',
            {
                item: {
                    ...Client
                }
            })
            .then(res => {
                onEdit(res.data.item)
                onClose();
            })
    }

    return (
        <BezlepkinaPopup
            title={'edit Client'}
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
                    <InputLabel id="sex">sex</InputLabel>
                    <Select
                        labelId="sex"
                        value={Client.sex}
                        label="sex"
                        onChange={(e) => setClient(prev => ({ ...prev, sex: e.target.value as any }))}
                    >
                        <MenuItem value={0}>women</MenuItem>
                        <MenuItem value={1}>men</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    label="name"
                    variant="standard"
                    fullWidth={true}
                    value={Client.firstName}
                    onChange={e => setClient(prev => ({ ...prev, firstName: e.target.value }))}
                />

                <TextField
                    label="lastname"
                    variant="standard"
                    fullWidth={true}
                    value={Client.lastName}
                    onChange={e => setClient(prev => ({ ...prev, lastName: e.target.value }))}
                />

                <TextField
                    label="email"
                    variant="standard"
                    fullWidth={true}
                    value={Client.email}
                    onChange={e => setClient(prev => ({ ...prev, email: e.target.value }))}
                />

                <TextField
                    label="telephone"
                    variant="standard"
                    fullWidth={true}
                    value={Client.phoneNumber}
                    onChange={e => setClient(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onEditClick()}
                    >
                        edit
                    </Button>
                </div>

            </div>
        </BezlepkinaPopup>
    );
};

export default EditClientPopup;