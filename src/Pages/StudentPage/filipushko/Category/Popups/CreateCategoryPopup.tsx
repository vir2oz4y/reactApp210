import React, { useEffect, useState } from 'react';
import FilipushkoPopup, { IPopup } from "../../../../../Components/filipushko/1Popup/1Popup";
import { Button, TextField } from "@mui/material";
import { Category } from "../Models";
import axios from 'axios';
import { filipushkoAxios } from '../../filipushkoPage';

type Props = IPopup & {
    onCreate: (newCategory: Category) => void;
}

const CreateCategoryPopup = ({ open, onClose, onCreate }: Props) => {

    const [categoryName, setCategoryName] = useState('')




    const createCategory = () => {
        filipushkoAxios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',
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
        <FilipushkoPopup title='create Category' open={open} onClose={() => onClose()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <TextField label="Name Category" variant="standard" fullWidth={true}
                    value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color={'primary'} variant={'contained'} onClick={() => onCreateclick()}>
                        create
                    </Button>
                </div>
            </div>
        </FilipushkoPopup>
    );
};

export default CreateCategoryPopup;