import React from 'react';
import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";
import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import PepelevSergeyPage from "../StudentPage/PepelevSergey/PepelevSergeyPage";
import Test1 from "../StudentPage/PepelevSergey/test1/Test1";
import Test2 from "../StudentPage/PepelevSergey/test2/Test2";

const RouteComponent = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<StudentsPage/>} />

                    <Route path={'teacher'} element={<KryuchkovNickPage/>} />
                    <Route path={'Serega'} element={<PepelevSergeyPage/>} >
                       <Route path={'test1'} element={<Test1/>}/>
                       <Route path={'test2'} element={<Test2/>}/>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;