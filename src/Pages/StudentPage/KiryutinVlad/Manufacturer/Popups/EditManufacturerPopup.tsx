import React, {useState} from 'react';
import KiryutinPopup, {IPopup} from "../../../../../Components/KiryutinVlad/KiryutinPopup/KiryutinPopup";
import {Manufacturer} from "../model";
import {Button, TextField} from "@mui/material";
import {kiryutinAxios} from "../../KiryutinVladPage";

type Props = IPopup & {
    onEdit: (newManufacturer:Manufacturer) => void;
    manufacturer:Manufacturer;
}

const EditManufacturerPopup = ({open, onClose, manufacturer, onEdit}:Props) => {

    const editManufacturer = () => {
        kiryutinAxios.patch<{ item:Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
            {
                item: {
                    id:manufacturer.id,
                    name:manufacturer.name,
                    city:manufacturer.city,
                    country:manufacturer.country
                }
            })
            .then(res => {
                onEdit(manufacturerEdit)
                onClose();
            })
    }

    const [manufacturerEdit, setManufacturerEdit] = useState(manufacturer)

    const onEditClick = () => {
        editManufacturer();
    }

    return (
        <KiryutinPopup open={open} onClose={() => onClose()} title={"Изменить поставщика"}>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <TextField
                    id="standard-basic"
                    label="Название поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturerEdit.name}
                    onChange={e => setManufacturerEdit(prev => ({...prev, name:e.target.value}))}
                />

                <TextField
                    id="standard-basic"
                    label="Город поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturerEdit.city}
                    onChange={e => setManufacturerEdit(prev => ({...prev, city:e.target.value}))}
                />

                <TextField
                    id="standard-basic"
                    label="Страна поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturerEdit.country}
                    onChange={e => setManufacturerEdit(prev => ({...prev, country:e.target.value}))}
                />

                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => onEditClick()}
                >Изменить</Button>
            </div>
        </KiryutinPopup>
    )
}

export default EditManufacturerPopup;