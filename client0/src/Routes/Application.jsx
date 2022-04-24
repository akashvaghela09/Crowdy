import React, { useEffect, useState } from 'react';
import styles from '../Styles/Application.module.css'
import { useDispatch, useSelector } from 'react-redux';

import {
    useNavigate,
  } from 'react-router-dom';
const Application = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        crowdy
    } = useSelector((state) => state.app)
    

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [target, setTarget] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = async () => {
          
        let tx = await crowdy.addForFunding(title, description, imgUrl, address, target)

        setTitle("")
        setDescription("")
        setImgUrl("")
        setTarget("")
        setAddress("")

        setTimeout(() => {
            navigate('/fund');
        }, 2000);
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.formDiv}>
                <div className={styles.formRow}>
                    <p className={styles.formLabel}>Title</p>
                    <input 
                        className={styles.formInput} 
                        placeholder='Title'
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>   
                <div className={styles.formRow}>
                    <p className={styles.formLabel}>Description</p>
                    <textarea 
                        className={styles.formInput} 
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{height: "150px"}}
                    />
                </div>  
                <div className={styles.formRow}>
                    <p className={styles.formLabel}>Receiver Address</p>
                    <input 
                        className={styles.formInput} 
                        placeholder='Receiver Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>  
                <div className={styles.formRow}>
                    <p className={styles.formLabel}>Target Amount</p>
                    <input 
                        className={styles.formInput} 
                        placeholder='100 Wei'
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </div> 
                <div className={styles.formRow}>
                    <p className={styles.formLabel}>Image Url</p>
                    <input 
                        className={styles.formInput} 
                        placeholder='image url'
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </div> 
                <button onClick={() => handleSubmit()} className={styles.submitBtn}>Submit</button>
            </div>
        </div>
    )
}

export { Application }