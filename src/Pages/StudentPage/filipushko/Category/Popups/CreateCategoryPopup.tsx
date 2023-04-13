import React, {useState} from 'react';
import FilipushkoPopup, {IPopup} from "../../../../../Components/filipushko/filipushkoPopup/filipushkoPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Category} from "../Models";

type Props = IPopup & {
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopup = ({open,onClose, onCreate}:Props) => {

    const [categoryName,setCategoryName] = useState('')
    const onCreateClick= ()=>{
        onCreate({
            id:Math.random(),
            name:categoryName
        });
        onClose();
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