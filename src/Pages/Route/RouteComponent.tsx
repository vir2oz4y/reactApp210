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

import UdalovKirillPage from "../StudentPage/UdalovKirill/UdalovKirillPage";
import { default as UdalovCategory } from "../StudentPage/UdalovKirill/Category/Category";
import { default as UdalovClient } from "../StudentPage/UdalovKirill/Client/Client";
import { default as UdalovOrder } from "../StudentPage/UdalovKirill/Order/Order";
import { default as UdalovManufacturer } from "../StudentPage/UdalovKirill/Manufacturer/Manufacturer";
import { default as UdalovProduct } from "../StudentPage/UdalovKirill/Product/Product";

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


import AgeevAlexandrPage from "../StudentPage/AgeevAlezander/AgeevAlexandrPage";
import test1 from "../StudentPage/AgeevAlezander/test1/Test1";
import test2 from "../StudentPage/AgeevAlezander/test2/Test2";


import ShchegolevaEkaterinaPage from '../StudentPage/ShchegolevaEkaterina/ShchegolevaEkaterinaPage';
import ShchegolevaCategory from '../StudentPage/ShchegolevaEkaterina/Category/Category';
import ShchegolevaClient from '../StudentPage/ShchegolevaEkaterina/Client/Client';
import ShchegolevaManufacturer from '../StudentPage/ShchegolevaEkaterina/Manufacturer/Manufacturer';
import ShchegolevaOrder from '../StudentPage/ShchegolevaEkaterina/Order/Order';
import ShchegolevaProduct from '../StudentPage/ShchegolevaEkaterina/Product/Product';



import UsanovaDaryaPage from "../StudentPage/UsanovaDarya/UsanovaDaryaPage";
import { default as UsanovaTest1 } from "../StudentPage/UsanovaDarya/test1/Test1";
import { default as UsanovaTest2 } from "../StudentPage/UsanovaDarya/test2/Test2";
import { default as UsanovaCategory } from "../StudentPage/UsanovaDarya/Category/Category";



import BezlepkinaPage from '../StudentPage/Bezlepkina/BezlepkinaPage';
import BezlepkinaCategory from '../StudentPage/Bezlepkina/Category/Category';
import BezlepkinaClient from '../StudentPage/Bezlepkina/Client/Client';
import BezlepkinaOrder from '../StudentPage/Bezlepkina/Order/Order';
import BezlepkinaProduct from '../StudentPage/Bezlepkina/Product/Product';
import BezlepkinaManufacturer from '../StudentPage/Bezlepkina/Manufacturer/Manufacturer';

import DyakovDanilPage from "../StudentPage/DyakovDanil/DyakovDanilPage";
import { default as DyakovTest2 } from "../StudentPage/DyakovDanil/Test2/Test2";
import { default as DyakovTest1 } from "../StudentPage/DyakovDanil/Test1/Test1";



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

                    <Route path={'Udalov'} element={<UdalovKirillPage></UdalovKirillPage>}>
                        <Route path={'category'} element={<UdalovCategory />} />
                        <Route path={'client'} element={<UdalovClient/>} />
                        <Route path={'manufacturer'} element={<UdalovManufacturer />} />
                        <Route path={'order'} element={<UdalovOrder />} />
                        <Route path={'product'} element={<UdalovProduct />} />
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
                        <Route path={'test2'} element={<TrubnikovTest2 />} />
                        <Route path={'category'} element={<TrubnikovTest2 />} />
                    </Route>
                   
                    <Route path={'teacher'} element={<KryuchkovNickPage/>} >
                        <Route path={'category'} element={<CategoryPage/>}/>
                        <Route path={'test2'} element={<Test2/>}/>
                    </Route>


                    <Route path={'dyakov'} element={<DyakovDanilPage />} >
                        <Route path={'test1'} element={<DyakovTest1 />} />
                        <Route path={'test2'} element={<DyakovTest2 />} />
                    </Route>

                    <Route path={'Ageev'} element={<AgeevAlexandrPage />} >
                        <Route path={'test1'} element={<Test1 />} />
                        <Route path={'test2'} element={<Test2 />} />
                    </Route>
                    
                    <Route path={'Shchegoleva'} element={<ShchegolevaEkaterinaPage/>} >
                        <Route path={'Category'} element={<ShchegolevaCategory />} />
                        <Route path={'Client'} element={<ShchegolevaClient />} />
                        <Route path={'Manufacturer'} element={<ShchegolevaManufacturer />} />
                        <Route path={'Order'} element={<ShchegolevaOrder />} />
                        <Route path={'Product'} element={<ShchegolevaProduct />} />
                    </Route>

                    <Route path={'Usanova'} element={<UsanovaDaryaPage />} >
                        <Route path={'test1'} element={<UsanovaTest1 />} />
                        <Route path={'test2'} element={<UsanovaTest2 />} />
                        <Route path={'Category'} element={<UsanovaCategory />} />
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