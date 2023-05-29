import React, { useEffect, useState } from 'react';
import ArtamonovPopup, { IPopup } from "../../../../../Components/Artamonov/ArtamonovPopup/ArtamonovPopup";
import { Button, TextField } from "@mui/material";
import { Category } from "../models";
import axios from 'axios';
import { artamonovAxios } from '../../ArtamonovPage';

type Props = IPopup & {
    onCreate: (newCategory: Category) => void;
}

const CreateCategoryPopup = ({ open, onClose, onCreate }: Props) => {

    const createCategory = () => {
        artamonovAxios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',
            {
                name: categoryName
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const [categoryName, setCategoryName] = useState('')

    const onCreateClick = () => {
        createCategory();

        onClose();
    }

    return (
        <ArtamonovPopup
            title={'Создание категории'}
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
                    label="Название категории"
                    variant="standard"
                    fullWidth={true}
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onCreateClick()}
                    >
                        Создать
                    </Button>
                </div>

            </div>
        </ArtamonovPopup>
    );
};

export default CreateCategoryPopup;