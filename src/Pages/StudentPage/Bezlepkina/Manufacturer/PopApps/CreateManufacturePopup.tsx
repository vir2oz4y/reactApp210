import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Button, Input} from '@mui/material';
import TextField from "@mui/material/TextField";
import { BezlepkinaAxios } from '../../BezlepkinaPage';
import {Manufacture} from '../models';

type Props=IPopup &{
    onCreate:(newManufacture:Manufacture)=>void;
}

const CreateManufacturePopup = ({open, onClose,onCreate}:Props) => {

    const [manufacture,setManufacture]=useState<Manufacture>(
        {
            id:0,
            name:'',
            country:'',
            city:''
        }
    )

    const CreateManufacture = () => {
        BezlepkinaAxios.post<{ item: Manufacture }>('https://canstudy.ru/orderapi/manufacturer',
            {
                name: manufacture.name,
                city: manufacture.city,
                country: manufacture.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const onCreateClick=()=>{
        CreateManufacture();
        onClose();
    }

    return (
        <BezlepkinaPopup
            title={'Manufacture create'}
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
                <TextField
                    label="название"
                    variant="standard"
                    value={manufacture.name}
                    onChange={e => setManufacture(prev => (
                        { ...prev, name: e.target.value }
                    ))}
                    fullWidth={true}
                />

                <TextField
                    label="Страна"
                    variant="standard"
                    value={manufacture.country}
                    onChange={e=>setManufacture(prev=>(
                        {...prev,country:e.target.value}
                    ))}
                    fullWidth={true}
                />
              
                <TextField
                    label="Город"
                    variant="standard"
                    fullWidth={true}
                    value={manufacture.city}
                    onChange={e => setManufacture(prev => (
                        { ...prev, city: e.target.value }
                    ))}
                />

                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={()=>onCreateClick()}

                    >
                        create

                    </Button>
                </div>
            </div>
        </BezlepkinaPopup>
    );
};

export default CreateManufacturePopup;