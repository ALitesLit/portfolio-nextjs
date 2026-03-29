import styles from "./style.module.scss";


const Menu = () => {
    return (
        <div className={ styles.menu }>
            <div className={ styles.menu_wrapper } id="menu-wrapper"></div>

            <div className={ styles.menu_black_back } id="menu-black-back"></div>
        </div>
    )
}


export default Menu;