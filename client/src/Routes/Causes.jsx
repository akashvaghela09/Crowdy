import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import S3 from "aws-sdk/clients/s3";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import {
    Routes,
    Route,
    Link,
    Navigate,
  } from 'react-router-dom';
const Causes = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [list, setList] = useState([]);

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
        // let data = await toast.promise(contract.getFundingData(), 
        // {
        //     pending: 'Getting Data ...',
        //     success: 'Application Submitted 👌',
        //     error: 'Something went wrong Data 🤯'
        // }
        // )

        let data2 = await toast.promise(contract.getTotalFundingData(), 
        {
            pending: 'Getting Data ...',
            success: 'Got the data 👌',
            error: 'Something went wrong Data Length 🤯'
        }
        )
           

        // console.log(data)
        console.log(data2.toString())

        let tempList = []

        // for(let i = 0; i < data.length; i++){
        //     let tempObj = {}
        //     let item = data[i]
        //     let url = await getImageUrl(item.imageId)
            
        //     tempObj["_id"] = item.id.toString()
        //     tempObj["collection"] = item.collection.toString()
        //     tempObj["target"] = item.target.toString()
        //     tempObj["title"] = item.title
        //     tempObj["description"] = item.description
        //     tempObj["imageUrl"] = url
        //     tempObj["receiver"] = item.receiver
        //     tempObj["isOpen"] = item.isOpen
        //     tempObj["isValid"] = item.isValid
        //     tempObj["progress"] = "75%"
            
        //     tempList.push(tempObj)
        // }

        // setList([...tempList])
    }
    // console.log(list)

    const checkAuth = () => {
        if(isAuth === false){
            console.log("isAuth: ", isAuth);
            navigate("/")
        }
    }
    
    useEffect(() => {
        // checkAuth()
        getData()
    }, []);

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-slate-200 p-10'>Causes</h1>
            <button onClick={() => getData()}>Get Data</button>
            <div className='flex w-full flex-wrap justify-evenly gap-5 mb-20'>
            {
                list.length !== undefined && list.length > 0 && list.map((item, index) => {
                    return <div className='w-11/12 md:w-72 bg-slate-200 rounded-lg drop-shadow-lg m-4 flex flex-col items-center' key={"card-"+index}>
                        <div className='w-full h-48 flex justify-center bg-slate-300 rounded-t-lg'>
                            <img className='h-full w-full object-cover rounded-t-lg' src={item.imageUrl} alt="cover"/>
                        </div>
                        <p className='w-full text-xl font-bold  p-1 px-2 line-clamp-1'>{item.title}</p>
                        {/* <p className='w-full text-sm p-1 px-2 m-1  h-[70px] text-justify line-clamp-3'>{item.description}</p> */}
                        <label className='w-full flex  pl-2 items-baseline'>
                            <p className='text-2xl font-bold text-slate-700'>3800 Wei</p><p className='ml-1 text-slate-500 '>raised out of</p>
                        </label>
                        <p className='w-full text-slate-500 mb-2 pl-2'>105000 Wei</p>
                        <div className='bg-blue-300 h-2 w-11/12 rounded'><div className="bg-blue-500 h-2 rounded" style={{width: item.progress}}></div></div>
                        <button className='p-2 m-2 my-3.5 w-11/12  rounded-md active:translate-y-1 bg-blue-500 text-neutral-100 hover:bg-blue-600 text-xl'>Donate</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}

export { Causes }