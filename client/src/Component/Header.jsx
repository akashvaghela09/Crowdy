import React from 'react';
import styles from '../Styles/Header.module.css'
import {Link, useLocation} from "react-router-dom";


const Header = () => {
    const location = useLocation();

    return (
        <div className={styles.wrapper}>
             
            <div className={styles.section1}>
                <Link to="/" className={location.pathname === "/" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>Crowdy</p>
                </Link> 
            </div> 
            <div className={styles.section2}>
                <Link to="/apply" className={location.pathname === "/apply" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>Apply</p>
                </Link> 
                <Link to="/fund" className={location.pathname === "/fund" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>Fund</p>
                </Link> 
            </div> 
        </div>
    )
}

export { Header }