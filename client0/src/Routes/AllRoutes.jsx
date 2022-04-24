import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Application } from './Application';
import { Fund } from './Fund';
import { Home } from './Home';

const AllRoutes = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/apply" element={<Application />} />
                <Route exact path="/fund" element={<Fund />} />
                <Route path="*" element={<h1>Page Not found</h1>}>
                </Route>
            </Routes>
        </div>
    )
}

export { AllRoutes }