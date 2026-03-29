"use client";
import { useEffect, useState, useCallback } from "react";

import { fetchSocialService } from "../../../../service/service";
import BaseUrl from "../../../../service/url";
import { ISocailResponse } from "@/interfaces/Enitys";

import styles from "./style.module.scss";


const mock = process.env.NEXT_PUBLIC_REACT_APP_MOCK_ENV;

const SocialHeader = () => {
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


    return (
        <div className={ styles.social_header }>
            {
                    social.length ? (
                        social.map(
                            (i: ISocailResponse) => (
                                <a key={i.id} className={ styles.social_header_elem } href={i.site} style={{
                                    backgroundImage: `url(${ mock ? `${i.photo}` : BaseUrl + i.photo })`
                                }}>
                                </a>
                            )
                        )
                    ) : ""
                }
        </div>
    )
}


export default SocialHeader;