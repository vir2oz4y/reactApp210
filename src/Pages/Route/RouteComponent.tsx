import React from 'react';
import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";
import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import KiryutinVladPage from "../StudentPage/KiryutinVlad/KiryutinVladPage";

import {default as KiryutinTest1} from "../StudentPage/KiryutinVlad/test1/Test1";
import {default as KiryutinTest2} from "../StudentPage/KiryutinVlad/test2/Test2";


import OndyshevDmitryPage from "../StudentPage/OndyshevDmitry/OndyshevDmitryPage";
import {default as OndyshevTest1} from '../StudentPage/OndyshevDmitry/Test1/Test1';
import {default as OndyshevTest2} from "../StudentPage/OndyshevDmitry/Test2/Test2";

import PepelevSergeyPage from "../StudentPage/PepelevSergey/PepelevSergeyPage";
import {default as PepelevTest1} from "../StudentPage/PepelevSergey/test1/Test1";
import {default as PepelevTest2} from "../StudentPage/PepelevSergey/test2/Test2";

import Test1 from "../StudentPage/KryuchkovNick/Test1/Test1";
import Test2 from "../StudentPage/KryuchkovNick/Test2/Test2";



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
                       <Route path={'test1'} element={<PepelevTest1/>}/>
                       <Route path={'test2'} element={PepelevTest2/>}/>
                    </Route>

                    
                    <Route path={'teacher'} element={<KryuchkovNickPage/>} >
                        <Route path={'test1'} element={<Test1/>}/>
                        <Route path={'test2'} element={<Test2/>}/>
                    </Route>
                    
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;