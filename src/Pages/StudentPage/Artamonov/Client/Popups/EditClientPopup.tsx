import React, { useState } from 'react';
import KurgankovPopup, { IPopup } from "../../../../../Components/Artamonov/ArtamonovPopup/ArtamonovPopup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Client } from "../models";
import { artamonovAxios } from "../../ArtamonovPage";

type Props = IPopup & {
    onEdit: (newClient: Client) => void;
    client: Client
}

const EditClientPopup = ({ open, onClose, client: clientEdit, onEdit }: Props) => {

    const [client, setClient] = useState(clientEdit)

    const onEditClick = () => {

        artamonovAxios.patch<{ item: Client }>('https://canstudy.ru/orderapi/Client',
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
        <KurgankovPopup
            title={'��������� �������'}
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
                    <InputLabel id="sex">���</InputLabel>
                    <Select
                        labelId="sex"
                        value={client.sex}
                        label="���"
                        onChange={(e) => setClient(prev => ({ ...prev, sex: e.target.value as any }))}
                    >
                        <MenuItem value={0}>�������</MenuItem>
                        <MenuItem value={1}>�������</MenuItem>
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
                        onClick={() => onEditClick()}
                    >
                        ��������
                    </Button>
                </div>

            </div>
        </KurgankovPopup>
    );
};

export default EditClientPopup;