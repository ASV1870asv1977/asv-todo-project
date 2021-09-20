import React from "react";
import {useParams, useLocation, Link} from "react-router-dom";

import HeaderNavi from "./Naviheader";
import projects from "../img/projects.png";
import todosImg from "../img/todos.png";
import usersImg from "../img/users.png";
import search from "../img/search.png";
import addTodo from "../img/addTodo.png";
import filtering from "../img/filtering.png";


const TodoItem = ({todo}) => {
    return (
        <div className={'container'}>
            <div className="card__box__list">
                <div className="card__box__component card__box__component-text">
                    <div className="card__box__component-link" style={{background: 'none'}}>
                    </div>
                    <div className="card__box__component-element">
                        {todo.short_note}
                    </div>
                    <div className="card__box__component-element">
                        {todo.description}
                    </div>
                    <div className="card__box__component-element">
                        {todo.created_by}
                    </div>
                    <div className="card__box__component-element">
                        {todo.created_at}
                    </div>
                    <div className="card__box__component-element">
                        {todo.update_at}
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

// ======================================================================================================
const ProjectDetails = ({projects}) => {
    let {id} = useParams();
    let filteredTodos = this.props.value.filter((todo) => todo.short_note === +id);

    let filteredProject = projects.filter((project) => project.id === +id);

    return (
        <div>
            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>
                    <div className={'top__menu'}>
                        <Link to={'/todos/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={addTodo} className={'top__menu__image'}/>
                            Создать
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

            <div>
                <p>{filteredProject.name}</p>
                <p>{filteredProject.users}</p>
            </div>

            <div className={'content'}>
                <div className={'container'}>
                    <div className="card__box__list">
                        <hr/>
                        <div className="card__box__component card__box__component-text">
                            <div className="card__box__component-link" style={{background: 'none'}}>
                            </div>
                            <div className="card__box__component-element">
                                <b>Заметка в проект</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Тема заметки</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Автор</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Создана</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Обновлена</b>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                {filteredTodos.map((todo) => <TodoItem todo={todo}/>)}
            </div>
        </div>
    )
}

export default ProjectDetails;