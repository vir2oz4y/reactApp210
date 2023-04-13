import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Button, Input} from '@mui/material';
import TextField from "@mui/material/TextField";
import { Category } from '../models';

type Props=IPopup &{
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopApp = ({open, onClose,onCreate}:Props) => {
    const [categoryName,setCategoryName]=useState('')

    const onCreateClick=()=>{
        onCreate({id:Math.random(),name:categoryName})
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