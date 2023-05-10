import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from 'axios';
import { BezlepkinaAxios } from '../../BezlepkinaPage';
import BezlepkinaPopup, { IPopup } from '../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';
import { Client } from '../models';

type Props = IPopup & {
    onCreate: (newClient: Client) => void;
}

const CreateClientPopup = ({ open, onClose, onCreate }: Props) => {

    const createClient = () => {
        BezlepkinaAxios.post<{ item: Client }>('https://canstudy.ru/orderapi/Client',
            {
                ...client
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const [client, setClient] = useState<Client>({
        sex: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        id: 0,
    })

    const onCreateClick = () => {
        createClient();

        onClose();
    }

    return (
        <BezlepkinaPopup
            title={'create Client'}
            open={open}
            onClose={() => onClose()}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    paddingTop: '1em'
                }}
            >

                <FormControl fullWidth>
                    <InputLabel id="sex">sex</InputLabel>
                    <Select
                        labelId="sex"
                        value={client.sex?.toString()}
                        label="sex"
                        onChange={(e) => setClient(prev => ({ ...prev, sex: e.target.value as any }))}
                    >
                        <MenuItem value={"0"}>women</MenuItem>
                        <MenuItem value={"1"}>men</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    label="name"
                    variant="standard"
                    fullWidth={true}
                    value={client.firstName}
                    onChange={e => setClient(prev => ({ ...prev, firstName: e.target.value }))}
                />

                <TextField
                    label="lastname"
                    variant="standard"
                    fullWidth={true}
                    value={client.lastName}
                    onChange={e => setClient(prev => ({ ...prev, lastName: e.target.value }))}
                />

                <TextField
                    label="email"
                    variant="standard"
                    fullWidth={true}
                    value={client.email}
                    onChange={e => setClient(prev => ({ ...prev, email: e.target.value }))}
                />

                <TextField
                    label="telephone"
                    variant="standard"
                    fullWidth={true}
                    value={client.phoneNumber}
                    onChange={e => setClient(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onCreateClick()}
                    >
                        create
                    </Button>
                </div>

            </div>
        </BezlepkinaPopup>
    );
};

export default CreateClientPopup;