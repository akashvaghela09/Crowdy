import React, { useEffect } from 'react';
import styles from '../Styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import { AiFillFileText } from "react-icons/ai";
import { GrBitcoin } from "react-icons/gr";



const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        totalFundRaised,
        totalApplication,
        applicationList
    } = useSelector((state) => state.app)
    
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                Total Funding Raised : {totalFundRaised} Wei
            </div>
            <div className={styles.text}>
                Total Application Submitted : {totalApplication}
            </div>
            <div className={styles.pageDiv}>
                
                    <div className={styles.card}>
                        <AiFillFileText  className={styles.icon} />
                        <Link to="/apply" className={styles.link}>
                            <p className={styles.text2}>Apply For Crowd Funding</p>
                        </Link>
                    </div>
                
                    <div className={styles.card}>
                        <GrBitcoin className={styles.icon} />
                        <Link to="/fund" className={styles.link}>
                            <p className={styles.text2}>Contribute to Cause</p>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export { Home }