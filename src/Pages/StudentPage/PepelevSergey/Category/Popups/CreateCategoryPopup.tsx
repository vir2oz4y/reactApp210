import React, {useState} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../model";

type Props = IPopup & {
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {
    const [categoryName, setCategoryName]=useState('')
    const onCreacteClick = () =>{
        onCreate({
            id:Math.random(),
            name:categoryName
        })
        onClose();
    }
    return (
        <PepelevPopup
            title={'Создание категории'}
            open={open}
            onClose={()=> onClose()}>
            <div style={{display:"flex", flexDirection:"column", gap: "1em"}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                            value={categoryName}
                            onChange={e=>setCategoryName(e.target.value)}/>
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Button color={'primary'}
                        variant={'contained'}
                        onClick={()=>onCreacteClick()}>
                    Создать
                </Button>
            </div>
        </PepelevPopup>
    );
};

export default CreateCategoryPopup;