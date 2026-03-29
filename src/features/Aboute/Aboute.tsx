"use client"
import useMediaQuery from "@/shared/useMediaQuery";

import styles from "./style.module.scss";


const Aboute = () => {
    const matches = useMediaQuery("(max-width: 425px)");

    return (
        <section className={`${styles.aboute} relative flex justify-center items-center`} id = "aboute">
            <div className={`${styles.aboute_content} z-3`}>
                <h1 className={`${styles.aboute_header} text-left`}><span className="hesteg" /> Обо мне</h1>
                
                <div className={`${styles.aboute_content} z-2`}>
                    <p>Здравствуйте, я Александр!</p>
                    <p>Я имею коммерческий опыт работы с Next.js, React, Redux и препроцессором Sass. Помимо этого я владею такими языками программирования как JavaScript, TypeScript, Python и Java. Имею навыки резиновой и адаптивной вёрстки.</p>
                    <p>Я владею такими back-end технологиями как: фреймворки Spring, Express.js и Django, языками программирования Java и Python, а так же Docker, Nginx и Linux.</p>
                    <p>Я ответственный человек, который справится со всеми проблемами и задачами, которые передо мной будут поставлены. Я не боюсь высказывать свои предложения по улучшению проекта и меня неоднократно использовали для поиска ошибок в чужих проектах и для их решения.</p>
                </div>
            </div>


            {
                !matches && (
                    <div className={`${styles.aboute_background} absolute w-screen h-screen`}>
                        <img src="/svg/dots-group.svg" className={`${styles.dots}`} alt="" />
                        <img src="/svg/rectangle.svg" className={`${styles.rectangle}`} alt="" />
                    </div>
                )
            }
        </section>
    )
}


export default Aboute;