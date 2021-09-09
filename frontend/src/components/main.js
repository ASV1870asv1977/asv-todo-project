import React from "react";
import {Link} from "react-router-dom";


const MainPage = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Главная</Link>
                </li>
                <li>
                    <Link to={'/projects/'}>Проекты</Link>
                </li>
                <li>
                    <Link to={'/todos/'}>Заметки</Link>

                </li>
                <li>
                    <Link to={'/users/'}>Сотрудники</Link>

                </li>

            </ul>
        </nav>

    )
}

export default MainPage;