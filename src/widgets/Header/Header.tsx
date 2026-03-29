import useMediaQuery from "../../shared/useMediaQuery";
import ScrollsPy from "./components/ScrollsPy/SrollsPy";
import SocialHeader from "./components/social/social";

import styles from "./style.module.scss";


const Header = () => {
    const matches: boolean = useMediaQuery("(max-width: 760px)");


    return (
        <nav className={ styles.header }>
            {
                matches ? (
                    <>
                        <div>
                            <SocialHeader />
                        </div>
                    </>
                ) : (
                    <>
                        <ScrollsPy />
                    </>
                )
            }
        </nav>
    )
}


export default Header;