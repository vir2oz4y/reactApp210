import React, {useEffect, useState} from 'react';
import SakoyanPopup, {IPopup} from "../../../../../Components/SakoyanIvan/SakoyanPopup/SakoyanPopup";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Product} from "../Models";
import {sakoyanAxios} from '../../SakoyanIvanPage';
import {Category} from "../../Category/Models";
import {Manufacturer} from "../../Manufactur/Models";

type Props = IPopup & {
    onCreate: (newProduct: Product) => void;
}

const CreateProductPopup = ({open, onClose, onCreate}: Props) => {

    const createProduct = () => {
        sakoyanAxios.post<{ item: Product }>('https://canstudy.ru/orderapi/Product',
            {
                ...Product
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const [manufactureList, setManufactureList] = useState<Manufacturer[]>([])

    const getCategories = () => {
        sakoyanAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
            })
    }

    const getManufacturies = () => {
        sakoyanAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items);
            })
    }

    useEffect(() => {
        getCategories();
        getManufacturies();
    }, [])

    const [Product, setProduct] = useState<Product>({
        categoryId: 0,
        categoryName: "",
        cost: 0,
        description: "",
        id: 0,
        manufacturerId: 0,
        manufacturerName: "",
        name: ""
    })

    const onCreateClick = () => {
        createProduct();

        onClose();
    }

    console.log(Product)

    return (
        <SakoyanPopup
            title={'Создание товара'}
            open={open}
            onClose={() => onClose()}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    paddingTop: '1em'
                }}
            >




                <TextField
                    label="Название"
                    variant="standard"
                    fullWidth={true}
                    value={Product.name}
                    onChange={e => setProduct(prev => ({...prev, name: e.target.value}))}
                />

                <TextField
                    label="Описание"
                    variant="standard"
                    fullWidth={true}
                    value={Product.description}
                    onChange={e => setProduct(prev => ({...prev, description: e.target.value}))}
                />


                <TextField
                    label="Цена"
                    variant="standard"
                    fullWidth={true}
                    value={Product.cost}
                    onChange={e => setProduct(prev => ({...prev, cost: e.target.value as any}))}
                />

                <FormControl fullWidth>
                    <InputLabel id="category">Категория</InputLabel>
                    <Select
                        labelId="category"
                        value={Product.categoryId?.toString()}
                        label="Категория"
                        onChange={(e) => setProduct(prev => ({...prev, categoryId: e.target.value as any}))}
                    >
                        {categoryList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="manufacturer">Производитель</InputLabel>
                    <Select
                        labelId="manufacturer"
                        value={Product.manufacturerId?.toString()}
                        label="Производитель"
                        onChange={(e) => setProduct(prev => ({...prev, manufacturerId: e.target.value as any}))}
                    >
                        {manufactureList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>


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
        </SakoyanPopup>
    );
};

export default CreateProductPopup;