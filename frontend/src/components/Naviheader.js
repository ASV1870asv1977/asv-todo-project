import React from "react";
import {Link} from "react-router-dom";
import projectsImg from "../img/projects.png";
import todos from "../img/todos.png";
import usersImg from "../img/users.png";
import search from "../img/search.png";
import main from "../img/main.png";
import inTodo from "../img/intodo.png";
import outTodo from "../img/outtodo.png";
import userAuth from "../img/userAuth.png";


class HeaderNavi extends React.Component {

    render() {
        return (
            <div>
                <div className={"top__space"}>
                    <div className={"container top__menu__container"}>
                        <div className={'top__menu__navi-link'}>
                            <Link to={'/'} className={"top__menu__text top__menu__navi"}>
                                <img src={main} className={'top__menu__image'}/>
                                <p>Главная</p>
                            </Link>
                        </div>

                        {this.props.token ?

                            <div className={'top__menu'}>
                                <Link to={'/projects/'} className={"top__menu__text top__menu__navi"}>
                                    <img src={projectsImg} className={'top__menu__image'}/>
                                    <p>Проекты</p>
                                </Link>
                                <Link to={'/todos/'} className={"top__menu__text top__menu__navi"}>
                                    <img src={todos} className={'top__menu__image'}/>
                                    <p>Заметки</p>
                                </Link>
                                <Link to={'/users/'} className={"top__menu__text top__menu__navi"}>
                                    <img src={usersImg} className={'top__menu__image'}/>
                                    <p>Сотрудники</p>
                                </Link>
                            </div> :
                            <div style={{display: 'none'}}/>}

                        <form className={'top__menu'}>
                            <input className={'top__menu__search__area top__menu__text'} type="search" name="text"/>
                            <div className={'top__menu__search__button-area'} type="submit" value=" ">
                                <img src={search} className={'top__menu__image'}/>
                            </div>
                        </form>

                        {this.props.token ?
                            <div className={'top__menu__navi-link'}>
                                <div className={"top__menu__text top__menu__navi"} style={{margin: '0'}}>
                                    <img src={userAuth} className={'top__menu__image'} style={{marginRight: '0'}}/>
                                </div>
                                <p style={{color: '#316099', fontSize: '15px'}}>{this.props.username}</p>
                                <Link to={'/'} className={"top__menu__text top__menu__navi"}
                                      onClick={() => {this.props.logout()}}>
                                    <img src={outTodo} className={'top__menu__image'}/>
                                    <p>Выход</p>
                                </Link>
                            </div> :
                            <div className={'top__menu__navi-link'}>
                                <Link to={'/login/'} className={"top__menu__text top__menu__navi"}>
                                    <img src={inTodo} className={'top__menu__image'}/>
                                    <p>Вход</p>
                                </Link>
                            </div>}
                    </div>
                </div>

                <div className="top">
                    <div className="container top__box">
                        <div className="top__info">
                            <h1 className="top__heading"><b>To Do</b></h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default HeaderNavi;