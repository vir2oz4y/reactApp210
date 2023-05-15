import React, { useEffect, useState } from 'react';
import FilipushkoPopup, { IPopup } from "../../../../../Components/filipushko/1Popup/1Popup";
import { Button, TextField } from "@mui/material";
import { Manufacturer } from "../Models";
import axios from 'axios';
import { filipushkoAxios } from '../../filipushkoPage';

type Props = IPopup & {
    onCreate: (newManufacturer: Manufacturer) => void;
}

const CreateManufacturerPopup = ({ open, onClose, onCreate }: Props) => {





    const createManufacturer = () => {
        filipushkoAxios.post<{ item: Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
            {
                name: manufacturer.name,
                city: manufacturer.city,
                country: manufacturer.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const [manufacturer, setManufacturer] = useState<Manufacturer>({
        id: 0,
        name: '',
        city: '',
        country: ''
    })


    const onCreateclick = () => {
        createManufacturer();
        onClose()
    }

    return (
        <FilipushkoPopup title='create category' open={open} onClose={() => onClose()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <TextField label="Name manufacturer" variant="standard" fullWidth={true}
                    value={manufacturer.name} onChange={e => setManufacturer(prev => ({
                        ...prev, name: e.target.value
                    }))} />

                <TextField label="country" variant="standard" fullWidth={true}
                    value={manufacturer.country} onChange={e => setManufacturer(prev => ({
                        ...prev, country: e.target.value
                    }))} />

                <TextField label="city" variant="standard" fullWidth={true}
                    value={manufacturer.city} onChange={e => setManufacturer(prev => ({
                        ...prev, city: e.target.value
                    }))} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color={'primary'} variant={'contained'} onClick={() => onCreateclick()}>
                        create
                    </Button>
                </div>
            </div>
        </FilipushkoPopup>
    );
};

export default CreateManufacturerPopup;