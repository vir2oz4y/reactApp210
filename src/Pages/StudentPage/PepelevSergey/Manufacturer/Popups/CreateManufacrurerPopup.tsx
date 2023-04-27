import React, {useState, useEffect} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Manufacturer} from "../model";
import axios from "axios";
import {pepelevAxios} from "../../PepelevSergeyPage";


type Props = IPopup & {
    onCreate:(newManufacturer:Manufacturer)=>void;
}
const CreateManufacturerPopup = ({open, onClose, onCreate}:Props) => {
    const createManufacturer = () => {
        pepelevAxios.post<{ item:Manufacturer }>('https://canstudy.ru/orderapi/Manufacturer',
            {
                name:manufacturer.name,
                city:manufacturer.city,
                country:manufacturer.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const [manufacturerName, setManufacturerName] = useState('')
    const [manufacturer, setManufacturer] = useState<Manufacturer>({
        id:0,
        name: '',
        country: '',
        city:''
    })
    const onCreateClick = () => {
        createManufacturer()

        onClose();
    }
    return (
        <PepelevPopup
            title={'Создание категории'}
            open={open}
            onClose={()=> onClose()}>
            <div style={{display:"flex", flexDirection:"column", gap: "1em"}}>
                <TextField label="Название поставщика" variant="standard" fullWidth={true}
                           value={manufacturer.name}
                           onChange={e=>setManufacturer(prev =>(
                               {...prev, name: e.target.value}
                           ))}
                />

                <TextField label="Страна" variant="standard" fullWidth={true}
                           value={manufacturer.country}
                           onChange={e=>setManufacturer(prev =>(
                               {...prev, country: e.target.value}
                           ))}
                />

                <TextField label="Город" variant="standard" fullWidth={true}
                           value={manufacturer.city}
                           onChange={e=>setManufacturer(prev =>(
                               {...prev, city: e.target.value}
                           ))}
                />
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Button color={'primary'}
                        variant={'contained'}
                        onClick={()=>onCreateClick()}>
                    Создать
                </Button>
            </div>
        </PepelevPopup>
    );
};

export default CreateManufacturerPopup;