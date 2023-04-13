import React, {useState} from 'react';
import UdalovPopup, {IPopup} from "../../../../../Components/Udalov/UdalovPopup/UdalovPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../Models";

type Props = IPopup & {
    onCreate:(newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {

    const [categoryName, setCategoryName] = useState('')


    const onCreateclick = () => {
        onCreate({
            id:Math.random(),
            name:categoryName
        });
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