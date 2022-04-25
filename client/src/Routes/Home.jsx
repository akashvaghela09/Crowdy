import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"

const Home = () => {
    const dispatch = useDispatch();
   
    const {
        contract
    } = useSelector(state => state.app)

    return (
        <div className='h-full min-h-screen flex justify-center items-center flex-col'>
            <h1 className='text-3xl text-slate-200 p-10'>Home</h1>
        </div>
    )
}

export { Home }