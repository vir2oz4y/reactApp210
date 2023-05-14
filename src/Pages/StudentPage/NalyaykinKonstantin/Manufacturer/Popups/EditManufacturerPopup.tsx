import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {Manufacturer} from "../models";
import NalyaykinPopup, {IPopup} from "../../../../../Components/Nalyaykin/NalyaykinPopup/NalyaykinPopup";
import {nalyaykinAxios} from "../../NalyaykinPage";

type Props = IPopup & {
    onEdit:(newManufacturer:Manufacturer) => void;
    Manufacturer: Manufacturer
}

const EditManufacturerPopup = ({open, onClose, Manufacturer, onEdit}:Props) => {

    const [manufacturerEdit, setManufacturerEdit] = useState(Manufacturer)


    const onEditClick = () => {
        nalyaykinAxios.patch<{ item:Manufacturer }>(`https://canstudy.ru/orderapi/Manufacturer`,
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
        <NalyaykinPopup title='Создание категории' open={open} onClose={() => onClose()}>
            <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value = {manufacturerEdit.name} onChange={e => setManufacturerEdit(prev => ({...prev, name: e.target.value}))} />

                <TextField label="Страна" variant="standard" fullWidth={true}
                           value = {manufacturerEdit.country} onChange={e => setManufacturerEdit(prev => ({
                    ...prev, country: e.target.value
                }))} />

                <TextField label="Город" variant="standard" fullWidth={true}
                           value = {manufacturerEdit.city} onChange={e => setManufacturerEdit(prev => ({
                    ...prev, city: e.target.value
                }))} />

                <div style = {{display: 'flex', justifyContent:'center'}}>
                    <Button color = {'primary'} variant = {'contained'} onClick={() => onEditClick()}>
                        Создать
                    </Button>
                </div>
            </div>
        </NalyaykinPopup>
    );
};

export default EditManufacturerPopup;