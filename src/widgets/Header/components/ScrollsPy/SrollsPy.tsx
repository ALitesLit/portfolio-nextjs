"use client";
import { useState, useEffect } from "react";

import styles from "../../style.module.scss";

type activeIds = "main" | "aboute" | "skills" | "project" | "sertefies";

const ScrollsPy = () => {
    const [activeId, setActiveId] = useState<activeIds>('main');

    const sections: activeIds[] = ["main", "aboute", "skills", "project", "sertefies"];

    const handleScroll = (e: React.MouseEvent, id: activeIds) => {
        e.preventDefault();
        const element = document.getElementById(id);
        
        if (element) {
            const offset = 80; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleWindowScroll = () => {
            for (const id of sections) {
                const element = document.getElementById(id);

                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveId(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleWindowScroll);
        handleWindowScroll(); 
        
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, []);

    return (
        <ul id="scrollsPy">
            <li><a href="#main" onClick={(e) => handleScroll(e, 'main')} className={activeId === 'main' ? styles.active : ''}>Главная</a></li>
            <li><a href="#aboute" onClick={(e) => handleScroll(e, 'aboute')} className={activeId === 'aboute' ? styles.active : ''}>Обо мне</a></li>
            <li><a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className={activeId === 'skills' ? styles.active : ''}>Мои навыки</a></li>
            <li><a href="#project" onClick={(e) => handleScroll(e, 'project')} className={activeId === 'project' ? styles.active : ''}>Проекты</a></li>
            <li><a href="#sertefies" onClick={(e) => handleScroll(e, 'sertefies')} className={activeId === 'sertefies' ? styles.active : ''}>Сертефикаты</a></li>
        </ul>
    )
}


export default ScrollsPy;