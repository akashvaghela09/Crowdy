import React from 'react';
import { Wallet } from './Wallet';
import { AiFillHome, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FaWpforms } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Header = () => {

    let navigate = useNavigate();

    const handleRoute = (para) => {
        navigate(`/${para}`)
    }

    return (
        <div className='bg-slate-800 h-fit flex sticky top-0 left-0 select-none z-10'>
            <div onClick={() => handleRoute("")} className='md:pl-4 flex h-fit items-center w-fit cursor-pointer'>
                <img src='logo.png' alt="dapp logo" className='w-8 h-8 m-3' />
                <p className="h-fit text-2xl text-slate-200 cursor-pointer font-medium">Crowdy</p>
            </div>
            <div className='flex grow justify-end items-center  md:pr-4'>
                <div className='hidden md:flex md:border-r-2 border-slate-400'>
                    <p onClick={() => handleRoute("raise-fund")} className='cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-md transition ease-in h-fit text-xl text-slate-200 mx-3'>Raise Fund</p>
                    <p onClick={() => handleRoute("causes")} className='cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-md transition ease-in h-fit text-xl text-slate-200 mx-3'>Causes</p>
                    <p onClick={() => handleRoute("contact-me")} className='cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-md transition ease-in h-fit text-xl text-slate-200 mx-3'>Contact Me</p>
                </div>

                <div className=' flex justify-around fixed bg-slate-800 bottom-0 left-0 w-full h-fit md:hidden'>
                    <div className="flex items-center flex-col m-2">
                        <AiFillHome onClick={() => handleRoute("")} className='fill-slate-100 text-2xl cursor-pointer' />
                        <p className="text-slate-300 text-sm">Home</p>
                    </div>
                    <div className="flex items-center flex-col m-2">
                        <FaWpforms onClick={() => handleRoute("raise-fund")} className='fill-slate-100 text-2xl cursor-pointer' />
                        <p className="text-slate-300 text-sm">Raise Fund</p>
                    </div>
                    <div className="flex items-center flex-col m-2">
                        <MdDashboard onClick={() => handleRoute("causes")} className='fill-slate-100 text-2xl cursor-pointer' />
                        <p className="text-slate-300 text-sm">Causes</p>
                    </div>
                    <div className="flex items-center flex-col m-2">
                        <AiOutlineQuestionCircle onClick={() => handleRoute("contact-me")} className='fill-slate-100 text-2xl cursor-pointer' />
                        <p className="text-slate-300 text-sm">Help</p>
                    </div>
                </div>
                <Wallet />
            </div>
        </div>
    )
}

export { Header }