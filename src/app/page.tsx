"use client";
import { Aboute, Experience, MainSection, Projects, Sertefiese } from "@/features";
import { FadeIn } from "@/shared/Components";
import useMediaQuery from "@/shared/useMediaQuery";
import { Header, Social } from "@/widgets";

import "./page.scss";


export default function Home() {
    const matches = useMediaQuery("(max-width: 760px)");

    return (
        <>
            <header>
                <Header />
            </header>
            

            {
                !matches && (
                    <>
                        <Social />
                    </>
                )
            }


            <main>
                <FadeIn>
                    <MainSection />
                </FadeIn>

                <FadeIn>
                    <Aboute />
                </FadeIn>

                <FadeIn>
                    <Experience />
                </FadeIn>

                <FadeIn>
                    <Projects />
                </FadeIn>

                <FadeIn>
                    <Sertefiese />
                </FadeIn>
            </main>
        </>
    );
}
