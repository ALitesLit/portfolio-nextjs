"use client";
import { useCallback, useState, useEffect } from "react";

import { SkillCard } from "@/widgets";
import useMediaQuery from "@/shared/useMediaQuery";
import { fetchSkillsService } from "@/service";

import styles from "./style.module.scss";


const Experience = () => {
    const [skills, setSkills] = useState([]);
    const matches = useMediaQuery("(max-width: 625px)");


    const fetchSkills = useCallback(
        async () => {
            try {
                const data = await fetchSkillsService();

                setSkills(data);
            } catch (error) {
                console.log(error);
            }
        }, []
    )


    useEffect(
        () => {
            fetchSkills();
        }, []
    )


    return (
        <section className={`${styles.skills} relative flex flex-column justify-center items-center`} id = "skills">
            <div className={`${styles.skills_content} justify-around `}>
                {
                    matches ? (
                        <h1 className={`${styles.skills_header}`}><span className="hesteg" /> Навыки</h1>
                    ) : (
                        <div className={`${styles.skills_left }`}>    
                            <h1 className={`${styles.skills_header}`}><span className="hesteg" /> Навыки</h1>
                            
                            <img src={"/svg/group1.svg"} />
                        </div>
                    )
                }

                <div className={styles.skills_cards} id="skills_list">
                    {
                        skills.length ? (
                            skills.map(
                                (i, index) => <SkillCard key={index} name={i.category} list={i.experienceList} />
                            )
                        ) : <p className={`${styles.not_found}`}>Проекты не найдены</p>
                    }
                </div>
            </div>
        </section>
    )
}


export default Experience;