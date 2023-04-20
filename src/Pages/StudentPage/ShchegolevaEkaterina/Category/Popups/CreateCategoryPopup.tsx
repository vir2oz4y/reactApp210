import React, {useEffect, useState} from 'react';
import ShchegolevaPopup, {IPopup} from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Category } from '../Models';
import axios from 'axios';
import { shchegolevaAxios } from '../../ShchegolevaEkaterinaPage';
type Props=IPopup & {
    onCreate:(newCategory:Category)=>void
}
const CreateCategoryPopup = ({ open, onClose, onCreate }: Props) => {
    
    const [categoryName, setCategoryName] = useState('')
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

    const createCategory = () => {
        shchegolevaAxios.post<{ item:Category }>('https://canstudy.ru/orderapi/category',
        {
            name:categoryName
        })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const onCreateClick=()=>{
        createCategory();
        onClose();
    }
    return (
        <ShchegolevaPopup title={'Category  create'} open={open} onClose={() => onClose()}>
            <div style={{display:'flex', flexDirection:'column', gap:'1em'}} >
                <TextField label="name category" variant="outlined" value={categoryName} fullWidth={true}
                onChange={e=>setCategoryName(e.target.value)}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" onClick={()=>onCreateClick()}>
                    create
                </Button>
                </div>
            </div>
        </ShchegolevaPopup>
    );
};

export default CreateCategoryPopup;