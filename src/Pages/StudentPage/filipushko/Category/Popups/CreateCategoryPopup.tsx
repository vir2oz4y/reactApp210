import React, {useEffect, useState} from 'react';
import FilipushkoPopup, {IPopup} from "../../../../../Components/filipushko/filipushkoPopup/filipushkoPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Category} from "../Models";
import axios from 'axios';
import { filipushkoAxios } from '../../FilipushkoPage';

type Props = IPopup & {
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopup = ({open,onClose, onCreate}:Props) => {

    const [categoryName, setCategoryName] = useState('')
    /*const [authToken, setAuthToken] = useState('');
    const doLogin = () => {
        filipushkoAxios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '05DA6784-075D-4859-9B30-49457DC210EF'
        })
            .then(res => {
                setAuthToken(res.data.authToken)
            })
    }
    useEffect(() => {
        doLogin();
    }, [])*/


  
    
    const createCategory = () => {
        axios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',{
            name:categoryName
        })
    }
    return (
        <FilipushkoPopup
            open={open}
            title = 'Category create'
            onClose={() => onClose()}
        >

            <div style={{
                display:'flex',
                flexDirection:'column',
                gap: '1em'
            }}
            >

                <TextField
                    label="Название кадегории"
                    variant="outlined"
                    fullWidth={true}
                    value={categoryName}
                    onChange={e=>setCategoryName(e.target.value)}
                />
                <div>
                    <Button
                        color={'primary'}
                        variant={"contained"}
                        onClick={()=>onCreateClick()}
                    >Создать</Button>

                </div>
            </div>
        </FilipushkoPopup >
    );
};

export default CreateCategoryPopup;