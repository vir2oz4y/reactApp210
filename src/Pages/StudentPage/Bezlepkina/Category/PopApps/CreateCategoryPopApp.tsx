import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Button, Input} from '@mui/material';
import TextField from "@mui/material/TextField";
import { Category } from '../models';
import axios from 'axios';
import { strict } from 'assert';
import { useEffect } from 'react';
import { BezlepkinaAxios } from '../../BezlepkinaPage';

type Props=IPopup &{
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopApp = ({open, onClose,onCreate}:Props) => {
const [categoryName, setCategoryName] = useState('')

const [authToken, setAuthToken] = useState('');

    const CreateCategory = () => {
        BezlepkinaAxios.post<{ item:Category}>('https://canstudy.ru/orderapi/user/login',
            {
                name: categoryName
            },
            {
                headers:
                {
                    Aurthorization: 'Bearer '+authToken
                }
            })
                .then(res => {
                    onCreate(res.data.item)
                })
    }

    const onCreateClick=()=>{
        CreateCategory()
        onClose()
    }
    return (
        <BezlepkinaPopup
            title={'category create'}
            open={open}
            onClose={() => onClose()}
        >
            <div>
                <TextField
                    label={"название категории"}
                    variant={"standard"}
                    value={categoryName}
                    onChange={e=>setCategoryName((e.target.value))}
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

export default CreateCategoryPopApp;