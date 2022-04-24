import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Causes } from "./Causes";
import { ContactMe } from "./ContactMe";
import { PageNotFound } from "./PageNotFound";
import { RaiseFund } from './RaiseFund';

const AllRoutes = () => {
    return (
        <div className="bg-slate-400 h-fit">
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/raise-fund" element={<RaiseFund />}/>
            <Route exact path="/causes" element={<Causes />}/>
            <Route exact path="/contact-me" element={<ContactMe />}/>
            <Route exact path="*" element={<PageNotFound />}/>
        </Routes>
        </div>
    )
}

export { AllRoutes }