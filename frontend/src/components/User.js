import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";
import addUser from "../img/addUser.png";
import filtering from "../img/filtering.png";
import group from "../img/group.png";
import search from "../img/search.png";


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
                        {user.email}
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

            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>

                        <Link to={'/users/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={addUser} className={'top__menu__image'}/>
                            Добавить пользователя
                        </Link>
                        <form className={"display__flex"}>
                            <input className={'top__menu__search__area top__menu__text'} type="search" name="text"/>
                            <div className={'bottom__menu__search__button-area'} type="submit" value=" ">
                                <img src={search} className={'top__menu__image'}/>
                            </div>
                        </form>

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