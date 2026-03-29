"use client";
import { useState, useCallback, useEffect } from "react";

import { fetchSocialService } from "../../service/service";
import { ISocailResponse } from "@/interfaces/Enitys";
import BaseUrl from "../../service/url";

import "./style.scss";


const mock = process.env.NEXT_PUBLIC_REACT_APP_MOCK_ENV;

const Social = () => {
    const [social, setSocial] = useState<ISocailResponse[]>([]);

    
    const fetchSocial = useCallback(
        async () => {
            try {
                const data = await fetchSocialService();

                setSocial(data);
            } catch (error) {
                console.log(error);
            }
        }, []
    );


    useEffect(
        () => {
            fetchSocial();
        }, []
    );


    useEffect(
        () => {
            
            console.log(social)
        }, [social]
    )


    return (
        <aside className="social">
            <ul>
                {
                    social.length ? (
                        social.map(
                            (i: ISocailResponse, index: number) => (
                                <a key={ index } href={ i.site }>
                                    <li style={{
                                        backgroundImage: `url(${ mock ? `${i.photo}` : BaseUrl + i.photo })`
                                    }} />
                                </a>
                            )
                        )
                    ) : ""
                }
            </ul>
        </aside>
    )
}


export default Social;