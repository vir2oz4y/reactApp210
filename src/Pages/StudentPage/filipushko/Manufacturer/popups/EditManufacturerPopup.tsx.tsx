import React, { useState } from 'react';
import FilipushkoPopup, { IPopup } from "../../../../../Components/filipushko/1Popup/1Popup";
import { Button, TextField } from "@mui/material";
import { Manufacturer } from "../Models";
import { filipushkoAxios } from '../../filipushkoPage';

type Props = IPopup & {
    onEdit: (newManufacturer: Manufacturer) => void;
    Manufacturer: Manufacturer
}

const EditManufacturerPopup = ({ open, onClose, Manufacturer, onEdit }: Props) => {

    const [manufacturerEdit, setManufacturerEdit] = useState(Manufacturer)


    const onEditClick = () => {
        filipushkoAxios.patch<{ item: Manufacturer }>(`https://canstudy.ru/orderapi/Manufacturer`,
            {
                item: {
                    id: manufacturerEdit.id,
                    name: manufacturerEdit.name,
                    city: manufacturerEdit.city,
                    country: manufacturerEdit.country
                }
            }
        )
            .then(res => {
                onEdit(manufacturerEdit)
                onClose();
            })
    }

    return (
        <FilipushkoPopup title='Create category' open={open} onClose={() => onClose()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <TextField label="Name category" variant="standard" fullWidth={true}
                    value={manufacturerEdit.name} onChange={e => setManufacturerEdit(prev => ({ ...prev, name: e.target.value }))} />

                <TextField label="country" variant="standard" fullWidth={true}
                    value={manufacturerEdit.country} onChange={e => setManufacturerEdit(prev => ({
                        ...prev, country: e.target.value
                    }))} />

                <TextField label="city" variant="standard" fullWidth={true}
                    value={manufacturerEdit.city} onChange={e => setManufacturerEdit(prev => ({
                        ...prev, city: e.target.value
                    }))} />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color={'primary'} variant={'contained'} onClick={() => onEditClick()}>
                        create
                    </Button>
                </div>
            </div>
        </FilipushkoPopup>
    );
};

export default EditManufacturerPopup;