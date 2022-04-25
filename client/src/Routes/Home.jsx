import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import commonWallet from "../Utils/commonWallet";
import { useNavigate } from 'react-router';
import { ethers } from "ethers";

const Home = () => {
    const dispatch = useDispatch();
    const [totalRaised, setTotalRaised] = useState("")
    const [totalCompleted, setTotalCompleted] = useState("")
    const [totalCauses, setTotalCauses] = useState("")
    const [totalOpen, setTotalOpen] = useState("")

    let navigate = useNavigate();

    const handleRoute = (para) => {
        navigate(`/${para}`)
    }

    const getData = async () => {
        dispatch(setLoading(true))

        let data = await commonWallet.getFundingData()
        .then((res) => {
            setTotalCauses(res.length)

            let totalCompleted = 0;
            for (let i = 0; i < res.length; i++) {
                let item = res[i]
                if (item.isOpen === false) {
                    totalCompleted++
                }
            }

            setTotalCompleted(totalCompleted)
            setTotalOpen(res.length - totalCompleted)
        })
        .catch((err) => {
            dispatch(setLoading(false))
            console.log("err", err)
        })

        let totalFund = await commonWallet.getTotalFundRaised()
        const ethValue = Math.floor(ethers.utils.formatEther(totalFund) * 100) / 100;
        
        setTotalRaised(ethValue)
        dispatch(setLoading(false))
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='h-full min-h-screen flex items-center flex-col'>
            <div className='bg-slate-200 w-full pb-12'>
                <label className='flex flex-col items-center pt-12 pb-6 '>
                    <h1 className='w-fit text-4xl md:text-7xl font-bold text-slate-800  bg-slate-200'><b className='underline decoration-pink-500'>Decentralized</b> for a</h1>
                    <h1 className='w-fit text-4xl md:text-7xl font-bold text-slate-800 bg-slate-200'>better tomorrow</h1>
                    <p className='p-2 text-sm w-fit md:text-xl text-slate-800 bg-slate-200'>Join <b className='underline decoration-indigo-500'>Crowdy</b> and Fund Causes, Change the World.</p>
                </label>
                <div className='flex flex-col md:flex-row items-center justify-evenly md:my-12'>
                    <label className="flex flex-col justify-center items-center bg-sky-300 rounded-2xl w-3/4 m-4 md:m-0 md:w-56 h-36">
                        <p className='text-slate-800 font-bold text-2xl md:text-4xl'>{totalRaised} ETH</p>
                        <p>Raised as Fund</p>
                    </label>
                    <label className="flex flex-col justify-center items-center bg-indigo-300 rounded-2xl w-3/4 m-4 md:m-0 md:w-56 h-36">
                        <p className='text-slate-800 font-bold text-2xl md:text-4xl'>{totalCauses}</p>
                        <p>Causes Listed</p>
                    </label>
                    <label className="flex flex-col justify-center items-center bg-emerald-300 rounded-2xl w-3/4 m-4 md:m-0 md:w-56 h-36">
                        <p className='text-slate-800 font-bold text-2xl md:text-4xl'>{totalCompleted}</p>
                        <p>Causes Funded</p>
                    </label>
                    <label className="flex flex-col justify-center items-center bg-violet-300 rounded-2xl w-3/4 m-4 md:m-0 md:w-56 h-36">
                        <p className='text-slate-800 font-bold text-2xl md:text-4xl'>{totalOpen}</p>
                        <p>Needs Funding</p>
                    </label>
                </div>
                <div className='w-full h-fit md:h-[450px] py-12 flex items-center justify-center'>
                    <div className='w-4/5 h-full drop-shadow-lg flex flex-col md:flex-row items-stretch'>
                        <div className='h-full w-full md:w-1/2 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none'>
                            <img className='h-full w-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-r-none' src="cover.png" alt="cover" />
                        </div>
                        <div className='h-full w-full md:w-1/2 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none bg-slate-100 flex flex-col justify-evenly'>
                            <p className=" w-full text-xl md:text-3xl font-bold text-slate-700 p-3 md:p-6"><span className='underline decoration-pink-500'>Need Funds</span> to Pay For a Medical Emergency or Social Cause ?</p>
                            <div className=' md:p-6 flex flex-col md:gap-4'>
                                <p className="pl-3 w-full md:text-lg  text-slate-700 ">Crowdy's <b className='md:text-2xl font-bold'>0% Platform fees</b> ensures <br />maximum funds for you</p>
                                <button onClick={() => handleRoute("raise-fund")} className='mt-4 md:m-2 flex justify-center items-center active:translate-y-1 bg-blue-500 active:bg-blue-600 text-neutral-100 rounded-b-2xl md:rounded-md w-full md:w-4/5 py-6 md:py-2 text-xl'> Start Crowd Funding for FREE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-fit md:h-[450px] py-12 flex items-center justify-center'>
                    <div className='w-4/5 h-full drop-shadow-lg flex flex-col md:flex-row items-stretch'>
                        <div className='h-full w-full md:w-1/2 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none'>
                            <img className='h-full w-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-r-none' src="cover2.jpg" alt="cover" />
                        </div>
                        <div className='h-full w-full md:w-1/2 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none bg-slate-100 flex flex-col justify-evenly'>
                            <p className=" w-full text-xl md:text-3xl font-bold text-slate-700 p-3 md:p-6">Want to make <span className='underline decoration-green-500'>change</span> ? <br /> Fund causes and make <span className='underline decoration-green-500'>impact</span>.</p>
                            <div className=' md:p-6 flex flex-col md:gap-4'>
                                <p className="pl-3 w-full md:text-lg  text-slate-700 ">Crowdy's <b className='md:text-2xl font-bold'>0% Transfer fees</b> ensures <br />maximum contribution to cause.</p>
                                <button onClick={() => handleRoute("causes")} className='mt-4 md:m-2 flex justify-center items-center active:translate-y-1 bg-blue-500 active:bg-blue-600 text-neutral-100 rounded-b-2xl md:rounded-md w-full md:w-4/5 py-6 md:py-2 text-xl'> Start Funding to causes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Home }