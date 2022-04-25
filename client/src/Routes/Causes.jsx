import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import S3 from "aws-sdk/clients/s3";
import commonWallet from "../Utils/commonWallet";
import { toast } from 'react-toastify';
import { metaMaskChecker } from '../Utils/metamaskChecker';

const Causes = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [tempItem, setTempItem] = useState(-1);
    const [donateModal, setDonateModal] = useState(false);
    const [donateAmount, setDonateAmount] = useState("");

    const {
        isAuth,
        contract
    } = useSelector(state => state.app)

    const { REACT_APP_STORJ_ACCESS_ID, REACT_APP_STORJ_SECRET_KEY, REACT_APP_STORJ_BUCKET } = process.env;

    // setup s3 bucket
    const s3 = new S3({
        accessKeyId: REACT_APP_STORJ_ACCESS_ID,
        secretAccessKey: REACT_APP_STORJ_SECRET_KEY,
        endpoint: "https://gateway.ap1.storjshare.io",
        region: 'us-east-1',
        signatureVersion: "v4",
        connectTimeout: 0,
        httpOptions: { timeout: 0 },
    });

    const getImageUrl = async (para) => {
        const params = {
            Bucket: REACT_APP_STORJ_BUCKET,
            Key: para,
        };

        const url = s3.getSignedUrl("getObject", params);
        return url
    }

    const getData = async () => {
        dispatch(setLoading(true))
        let data = await toast.promise(commonWallet.getFundingData(),
            {
                error: 'Something went wrong 🤯'
            }
        )

        let tempList = []

        for (let i = 0; i < data.length; i++) {
            let tempObj = {}
            let item = data[i]
            let url = await getImageUrl(item.imageId)
            let percent = (item.collection / item.target) * 100

            tempObj["_id"] = item.id.toString()
            tempObj["collection"] = item.collection.toString()
            tempObj["target"] = item.target.toString()
            tempObj["title"] = item.title
            tempObj["description"] = item.description
            tempObj["imageUrl"] = url
            tempObj["receiver"] = item.receiver
            tempObj["isOpen"] = item.isOpen
            tempObj["isValid"] = item.isValid
            tempObj["progress"] = `${percent.toFixed(2)}%`

            if (tempObj.isValid === true && tempObj.isOpen === true) {
                tempList.push(tempObj)
            }
        }

        setList([...tempList])
        dispatch(setLoading(false))
    }

    const handleDonateModal = async (para) => {
        dispatch(setLoading(true))

        let response = await metaMaskChecker();

        if (isAuth === false) {
            dispatch(setLoading(false))
            toast.error("Connect your wallet first!")
            return
        }

        setTempItem(para);

        setDonateModal(true)
        dispatch(setLoading(false))
    }

    const handleDonateModalClose = () => {
        setDonateModal(false)
        setTempItem("");
        setDonateAmount("");
        dispatch(setLoading(false))
    }

    const handleDonate = async (para) => {
        dispatch(setLoading(true))

            console.log("");

            let data = await toast.promise(contract.contribute(para, { value: donateAmount }),
                {
                    pending: 'Funding ...',
                    success: 'Project Funded 👌',
                    error: 'Something went wrong 🤯'
                }
            ).then((res) => console.log(res)).catch((err) => {
                console.log(err.code)
                console.log(err.data)
                console.log(err.error.message)
                toast.error(err.error.message)
                console.log(err.message.data)
                console.log(err)

                dispatch(setLoading(false))
            })
            handleDonateModalClose()
            getData()
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='h-full min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-slate-800 underline decoration-blue-500 font-bold p-10'>Contribute to Cause</h1>
            <div className='flex w-full flex-wrap justify-evenly gap-5 mb-20'>
                {
                    list.length !== undefined && list.length > 0 && list.map((item, index) => {
                        return <div className='w-11/12 md:w-72 bg-slate-200 rounded-lg drop-shadow-lg m-4 flex flex-col items-center' key={"card-" + index}>
                            <div className='w-full h-48 flex justify-center bg-blue-300 rounded-t-lg'>
                                <img className='h-full w-full object-cover rounded-t-lg' src={item.imageUrl} onError={(e) => e.target.src = "placeholder.jpg"} alt="cover" />
                            </div>
                            <p className='w-full text-xl font-bold  p-1 px-2 line-clamp-1'>{item.title}</p>
                            {/* <p className='w-full text-sm p-1 px-2 m-1  h-[70px] text-justify line-clamp-3'>{item.description}</p> */}
                            <label className='w-full flex  pl-2 items-baseline'>
                                <p className='text-2xl font-bold text-slate-700'>{item.collection} Wei</p><p className='ml-1 text-slate-500 '>raised out of</p>
                            </label>
                            <p className='w-full text-slate-500 mb-2 pl-2'>{item.target} Wei</p>
                            <div className='bg-blue-300 h-2 w-11/12 rounded'><div className="bg-blue-500 h-2 rounded" style={{ width: item.progress }}></div></div>
                            <button onClick={() => handleDonateModal(item)} className='p-2 m-2 my-3.5 w-11/12  rounded-md active:translate-y-1 bg-blue-500 text-neutral-100 hover:bg-blue-600 text-xl'>Donate</button>
                        </div>
                    })
                }
            </div>

            {
                donateModal === true &&
                <div className="fixed top-0 left-0 w-screen h-screen">
                    <div onClick={() => handleDonateModalClose()} className='fixed top-0 left-0 bg-black/30 backdrop-blur-sm w-screen h-screen' />
                    <div className="flex flex-col items-center justify-center fixed top-1/2 left-1/2 h-fit  w-3/4 md:w-1/3 border-none bg-slate-300 shadow-lg rounded-md translate-x-[-50%] translate-y-[-50%]">
                        <div className='w-full h-48 flex justify-center bg-slate-300 rounded-t-lg'>
                            <img className='h-full w-full object-cover rounded-t-lg' src={tempItem.imageUrl} onError={(e) => e.target.src = "placeholder.jpg"} alt="cover" />
                        </div>
                        <p className='w-full text-xl font-bold  p-1 px-2 md:px-6 line-clamp-1'>{tempItem.title}</p>
                        <p className='w-full text-sm px-2 m-1 md:px-6 text-justify line-clamp-3'>{tempItem.description}</p>
                        <label className='w-full flex  pl-2 md:pl-6 items-baseline'>
                            <p className='text-2xl font-bold text-slate-700'>{tempItem.collection} Wei</p><p className='ml-1 text-slate-500 '>raised out of</p>
                        </label>
                        <p className='w-full text-slate-500 mb-2 pl-2 md:pl-6'>{tempItem.target} Wei</p>
                        <div className='bg-blue-300 h-2 w-11/12 rounded'><div className="bg-blue-500 h-2 rounded" style={{ width: tempItem.progress }}></div></div>
                        <div className='flex justify-center items-center m-2'>
                            <input value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} placeholder='Amount' className="w-2/5 m-2 p-2 rounded-md text-xl bg-slate-50 border-2 border-slate-300" />
                            <button onClick={() => handleDonate(tempItem._id)} className='p-2 m-2 my-3.5 w-2/5  rounded-md active:translate-y-1 bg-blue-500 text-neutral-100 hover:bg-blue-600 text-xl'>Donate</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export { Causes }