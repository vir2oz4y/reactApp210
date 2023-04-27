import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Manufacturer} from "../models";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {BezlepkinaAxios} from "../../BezlepkinaPage";


type Props=IPopup &{
    onEdit:(newManufacturer:Manufacturer)=>void;
    Manufacturer:Manufacturer;
}
const EditManufacturerPopApp = ({open, onClose,Manufacturer,onEdit}:Props) => {

    const [ManufacturerEdit,setManufacturerEdit]=useState<Manufacturer>(Manufacturer)
    const onEditClick=()=>{
        BezlepkinaAxios.patch<{ item:Manufacturer}>('https://canstudy.ru/orderapi/manufacturer',
            {
                item: {
                    id: ManufacturerEdit.id,
                    name: ManufacturerEdit.name,
                    city: ManufacturerEdit.city,
                    country: ManufacturerEdit.country,
                }
            })
                .then(res=>{
                    onEdit(ManufacturerEdit)
                    onClose();
                })
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
                    value={ManufacturerEdit.country}
                    onChange={e=>setManufacturerEdit(prev=>(
                        {...prev,country:e.target.value}
                    ))}
                    fullWidth={true}/>
                <TextField
                    label={"название"}
                    variant={"standard"}
                    value={ManufacturerEdit.name}
                    onChange={e=>setManufacturerEdit(prev=>(
                        {...prev,name:e.target.value}
                    ))}
                    fullWidth={true}/>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={()=>onEditClick()}

                    >
                        create
                    </Button>
                </div>
            </div>
        </BezlepkinaPopup>
    );
};
export default EditManufacturerPopApp;