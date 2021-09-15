import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";
import projects from "../img/projects.png";
import todos from "../img/todos.png";
import usersImg from "../img/users.png";
import search from "../img/search.png";
import addUser from "../img/addUser.png";
import filtering from "../img/filtering.png";
import group from "../img/group.png";


const UserItem = ({user}) => {
    return (
        <div className={'container'}>
            <div className="card__box__list">
                <div className="card__box__component card__box__component-text">
                    <div className="card__box__component-link" style={{background: 'none'}}>
                    </div>
                    <div className="card__box__component-element">
                        {user.username}
                    </div>
                    <div className="card__box__component-element">
                        {user.first_name}
                    </div>
                    <div className="card__box__component-element">
                        {user.last_name}
                    </div>
                    <div className="card__box__component-element">
                        <a href={user.email}>{user.email}</a>
                    </div>

                </div>
                <hr/>
            </div>
        </div>




    )
}

const UserList = ({users}) => {
    return (
        <div>
            <div className={"top__space"}>
                <div className={"container top__menu__container"}>
                    <div className={'top__menu'}>
                        <Link to={'/'} className={"top__menu__text top__menu__navi"}>
                            <img src={projects} className={'top__menu__image'}/>
                            Проекты
                        </Link>
                        <Link to={'/todos/'} className={"top__menu__text top__menu__navi"}>
                            <img src={todos} className={'top__menu__image'}/>
                            Заметки
                        </Link>
                        <Link to={'/users/'} className={"top__menu__text top__menu__navi-active"}>
                            <img src={usersImg} className={'top__menu__image'}/>
                            Сотрудники
                        </Link>
                    </div>
                    <form className={'top__menu'}>
                        <input className={'top__menu__search__area top__menu__text'} type="search" name="text"/>
                        <div className={'top__menu__search__button-area'}
                             type="submit" value=" ">
                            <img src={search} className={'top__menu__image'}/>
                        </div>
                    </form>
                </div>
            </div>
            <HeaderNavi>
            </HeaderNavi>

            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>
                    <div className={'top__menu'}>
                        <Link to={'/users/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={addUser} className={'top__menu__image'}/>
                            Добавить
                        </Link>
                        <Link to={'/users/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={group} className={'top__menu__image'}/>
                            Группы
                        </Link>
                        <form className={'bottom__menu'}>
                            <input className={'top__menu__search__area top__menu__text'} type="search" name="text"/>
                            <div className={'bottom__menu__search__button-area'}
                                 type="submit" value=" ">
                                <img src={filtering} className={'top__menu__image'}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            <div className={'content'}>
                <div className={'container'}>
                    <div className="card__box__list">
                        <hr/>
                        <div className="card__box__component card__box__component-text">
                            <div className="card__box__component-link" style={{background: 'none'}}>
                            </div>
                            <div className="card__box__component-element">
                                <b>Логин</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Имя</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Фамилия</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Email</b>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>

                {users.map((user) => <UserItem user={user}/>)}

            </div>
        </div>
    )
}

export default UserList;