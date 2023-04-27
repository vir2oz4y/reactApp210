import React, {useEffect, useState} from 'react';
import ShchegolevaPopup, {IPopup} from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Manufacturer } from '../Models';
import axios from 'axios';
import { shchegolevaAxios } from '../../ShchegolevaEkaterinaPage';
type Props=IPopup & {
    onCreate:(newManufacturer:Manufacturer)=>void
}
const CreateManufacturerPopup = ({ open, onClose, onCreate }: Props) => {

    const [manufacture, setmanufacture] = useState<Manufacturer>({
        id:0,
        name:'',
        country:'',
        city:''
    })
    //const [authToken, setAuthToken] = useState('');

    //const doLogin = () => {
    //    axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
    //        identifier: '993D0C6A-3CFB-456C-9BA5-ADD5BC9FB80D'
    //    })
    //        .then(res => {
    //            setAuthToken(res.data.authToken)
    //        })
    //}

    //useEffect(() => {
    //    doLogin();
    //}, [])

    const createManufacturer = () => {
        shchegolevaAxios.post<{ item:Manufacturer }>('https://canstudy.ru/orderapi/manufacturer',
            {
                name:manufacture.name,
                city:manufacture.city,
                country:manufacture.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const onCreateClick=()=>{
        createManufacturer();
        onClose();
    }
    return (
        <ShchegolevaPopup title={'Manufacturer create'} open={open} onClose={() => onClose()}>
            <div style={{display:'flex', flexDirection:'column', gap:'1em'}} >
                <TextField label="name Manufacturer" variant="outlined" value={manufacture.name} fullWidth={true}
                           onChange={e=>setmanufacture(prev=>({...prev, name: e.target.value}))}/>

                <TextField label="country Manufacturer" variant="outlined" value={manufacture.country} fullWidth={true}
                           onChange={e=>setmanufacture(prev=>({...prev, country: e.target.value}))}/>

                <TextField label="city Manufacturer" variant="outlined" value={manufacture.city} fullWidth={true}
                           onChange={e=>setmanufacture(prev=>({...prev, city: e.target.value}))}/>

                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" onClick={()=>onCreateClick()}>
                        create
                    </Button>
                </div>
            </div>
        </ShchegolevaPopup>
    );
};

export default CreateManufacturerPopup;