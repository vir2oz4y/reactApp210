import React, {useEffect, useState} from 'react';
import SakoyanPopup, {IPopup} from "../../../../../Components/SakoyanIvan/SakoyanPopup/SakoyanPopup";
import {sakoyanAxios} from "../../SakoyanIvanPage";
import {Order} from "../Models"

type Props = IPopup & {
    onCreate: (newOrder:Order) => void;
}

const CreateOrderPopup = ({open, onClose, onCreate}:Props) => {
    const createOrder = () => {
        sakoyanAxios.post<{ item:Order }>('https://canstudy.ru/orderapi/order',
            {
                clientId : 0,
                orderCost : 0,
                status : 0,
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }
};

export default CreateOrderPopup;