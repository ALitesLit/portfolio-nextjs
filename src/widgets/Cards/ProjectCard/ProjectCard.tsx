import { FC } from "react";

import { IProjectResponse } from "@/interfaces/Enitys";

import "./style.scss";

interface IProps {
    card: IProjectResponse;
}

const ProjectCard: FC<IProps> = ({ card }) => {
    return (
        <div className="project__card">
            <div className="project__card-header"><h1>{card?.name}</h1></div>
            
            <div className="project__card-content">
                <p>{card?.deskription}</p>

                { card?.experience?.length ? (
                    <div>
                        <p className="project__card-expirience">
                            Стек навыков: {
                                card.experience.map(
                                    (i, index) => (
                                        <span key={index}>{ i }{`${ index !== card.experience.length - 1 ? ", " : "" }`}</span>
                                    )
                                )
                            }
                        </p>
                    </div>
                ) : "" }
            </div>
            
            {
                card?.site && (
                    <div className="project__card-bottom">
                        <a href={card?.site}>
                            <button className="project__card-open">Перейти {">"}</button>
                        </a>
                    </div>
                )
            }
        </div>
    )
}


export default ProjectCard;