import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";
import addTodo from "../img/addTodo.png";
import filtering from "../img/filtering.png";
import search from "../img/search.png";


const TodoItem = ({todo, projects}) => {


    return (
        <div className={'container'}>
            <div className="card__box__list">
                <div className="card__box__component card__box__component-text">
                    <Link className="card__box__component-link" to={`/todo/${todo.id}/`}>
                        {todo.id}
                    </Link>
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
                        {todo.created_at.slice(0, 10)}
                    </div>
                    <div className="card__box__component-element">
                        {todo.update_at.slice(0, 16).replace('T', ' ')}
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

const TodosList = ({todos, projects}) => {
    return (
        <div>

            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>

                    <Link to={'/todos/create/'} className={"top__menu__text bottom__menu__navi"}>
                        <img src={addTodo} className={'top__menu__image'}/>
                        Создать заметку
                    </Link>
                    <form className={'display__flex'}>
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

                {todos.map((todo) => <TodoItem todo={todo} projects={projects}/>)}

            </div>
        </div>
    )
}

export default TodosList;