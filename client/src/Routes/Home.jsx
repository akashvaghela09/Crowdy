import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import S3 from "aws-sdk/clients/s3";

const Home = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState("");

    const {
        contract
    } = useSelector(state => state.app)

    // required data for contract creation
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [address, setAddress] = useState("")
    
    // for upload image preview
    const [image, setImage] = useState("")

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

    

    // const GetData = async (para) => {
    //     const params = {
    //         Bucket: REACT_APP_STORJ_BUCKET,
    //         Key: para,
    //     };

    //     const url = s3.getSignedUrl("getObject", params);
    //     console.log(url)

    //     return url
    // }

    const uploadImage = async (e) => {
        let filename = `${Date.now()}-${file.name}`;

        const params = {
            Bucket: REACT_APP_STORJ_BUCKET,
            Key: filename,
            ContentType: file.type,
            Body: file,
            ACL: 'public-read'
        };

        try {
            let upload = await s3.upload(params, {
                partSize: 64 * 1024 * 1024
            }).promise();
            console.log(upload.Key, "Uploaded!!")
            return upload.Key
        } catch (err) {
            console.log(err)
        }
    }

    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            let temp = URL.createObjectURL(e.target.files[0])
            setImage(temp);
        }
    }

    const initData = async (n = 10) => {
        let data = await contract.getFundingData()
        // data.wait()
        console.log(data)
        dispatch(setLoading(false))

    }

    const handleSubmit = async () => {
        dispatch(setLoading(true))
        let imageKey = await uploadImage()
        let form = await contract.addForFunding(title, description, imageKey, address, amount)
        await form.wait()
        console.log("Submitted!!")
        initData()
    }

    useEffect(() => {
        initData()
    }, [contract]);

    return (
        <div className='h-full flex justify-center items-center flex-col'>
            <h1 className='text-3xl text-slate-200 p-10'>Home</h1>
            <img src={image} alt="temp" />
            <input className="p-2 m-2 text-xl" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="p-2 m-2 text-xl" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" className="m-2 text-xl p-2" onChange={(e) => handleImageSelect(e)} />
            <input className="p-2 m-2 text-xl" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            <input className="p-2 m-2 text-xl" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
            
            <button onClick={() => handleSubmit()} className='p-2 m-2 bg-slate-200 text-xl'>SUBMIT</button>
        </div>
    )
}

export { Home }