import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Button, Input} from '@mui/material';
import TextField from "@mui/material/TextField";
import { BezlepkinaAxios } from '../../BezlepkinaPage';
import {Manufacturer} from '../models';

type Props=IPopup &{
    onCreate:(newManufacturer:Manufacturer)=>void;
}
const CreateManufacturerPopup = ({open, onClose,onCreate}:Props) => {

    const [manufacture,setManufacture]=useState<Manufacturer>(
        {
            id:0,
            name:'',
            country:'',
            city:''
        }
    )

    const CreateManufacturer = () => {
        BezlepkinaAxios.post<{ item:Manufacturer}>('https://canstudy.ru/orderapi/user/login',
            {
                name: manufacture.name,
                city: manufacture.city,
                country: manufacture.country,
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const onCreateClick=()=>{
        CreateManufacturer()
        onClose()
    }
    return (
        <BezlepkinaPopup
            title={'Manufacturer create'}
            open={open}
            onClose={() => onClose()}
        >
            <div>
                <TextField
                    label={"Страна"}
                    variant={"standard"}
                    value={manufacture.country}
                    onChange={e=>setManufacture(prev=>(
                        {...prev,country:e.target.value}
                    ))}
                    fullWidth={true}/>
                <TextField
                    label={"название"}
                    variant={"standard"}
                    value={manufacture.name}
                    onChange={e=>setManufacture(prev=>(
                        {...prev,name:e.target.value}
                    ))}
                    fullWidth={true}/>
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

export default CreateManufacturerPopup;