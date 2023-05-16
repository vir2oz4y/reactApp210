import React, { useEffect, useState } from 'react';
import KurgankovPopup, { IPopup } from "../../../../../Components/Kurgankov/KurgankovPopup/KurgankovPopup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Client } from "../models";
import axios from 'axios';
import { kurgankovAxios } from '../../KurgankovPage';

type Props = IPopup & {
    onCreate: (newClient: Client) => void;
}

const CreateClientPopup = ({ open, onClose, onCreate }: Props) => {

    const createClient = () => {
        kurgankovAxios.post<{ item: Client }>('https://canstudy.ru/orderapi/Client',
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
        <KurgankovPopup
            title={'�������� �������'}
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
                    <InputLabel id="sex">���</InputLabel>
                    <Select
                        labelId="sex"
                        value={client.sex?.toString()}
                        label="���"
                        onChange={(e) => setClient(prev => ({ ...prev, sex: e.target.value as any }))}
                    >
                        <MenuItem value={"0"}>�������</MenuItem>
                        <MenuItem value={"1"}>�������</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    label="���"
                    variant="standard"
                    fullWidth={true}
                    value={client.firstName}
                    onChange={e => setClient(prev => ({ ...prev, firstName: e.target.value }))}
                />

                <TextField
                    label="�������"
                    variant="standard"
                    fullWidth={true}
                    value={client.lastName}
                    onChange={e => setClient(prev => ({ ...prev, lastName: e.target.value }))}
                />

                <TextField
                    label="�����"
                    variant="standard"
                    fullWidth={true}
                    value={client.email}
                    onChange={e => setClient(prev => ({ ...prev, email: e.target.value }))}
                />

                <TextField
                    label="�������"
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
                        �������
                    </Button>
                </div>

            </div>
        </KurgankovPopup>
    );
};

export default CreateClientPopup;