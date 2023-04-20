import React, {useEffect, useState} from 'react';
import UdalovPopup, {IPopup} from "../../../../../Components/Udalov/UdalovPopup/UdalovPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../Models";
import axios from 'axios';
import { udalovAxios } from '../../UdalovKirillPage';

type Props = IPopup & {
    onCreate:(newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {

    const [categoryName, setCategoryName] = useState('')

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


    const createCategory = () => {
        udalovAxios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',
            {
                name: categoryName
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const onCreateclick = () => {
        createCategory();
        onClose()
    }

    return (
            <UdalovPopup title='Создание категории' open={open} onClose={() => onClose()}>
                <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                    <TextField label="Название категории" variant="standard" fullWidth={true}
                               value = {categoryName} onChange={e => setCategoryName(e.target.value)} />
                    <div style = {{display: 'flex', justifyContent:'center'}}>
                        <Button color = {'primary'} variant = {'contained'} onClick={() => onCreateclick()}>
                            Создать
                        </Button>
                    </div>
                </div>
            </UdalovPopup>
    );
};

export default CreateCategoryPopup;