import React, {useState} from 'react';
import ShchegolevaPopup, {IPopup} from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Manufacturer } from '../Models';
import { shchegolevaAxios } from '../../ShchegolevaEkaterinaPage';
type Props=IPopup & {
    onEdit:(newManufacturer:Manufacturer)=>void
    Manufacturer:Manufacturer;
}
const EditManufacturerPopup = ({open, onClose,Manufacturer, onEdit}:Props) => {
    const [ManufacturerEdit, setManufacturerEdit]=useState(Manufacturer)

    const onEditClick = () => {
        shchegolevaAxios.patch('https://canstudy.ru/orderapi/manufacturer', { item:{id:ManufacturerEdit.id,
        name:ManufacturerEdit.name, city:ManufacturerEdit.city, country:ManufacturerEdit.country}})
            .then(() => {
                onEdit(ManufacturerEdit);
            })

        onClose();
    }
    return (
        <ShchegolevaPopup title={'Manufacturer  create'} open={open} onClose={() => onClose()}>
            <div style={{display:'flex', flexDirection:'column', gap:'1em'}} >
                <TextField label="name Manufacturer" variant="outlined" value={ManufacturerEdit.name} fullWidth={true}
                           onChange={e=>setManufacturerEdit(prev=>({...prev,name:e.target.value}))}/>

                <TextField label="country Manufacturer" variant="outlined" value={ManufacturerEdit.country} fullWidth={true}
                           onChange={e=>setManufacturerEdit(prev=>({...prev, country: e.target.value}))}/>


                <TextField label="city Manufacturer" variant="outlined" value={ManufacturerEdit.city} fullWidth={true}
                           onChange={e=>setManufacturerEdit(prev=>({...prev, city: e.target.value}))}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" onClick={()=>onEditClick()}>
                        create
                    </Button>
                </div>
            </div>
        </ShchegolevaPopup>
    );
};

export default EditManufacturerPopup;