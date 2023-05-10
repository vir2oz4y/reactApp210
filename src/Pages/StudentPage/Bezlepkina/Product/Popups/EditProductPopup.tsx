import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Product } from "../models";
import { Category } from "../../Category/models";
import { BezlepkinaAxios } from '../../BezlepkinaPage';
import { Manufacture } from '../../Manufacturer/models';
import BezlepkinaPopup, { IPopup } from '../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup';


type Props = IPopup & {
    onEdit: (newProduct: Product) => void;
    Product: Product
}

const EditProductPopup = ({ open, onClose, Product: ProductEdit, onEdit }: Props) => {

    const [Product, setProduct] = useState(ProductEdit)

    const onEditClick = () => {

        BezlepkinaAxios.patch<{ item: Product }>('https://canstudy.ru/orderapi/Product',
            {
                item: {
                    ...Product
                }
            })
            .then(res => {
                onEdit(res.data.item)
                onClose();
            })
    }

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const [manufactureList, setManufactureList] = useState<Manufacture[]>([])

    const getCategories = () => {
        BezlepkinaAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
            })
    }

    const getManufacturies = () => {
        BezlepkinaAxios.get<{ items: Manufacture[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items);
            })
    }

    useEffect(() => {
        getCategories();
        getManufacturies();
    }, [])


    return (
        <BezlepkinaPopup
            title={'create product'}
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
                    label="name"
                    variant="standard"
                    fullWidth={true}
                    value={Product.name}
                    onChange={e => setProduct(prev => ({ ...prev, name: e.target.value }))}
                />

                <TextField
                    label="description"
                    variant="standard"
                    fullWidth={true}
                    value={Product.description}
                    onChange={e => setProduct(prev => ({ ...prev, description: e.target.value }))}
                />


                <TextField
                    label="cost"
                    variant="standard"
                    fullWidth={true}
                    value={Product.cost}
                    onChange={e => setProduct(prev => ({ ...prev, cost: e.target.value as any }))}
                />

                <FormControl fullWidth>
                    <InputLabel id="category">category</InputLabel>
                    <Select
                        labelId="category"
                        value={Product.categoryId?.toString()}
                        label="category"
                        onChange={(e) => setProduct(prev => ({ ...prev, categoryId: e.target.value as any }))}
                    >
                        {categoryList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="manufacturer">manufacturer</InputLabel>
                    <Select
                        labelId="manufacturer"
                        value={Product.manufacturerId?.toString()}
                        label="manufacturer"
                        onChange={(e) => setProduct(prev => ({ ...prev, manufacturerId: e.target.value as any }))}
                    >
                        {manufactureList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onEditClick()}
                    >
                        edit
                    </Button>
                </div>

            </div>
        </BezlepkinaPopup>
    );
};

export default EditProductPopup;