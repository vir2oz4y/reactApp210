import React, {useEffect, useState} from 'react';
import KiryutinPopup, {IPopup} from "../../../../../Components/KiryutinVlad/KiryutinPopup/KiryutinPopup";
import {Button, TextField} from "@mui/material";
import {Manufacturer} from "../model";
import {kiryutinAxios} from "../../KiryutinVladPage";
import {applyInitialState} from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";

type Props = IPopup & {
    onCreate: (newManufacturer:Manufacturer) => void;
}

const CreateManufacturerPopup = ({open, onClose, onCreate}:Props) => {
    const createManufacturer = () => {
        kiryutinAxios.post<{ item:Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
            {
                name:manufacturer.name,
                city:manufacturer.city,
                country:manufacturer.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const [manufacturer, setManufacturer] = useState<Manufacturer>({
        id:0,
        name:"",
        country:"",
        city:""
    })


    const onCreateClick = () => {
        createManufacturer()

        onClose();
    }

    return (
        <KiryutinPopup open={open} onClose={() => onClose()} title={"Создать производителя"}>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <TextField
                    id="standard-basic"
                    label="Название поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturer.name}
                    onChange={e => setManufacturer(prev => ({...prev, name: e.target.value}))}
                />
                <TextField
                    id="standard-basic"
                    label="Город поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturer.city}
                    onChange={e => setManufacturer(prev => ({...prev, city: e.target.value}))}
                />
                <TextField
                    id="standard-basic"
                    label="Страна поставщика"
                    variant="standard"
                    fullWidth={true}
                    value={manufacturer.country}
                    onChange={e => setManufacturer(prev => ({...prev, country: e.target.value}))}
                />
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => onCreateClick()}
                >Создать</Button>
            </div>
        </KiryutinPopup>
    )
}

export default CreateManufacturerPopup;