"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./style.module.scss";


const MainSection = () => {
    const [ title, setTitle ] = useState<string>("");


    useEffect(
        () => {
            const interval = setInterval(
                () => {
                    const final = "Веб-разработчик";
                    
                    if (final != title) {
                        setTitle(`${title}${final[title.length]}`);
                    }
                },
                500
            );

            return () => clearInterval(interval);
        }, [ title ]
    );


    const handleScroll = () => {
        document.getElementById('aboute')?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <section className={`${ styles.main } relative flex justify-center items-center`} id="main">
            <div className={`${styles.main_elem} relative flex flex-col`}>
                <h1 className={`${styles.main_title} inline`}>{title} <span className="enter"></span></h1>
                <p className={`${styles.main_text}`}>Доброго времени суток! Добро пожаловать на мой сайт, где вы сможете ознакомится с моими навыками и проектами</p>
            
                <button className={`${styles.main_go}`} onClick={() => handleScroll()}>Давайте начнём?</button>
            </div>

            <div className={`${styles.main_photo} flex justify-center items-center`}>
                <Image 
                    src="/images/my-photo.jpg" 
                    alt="Александр - Frontend Разработчик"
                    className={`${styles.image} object-cover`}
                    width={640}
                    height={640} 
                    priority
                />
            </div>
        </section>
    )
}


export default MainSection;