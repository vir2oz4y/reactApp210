import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Manufacture} from "../models";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {BezlepkinaAxios} from "../../BezlepkinaPage";


type Props=IPopup &{
    onEdit:(newManufacture:Manufacture)=>void;
    Manufacture:Manufacture
}
const EditManufacturePopApp = ({open, onClose,Manufacture,onEdit}:Props) => {

    const [ManufactureEdit, setManufactureEdit] = useState<Manufacture>(Manufacture)

    const onEditClick=()=>{
        BezlepkinaAxios.patch<{ item: Manufacture }>('https://canstudy.ru/orderapi/manufacturer',
            {
                item: {
                    id: ManufactureEdit.id,
                    name: ManufactureEdit.name,
                    city: ManufactureEdit.city,
                    country: ManufactureEdit.country,
                }
            })
                .then(res=>{
                    onEdit(ManufactureEdit)
                    onClose();
                })
    }

    return (
        <BezlepkinaPopup
            title={'Manufacture create'}
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
                    label={"название"}
                    variant={"standard"}
                    value={ManufactureEdit.name}
                    onChange={e => setManufactureEdit(prev => (
                        { ...prev, name: e.target.value }
                    ))}
                    fullWidth={true} />

                <TextField
                    label={"Страна"}
                    variant={"standard"}
                    value={ManufactureEdit.country}
                    onChange={e =>
                        setManufactureEdit(prev => (
                        {...prev,country:e.target.value}
                    ))}
                    fullWidth={true} />

                <TextField
                    label="Город"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.city}
                    onChange={e => setManufactureEdit(prev => (
                        { ...prev, city: e.target.value }
                    ))}
                />
             
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={()=>onEditClick()}
                        >
                        edit
                    </Button>
                </div>
            </div>
        </BezlepkinaPopup>
    );
};
export default EditManufacturePopApp;