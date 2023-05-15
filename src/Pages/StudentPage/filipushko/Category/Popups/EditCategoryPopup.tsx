import React, {useState} from 'react';
import FilipushkoPopup, {IPopup} from "../../../../../Components/filipushko/1Popup/1Popup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Category} from "../Models";

type Props = IPopup & {
    onEdit:(newCategory:Category)=>void;
    category:Category
}
const EditCategoryPopup = ({open,onClose,category,onEdit}:Props) => {

    const [categoryEdit, setCategoryEdit] =useState(category)


    const onEditClick= ()=>{

        onEdit(categoryEdit);
        onClose();
    }
    return (
        <FilipushkoPopup
            open={open}
            title = 'Category create'
            onClose={() => onClose()}
        >a

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
                    value={categoryEdit.name}
                    onChange={e=>setCategoryEdit( prev=> ({...prev, name: e.target.value}))}
                />
                <div>
                    <Button
                        color={'primary'}
                        variant={"contained"}
                        onClick={()=>onEditClick()}
                    >Создать</Button>

                </div>
            </div>
        </FilipushkoPopup >
    );
};

export default EditCategoryPopup;