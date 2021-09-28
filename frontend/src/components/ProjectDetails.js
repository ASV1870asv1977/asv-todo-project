import React from "react";
import {useParams, useLocation, Link} from "react-router-dom";

import addTodo from "../img/addTodo.png";
import search from "../img/search.png";
import deleteIcon from "../img/deleteIcon.png";
import edit from "../img/edit.png";


const TodoItem = ({todo, filteredProject}) => {
    todo.short_note = filteredProject['name'];
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

// function HandProjectEdit() {
//     document.getElementsByClassName("project__detail").setAttr('disabled', 'false')
//
// }

const ProjectDetail = ({filteredProject, users, countTodos}) => {
    let usersStorage = users;
    var authors = [];
    for (var projectUser of filteredProject.users) {
        for (var user of usersStorage) {
            if (projectUser === user['id']) {
                projectUser = user['first_name'][0] + '.' + user['last_name'];
                authors.push(projectUser)
            }
        }
    }
    return (
        <div className="container ">
            <p className="project__info_text_heading"><b>Информация о проекте:</b></p>
            <div className="project__info project__info_text_heading">

                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">ID проекта</div>
                        <input className="project__detail" type="text" placeholder={filteredProject.id}
                               disabled="True"/>
                    </div>
                    <div className={"top__menu__text bottom__menu__navi"} >
                        <img src={edit} className={'top__menu__image'}/>
                        Редактировать
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Название проекта</div>
                        <input className="project__detail" type="text" placeholder={filteredProject.name}
                               disabled="True"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Автор проекта</div>
                        <input className="project__detail" type="text"
                               placeholder={authors.map((author) => author + " ")}
                               disabled="True"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Ссылка на репозиторий</div>
                        <input className="project__detail" type="text" placeholder={filteredProject.url_repo}
                               disabled="True"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Количество заметок</div>
                        <input className="project__detail" type="text" placeholder={countTodos} disabled="True"/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ProjectDetails = ({todos, projects, users, projectDelete}) => {
    console.log('todos', todos)

    let {id} = useParams();
    let filteredProject = projects.filter((project) => project.id === +id);
    filteredProject = filteredProject[0]

    let filteredTodos = todos.filter((todo) => todo.short_note === filteredProject.name);
    // let filteredTodos = []
    // for (let i = 0; i < todos.length; i++) {
    //     if (todos[i].short_note === filteredProject.name) {
    //         filteredTodos.push(todos[i]);
    //     }
    // }

    let countTodos = filteredTodos.length
    console.log('filteredProject', filteredProject)
    console.log('filteredTodos', filteredTodos)

    return (
        <div>
            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>

                    <Link to={'/todos/'} className={"top__menu__text bottom__menu__navi"}>
                        <img src={addTodo} className={'top__menu__image'}/>
                        Создать заметку к проекту "{filteredProject.name}"
                    </Link>
                    <form className={'display__flex'}>
                        <input className={'top__menu__search__area top__menu__text'} type="search" name="text"/>
                        <div className={'bottom__menu__search__button-area'} type="submit" value=" ">
                            <img src={search} className={'top__menu__image'}/>
                        </div>
                    </form>

                    <div className={"top__menu__text bottom__menu__navi bottom__menu__navi-delete"}
                         onClick={() => projectDelete(filteredProject.id)}>
                        <img src={deleteIcon} className={'top__menu__image'}/>
                        Удалить проект "{filteredProject.name}"
                    </div>


                </div>
            </div>
            <div className={'content'}>
                <ProjectDetail filteredProject={filteredProject}
                               users={users}
                               countTodos={countTodos}/>
            </div>

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
                {filteredTodos.map((todo) => <TodoItem todo={todo} filteredProject={filteredProject}/>)}
            </div>
        </div>
    )
}

export default ProjectDetails;