import React, {useState} from "react";
import TrubnikovPopup, {IPopup} from "../../../../../Components/Trubnikov/TrubnikovPopup";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = IPopup &{


}
const CreateCategoryPopup = ({open,onClose}:Props)=>{
    const [categoryName, setCategoryName] = useState("")
    return(
        <TrubnikovPopup
            title ={'Создание категории'}
            open = {open}
            onClose={()=> onClose()}>
            <div style={{display:"flex",flexDirection:"column",gap :"1em"}}>
                <TextField label="Название категории" fullWidth ={true}
                           value ={categoryName}
                           onChange ={e=> setCategoryName(e.target.value)}/>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <Button color ='primary'
                    variant={'contained'}>
                    Создать
                </Button>
            </div>
        </TrubnikovPopup>
        );

};
export default CreateCategoryPopup;


