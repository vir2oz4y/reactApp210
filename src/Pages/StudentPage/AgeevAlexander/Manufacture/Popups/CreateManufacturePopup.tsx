import React, {useState} from 'react';
import AgeevPopup, {IPopup} from "../../../../../Components/Ageev/AgeevPopup/AgeevPopup";
import {Button, TextField} from "@mui/material";
import {Manufacture} from "../models";
import {ageevAxios} from '../../AgeevAlexandrPage';

type Props = IPopup & {
    onCreate: (newManufacture: Manufacture) => void;
}

const CreateManufacturePopup = ({open, onClose, onCreate}: Props) => {

    const createManufacture = () => {
        ageevAxios.post<{ item: Manufacture }>('https://canstudy.ru/orderapi/manufacturer',
            {
                name: manufacture.name,
                city: manufacture.city,
                country:manufacture.country
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const [manufacture, setManufacture] = useState<Manufacture>({
        id: 0,
        name: '',
        country: '',
        city: ''
    })

    const onCreateClick = () => {
        createManufacture();

        onClose();
    }

    return (
        <AgeevPopup
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
                    label="Название производителя"
                    variant="standard"
                    fullWidth={true}
                    value={manufacture.name}
                    onChange={e => setManufacture(prev => (
                        {...prev, name: e.target.value}
                    ))}
                />

                <TextField
                    label="Страна"
                    variant="standard"
                    fullWidth={true}
                    value={manufacture.country}
                    onChange={e => setManufacture(prev => (
                        {...prev, country: e.target.value}
                    ))}
                />

                <TextField
                    label="Город"
                    variant="standard"
                    fullWidth={true}
                    value={manufacture.city}
                    onChange={e => setManufacture(prev => (
                        {...prev, city: e.target.value}
                    ))}
                />

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onCreateClick()}
                    >
                        Создать
                    </Button>
                </div>

            </div>
        </AgeevPopup>
    );
};

export default CreateManufacturePopup;