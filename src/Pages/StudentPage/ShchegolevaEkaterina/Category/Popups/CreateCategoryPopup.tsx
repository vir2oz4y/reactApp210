import React, {useState} from 'react';
import ShchegolevaPopup, {IPopup} from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Category } from '../Models';
type Props=IPopup & {
    onCreate:(newCategory:Category)=>void
}
const CreateCategoryPopup = ({open, onClose,onCreate}:Props) => {
    const [categoryName, setCategoryName]=useState('')
    const onCreateClick=()=>{
        onCreate({id:Math.random(), name:categoryName})
        onClose();
    }
    return (
        <ShchegolevaPopup title={'Category  create'} open={open} onClose={() => onClose()}>
            <div style={{display:'flex', flexDirection:'column', gap:'1em'}} >
                <TextField label="name category" variant="outlined" value={categoryName} fullWidth={true}
                onChange={e=>setCategoryName(e.target.value)}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" onClick={()=>onCreateClick()}>
                    create
                </Button>
                </div>
            </div>
        </ShchegolevaPopup>
    );
};

export default CreateCategoryPopup;