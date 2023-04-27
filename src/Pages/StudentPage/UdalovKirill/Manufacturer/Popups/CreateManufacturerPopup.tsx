import React, {useEffect, useState} from 'react';
import UdalovPopup, {IPopup} from "../../../../../Components/Udalov/UdalovPopup/UdalovPopup";
import {Button, TextField} from "@mui/material";
import {Manufacturer} from "../Models";
import axios from 'axios';
import { udalovAxios } from '../../UdalovKirillPage';

type Props = IPopup & {
    onCreate:(newManufacturer:Manufacturer) => void;
}

const CreateManufacturerPopup = ({open, onClose, onCreate}:Props) => {


    /*   const [authToken, setAuthToken] = useState('');


       const doLogin = () => {
           axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
               identifier: '96CBFEBE-D484-433C-B511-ACFDCE2C57D0'
           })
               .then(res => {
                   setAuthToken(res.data.authToken)
               })
       }

       useEffect(() => {
           doLogin();
       }, [])*/


    const createManufacturer = () => {
        udalovAxios.post<{ item: Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
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
        <UdalovPopup title='Создание категории' open={open} onClose={() => onClose()}>
            <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <TextField label="Название Поставщика" variant="standard" fullWidth={true}
                           value = {manufacturer.name} onChange={e => setManufacturer(prev => ({
                            ...prev, name: e.target.value
                }))} />

                <TextField label="Страна" variant="standard" fullWidth={true}
                           value = {manufacturer.country} onChange={e => setManufacturer(prev => ({
                            ...prev, country: e.target.value
                }))} />

                <TextField label="Город" variant="standard" fullWidth={true}
                           value = {manufacturer.city} onChange={e => setManufacturer(prev => ({
                            ...prev, city: e.target.value
                }))} />
                <div style = {{display: 'flex', justifyContent:'center'}}>
                    <Button color = {'primary'} variant = {'contained'} onClick={() => onCreateclick()}>
                        Создать
                    </Button>
                </div>
            </div>
        </UdalovPopup>
    );
};

export default CreateManufacturerPopup;