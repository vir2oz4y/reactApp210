import React, {useState} from 'react';
import TrubnikovPopup, {IPopup} from "../../../../../Components/Trubnikov/TrubnikovPopup/TrubnikovPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../models";
import {trubnikovAxios} from "../../TrubnikovTimurPage";

type Props = IPopup & {
    onEdit: (newCategory: Category) => void;
    category: Category
}

const EditCategoryPopup = ({open, onClose, category, onEdit}: Props) => {

    const [categoryEdit, setCategoryEdit] = useState(category)

    const onEditClick = () => {

        trubnikovAxios.patch<{ item:Category }>('https://canstudy.ru/orderapi/category',
            {
                item:{
                    id:category.id,
                    name:category.name,
                }
            })
            .then(res => {
                onEdit(categoryEdit)
                onClose();
            })
    }

    return (
        <TrubnikovPopup
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
                    value={categoryEdit.name}
                    onChange={e =>
                        setCategoryEdit(prev => ({...prev, name: e.target.value}))
                    }
                />

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onEditClick()}
                    >
                        Изменить
                    </Button>
                </div>

            </div>
        </TrubnikovPopup>
    );
};

export default EditCategoryPopup;