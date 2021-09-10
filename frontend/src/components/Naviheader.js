import React from "react";
import {Link} from "react-router-dom";


const HeaderNavi = () => {
    return (
        <div className="top">
            <div className="container top__box">

                <div className="top__info">
                    <h1 className="top__heading"><b>To Do</b></h1>
                    <div className={'top__menu'}>
                        <Link to={'/'} className={"top__menu__text top__menu__navi"}>
                            ГЛАВНАЯ
                        </Link>
                        <Link to={'/projects/'} className={"top__menu__text top__menu__navi"}>
                            ПРОЕКТЫ
                        </Link>
                        <Link to={'/todos/'} className={"top__menu__text top__menu__navi"}>
                            ЗАМЕТКИ
                        </Link>
                        <Link to={'/users/'} className={"top__menu__text top__menu__navi"}>
                            СОТРУДНИКИ
                        </Link>
                    </div>

                </div>



            </div>

        </div>


    )
}

export default HeaderNavi;