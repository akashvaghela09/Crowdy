import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import S3 from "aws-sdk/clients/s3";
import { BsImage } from "react-icons/bs";
import { toast } from 'react-toastify';
import { metaMaskChecker } from '../Utils/metamaskChecker';

const RaiseFund = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");

    const {
        isAuth,
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

    // upload Image to StorJ platform
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

    const handleSubmit = async () => {
        dispatch(setLoading(true))
        let response = await metaMaskChecker();

        if (isAuth === false) {
            dispatch(setLoading(false))
            toast.error("Connect your wallet first! 🤦")
            return
        }

        if (title === "" || description === "" || amount === "" || address === "" || file === "") {
            toast.error("Please fill all the fields 🤦")
            dispatch(setLoading(false))
            return
        }

        let imageKey = await toast.promise(
            uploadImage(),
            {
                pending: 'Uploading Image... ⏳',
                success: 'Image Uploaded 👍',
                error: 'Something went wrong 🤦'
            }
        )

        let form = await toast.promise(
            contract.addForFunding(title, description, imageKey, address, amount),
            {
                pending: 'Submitting ... ⏳',
                success: 'Application Submitted 👍',
                error: 'Something went wrong 🤦'
            }
        )

        await form.wait()
        console.log("Submitted!!")

        setTitle("")
        setDescription("")
        setAddress("")
        setAmount("")
        setFile("")
        setImage("")

        dispatch(setLoading(false))
    }

    return (
        <div className='h-fit flex justify-center items-center flex-col'>
            <h1 className='text-4xl text-slate-800 underline decoration-blue-500 font-bold p-10'>Fill Your Application</h1>
            <div className='bg-slate-200 w-11/12 py-12 h-fit drop-shadow-md rounded-md flex flex-col justify-center items-center mb-16'>
                <div className='flex flex-col md:flex-row items-center gap-10 md:justify-evenly md:items-stretch w-full grow'>
                    <div className='flex justify-center flex-col w-11/12 md:w-2/5'>
                        <label className='py-2 text-xl'>Title</label>
                        <input className="p-2 mb-3 text-xl rounded-md" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label className='py-2 text-xl'>Description</label>
                        <input className="p-2 mb-3 text-xl rounded-md" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label className='py-2 text-xl'>Receiver's Address</label>
                        <input className="p-2 mb-3 text-xl rounded-md" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label className='py-2 text-xl'>Target Amount</label>
                        <input className="p-2 mb-3 text-xl rounded-md" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className='relative flex justify-between items-center flex-col w-11/12 md:w-2/5 border-4 p-6 border-dashed border-slate-400 bg-blue-100 drop-shadow-xl rounded-md h-fit max-h-96 md:h-auto'>
                        {
                            image === "" ?
                                <BsImage className='text-8xl fill-slate-500 grow' />
                                :
                                <img className='max-h-64' src={image} alt="Preview" />
                        }
                        <label className='w-4/5 p-2 mt-6 md:mt-0 rounded-md text-xl text-center active:translate-y-1 bg-blue-500 text-neutral-100 hover:bg-blue-600'>
                            <input type="file" accept=".jpg,.jpeg,.png" className="absolute top-0 left-0  w-4/5 p-1 rounded hidden" onChange={(e) => handleImageSelect(e)} />
                            {
                                image === "" ? "Upload Image" : "Change Image"
                            }
                        </label>
                    </div>
                </div>
                <button onClick={() => handleSubmit()} className='p-2 mt-16 w-11/12 md:w-96 rounded-md active:translate-y-1 bg-blue-500 text-neutral-100 hover:bg-blue-600 text-xl'>Submit Application</button>
            </div>
        </div>
    )
}

export { RaiseFund }