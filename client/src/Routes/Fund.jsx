import React, { useState } from 'react';
import styles from '../Styles/Fund.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setApplicationList, setTotalApplication, setTotalFundRaised } from '../Redux/app/actions';
import {useLocation} from "react-router-dom";

import { GrClose } from "react-icons/gr";


const Fund = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tempId, setTempId] = useState(-1);
    const [fundAmount, setFundAmount] = useState("");
    const [title, setTitle] = useState("");
    const [popupStatus, setPopupStatus] = useState(false);

    const {
        applicationList,
        crowdy
    } = useSelector((state) => state.app)
    
    const handleFund = (para) => {
        setTempId(para.id);
        setPopupStatus(true)
        setTitle(para.title)
    }

    const handlePopupClose = () => {
        setTempId(-1);
        setPopupStatus(false)
        setTitle("")
    }

    const handleTransfer = async () => {
        let tx = await crowdy.contribute(tempId, {value: fundAmount})
        
        setFundAmount("")
        setPopupStatus(!popupStatus)

        setTimeout(() => {
            getData(tempId);
        }, 5000);
    }

    const getData = async (para) => {
        let arr = [...applicationList];
        let itemObj = {}
        const item = await crowdy.getFundingData(para);

        // Set values
        itemObj.id = item.id.toString();
        itemObj.collection = item.collection.toString();
        itemObj.target = item.target.toString();
        itemObj.title = item.title;
        itemObj.description = item.description;
        itemObj.imageUrl = item.imageUrl;
        itemObj.receiver = item.receiver;
        itemObj.isOpen = item.isOpen;
        itemObj.isValid = item.isValid;

        arr[para] = itemObj;

        dispatch(setApplicationList(arr))
    }

    return (
        <div className={styles.wrapper}>
            {
                applicationList.length !== undefined && applicationList.map((el, index) => { 
                    return (
                        el.isValid === true &&
                        <div key={index} className={styles.card}>
                            <div className={styles.imageDiv}>
                                <img className={styles.img} src={el.imageUrl} alt="poster"/>
                            </div>   
                            <div className={styles.contentDiv}>
                                <p className={styles.titleText}>{el.title}</p>
                                <p className={styles.descriptionText}>{el.description}</p>
                                <div className={styles.fundTextDiv}>
                                    <p className={styles.fundTextDiv_Text1}><b>{el.collection}</b> Raised out of </p>
                                    <p className={styles.fundTextDiv_Text2}>{el.target} Wei</p>
                                </div>
                                <div className={styles.fundDiv}>
                                    {
                                        el.isOpen == true && el.isValid == true ? <button onClick={() => handleFund(el)}  className={styles.fundBtn}>Fund</button> : <button disabled className={styles.fundBtn}>Fund</button>
                                    }
                                    
                                </div>
                            </div> 
                            {
                                popupStatus === true ? 
                                    <div className={styles.popupDiv}>
                                        <div className={styles.popupCard}>
                                            <GrClose className={styles.closeIcon} onClick={() => handlePopupClose()}/>
                                            <p className={styles.popupText1}>You are funding for</p>
                                            <p className={styles.popupText2}>{title}</p>
                                            <div>
                                                <input value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} className={styles.popupInput} />
                                                <button onClick={() => handleTransfer()}  className={styles.popupFundBtn}>Fund</button>
                                            </div>
                                        </div>
                                    </div> : null
                            }
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export { Fund }