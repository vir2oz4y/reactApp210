import React from 'react';
import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";


import TrubnikovTimurPage from "../StudentPage/TrubnikovTimur/TrubnikovTimurPage";
import {default as TrubnikovTest2} from "../StudentPage/TrubnikovTimur/Test2/Test2";
import {default as TrubnikovTest1} from "../StudentPage/TrubnikovTimur/Test1/Test1";

import KiryutinVladPage from "../StudentPage/KiryutinVlad/KiryutinVladPage";
import {default as KiryutinTest1} from "../StudentPage/KiryutinVlad/test1/Test1";
import {default as KiryutinTest2} from "../StudentPage/KiryutinVlad/test2/Test2";

import OndyshevDmitryPage from "../StudentPage/OndyshevDmitry/OndyshevDmitryPage";
import {default as OndyshevTest1} from '../StudentPage/OndyshevDmitry/Test1/Test1';
import {default as OndyshevTest2} from "../StudentPage/OndyshevDmitry/Test2/Test2";

import PepelevSergeyPage from "../StudentPage/PepelevSergey/PepelevSergeyPage";
import {default as PepelevTest1} from "../StudentPage/PepelevSergey/test1/Test1";
import {default as PepelevTest2} from "../StudentPage/PepelevSergey/test2/Test2";
import {default as PepelevCategory} from "../StudentPage/PepelevSergey/Category/CategoryPage";
import {default as PepelevIllegalProducts} from "../StudentPage/PepelevSergey/IllegalProducts/IllegalProductsPage";
import {default as PepelevManufacturer} from "../StudentPage/PepelevSergey/Manufacturer/ManufacturerPage";
import {default as PepelevOrder} from "../StudentPage/PepelevSergey/Order/OrderPage";
import {default as PepelevPurchase} from "../StudentPage/PepelevSergey/Purchase/PurchasePage";
import {default as PepelevClient} from "../StudentPage/PepelevSergey/Client/ClientPage";

import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import Test1 from "../StudentPage/KryuchkovNick/Test1/Test1";
import Test2 from "../StudentPage/KryuchkovNick/Test2/Test2";
import CategoryPage from "../StudentPage/KryuchkovNick/Category/CategoryPage";

import BezlepkinaPage from '../StudentPage/Bezlepkina/BezlepkinaPage';
import BezlepkinaCategory from '../StudentPage/Bezlepkina/Category/Category';
import BezlepkinaClient from '../StudentPage/Bezlepkina/Client/Client';
import BezlepkinaOrder from '../StudentPage/Bezlepkina/Order/Order';
import BezlepkinaProduct from '../StudentPage/Bezlepkina/Product/Product';
import BezlepkinaManufacturer from '../StudentPage/Bezlepkina/Manufacturer/Manufacturer';


const RouteComponent = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<StudentsPage/>} />
                    
                    
                    <Route path={'Vlados'} element={<KiryutinVladPage/>} >
                        <Route path={'test1'} element={<KiryutinTest1/>} />
                        <Route path={'test2'} element={<KiryutinTest2/>} />
                    </Route>
                    
                  
                    <Route path={'ondyshev'} element={<OndyshevDmitryPage></OndyshevDmitryPage>}>
                        <Route path={'test1'} element={<OndyshevTest1/>} />
                        <Route path={'test2'} element={<OndyshevTest2/>} />
                    </Route>

                    <Route path={'Serega'} element={<PepelevSergeyPage/>} >
                       <Route path={'category'} element={<PepelevCategory/>}/>
                       <Route path={'client'} element={<PepelevClient/>}/>
                       <Route path={'illegalProducts'} element={<PepelevIllegalProducts/>}/>
                       <Route path={'manufacturer'} element={<PepelevManufacturer/>}/>
                       <Route path={'order'} element={<PepelevOrder/>}/>
                       <Route path={'purchase'} element={<PepelevPurchase/>}/>
                    </Route>

                    <Route path={'trubnikov'} element={<TrubnikovTimurPage/>} >
                        <Route path={'test1'} element={<TrubnikovTest1/>} />
                        <Route path={'test2'} element={<TrubnikovTest2/>} />
                    </Route>
                   
                    <Route path={'teacher'} element={<KryuchkovNickPage/>} >
                        <Route path={'category'} element={<CategoryPage/>}/>
                        <Route path={'test2'} element={<Test2/>}/>
                    </Route>

                    <Route path={'Bezlepkina'} element={<BezlepkinaPage/>} >
                        <Route path={'Category'} element={<BezlepkinaCategory />} />
                        <Route path={'Client'} element={<BezlepkinaClient />} />
                        <Route path={'Manufacturer'} element={<BezlepkinaManufacturer />} />
                        <Route path={'Order'} element={<BezlepkinaOrder />} />
                        <Route path={'Product'} element={<BezlepkinaProduct />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;