"use client";
import { useState, useCallback, useEffect } from "react";

import { ProjectCard } from "@/widgets";
import { fetchProjectsService, fetchСategoryService } from "@/service";
import { ICategoryResponse, IProjectResponse } from "@/interfaces/Enitys";

import styles from "./style.module.scss";


const Projects = () => {
    const [mode, setMode] = useState("все");
    const [loadMore, setLoadMore] = useState(false);
    const [category, setCategory] = useState<ICategoryResponse[]>([]);
    const [projects, setProjests] = useState<IProjectResponse[]>([]);
    const [selectCategory, setSelectCategory] = useState<number>(0);


    const fetchCategory = useCallback(
        async () => {
            try {
                const data = await fetchСategoryService();

                setCategory(data);
            } catch (error) {
                console.log(error);
            }
        }, []
    );


    useEffect(
        () => {
            fetchCategory();
        }, []
    );


    const fetchProjects = useCallback(
        async () => {
            try {
                const data = await fetchProjectsService(loadMore, selectCategory);

                setProjests(data);
            } catch (error) {
                console.log(error);
            }
        }, [ loadMore, selectCategory ]
    );


    useEffect(
        () => {
            fetchProjects();
        }, [ selectCategory, loadMore ]
    );


    return (
        <section className={`${styles.projects} relative flex justify-center items-center`} id="project">
            <div className={`${styles.projects_content} z-3`}>
                <h1 className={`${styles.projects_header}`}><span className="hesteg" /> Мои проекты</h1>
                
                <div className={`${styles.projects_content}`}>
                    <div className={`${styles.button_group} flex justify-between flex-wrap`}>
                        <button className={mode === "все" ? styles.active : ""} onClick={
                            () => {
                                setMode("все");
                                setSelectCategory(0);
                            }
                        }>все</button>

                        {
                            category.length && (
                                category.map(
                                    ( i: ICategoryResponse, index: number ) => (
                                        <button key={index} className={mode === `${i?.name.toString()}` ? styles.active : ""} onClick={
                                            () => {
                                                setMode(`${i.name}`);
                                                setSelectCategory(i.id);
                                            }
                                        }>{i.name.toLowerCase()}</button>
                                    )
                                )
                            )
                        }
                    </div>
                </div>


                <div className={`${styles.project_list} flex justify-around flex-wrap`}>
                        {
                            projects.length ? (
                                projects.map(
                                    ( i: IProjectResponse, index: number ) => <ProjectCard key={index} card={i} />
                                )
                            ) : <p className={`${styles.not_found}`}>Проекты не найдены</p>
                        }
                </div>

                
                {
                    !loadMore && <p className={`${styles.load_new}`} onClick={() => setLoadMore(true)}>∨ загрузить ещё ∨</p>
                }
            </div>


            <div className={`${styles.projects_back} absolute w-screen h-screen`}>
                <img src={"/svg/dots-group.svg"} className={styles.projects_back_dots} />
                <img src={"/svg/dots-group.svg"} className={styles.projects_back_dots2}/>
            </div>
        </section>
    )
}


export default Projects;