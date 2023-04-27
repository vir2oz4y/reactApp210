import React, {useEffect, useState} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Manufacturer} from "../model";
import axios from "axios/index";
import {pepelevAxios} from "../../PepelevSergeyPage"
import {Category} from "../../Category/model";

type Props = IPopup & {
    onEdit:(newManufacturer:Manufacturer)=>void;
    manufacturer:Manufacturer
}
const EditManufacturerPopup = ({open, onClose, manufacturer, onEdit}:Props) => {

    // TODO:
    const editManufacturer = () => {
        pepelevAxios.patch<{ item:Manufacturer }>('https://canstudy.ru/orderapi/Manufacturer',
            {
                id:manufacturer.id,
                name:manufacturer.name
            })
            .then(res => {
                onEdit(res.data.item)
            })
    }

    const [manufacturerEdit, setManufacturerEdit] = useState(manufacturer)

    const onEditClick = () => {
        pepelevAxios.patch<{ item:Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
            {
                item:{
                    id:manufacturer.id,
                    name:manufacturer.name,
                    city:manufacturer.city,
                    country:manufacturer.city}
            })
            .then(res => {
                onEdit(manufacturerEdit)
                onClose();
            })
    }
    return (
        <PepelevPopup
            title={'Создание категории'}
            open={open}
            onClose={()=> onClose()}>
            <div style={{display:"flex", flexDirection:"column", gap: "1em"}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value={manufacturerEdit.name}
                           onChange={e=>setManufacturerEdit(prev=> ({...prev, name: e.target.value}
                           ))}
                />
                <TextField label="Страна" variant="standard" fullWidth={true}
                           value={manufacturerEdit.country}
                           onChange={e=>setManufacturerEdit(prev =>(
                               {...prev, country: e.target.value}
                           ))}
                />

                <TextField label="Город" variant="standard" fullWidth={true}
                           value={manufacturerEdit.city}
                           onChange={e=>setManufacturerEdit(prev =>(
                               {...prev, city: e.target.value}
                           ))}
                />
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Button color={'primary'}
                        variant={'contained'}
                        onClick={()=>onEditClick()}>
                    изменить
                </Button>
            </div>
        </PepelevPopup>
    );
};

export default EditManufacturerPopup;