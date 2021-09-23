import React from "react";
import {useParams, useLocation, Link} from "react-router-dom";

import HeaderNavi from "./Naviheader";
import projects from "../img/projects.png";
import todosImg from "../img/todos.png";
import usersImg from "../img/users.png";
import search from "../img/search.png";
import addTodo from "../img/addTodo.png";


const TodoItem = ({todo, filteredProject}) => {
    let projectsStorage = filteredProject;
    for (var project of projectsStorage) {
        if (todo.short_note === project['id']) {
            todo.short_note = project['name'];
        }
    }

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

const ProjectDetail = ({project, users}) => {
    let usersStorage = users;
    var authors = [];
    for (var projectUser of project.users) {
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
                    <div className="project__card__key">ID проекта</div>
                    <div className="project__card__value">{project.id}</div>
                </div>
                <div className="project__info__card">
                    <div className="project__card__key">Название проекта</div>
                    <div className="project__card__value">{project.name}</div>
                </div>
                <div className="project__info__card">
                    <div className="project__card__key">Автор проекта</div>
                    <div className="project__card__value">{authors + ' '}</div>
                </div>
                <div className="project__info__card">
                    <div className="project__card__key">Ссылка на репозиторий</div>
                    <div className="project__card__value"><a href={project.url_repo}>{project.url_repo}</a></div>
                </div>
            </div>
        </div>
    )
}


const ProjectDetails = ({todos, projects, users}) => {

    let {id} = useParams();
    let filteredTodos = todos.filter((todo) => todo.short_note === +id);
    let filteredProject = projects.filter((project) => project.id === +id);

    return (
        <div>
            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>
                    <div className={'top__menu'}>
                        <Link to={'/todos/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={addTodo} className={'top__menu__image'}/>
                            Создать заметку
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'content'}>
                {filteredProject.map((project) => <ProjectDetail project={project} users={users}/>)}
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