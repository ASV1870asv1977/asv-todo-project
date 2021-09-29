import React from "react";
import {useParams, useLocation, Link} from "react-router-dom";


import addTodo from "../img/addTodo.png";
import search from "../img/search.png";
import deleteIcon from "../img/deleteIcon.png";
import edit from "../img/edit.png";
import save from "../img/save.png";
import cancel from "../img/cancel.png";


export function handlerUpdate() {

    let project_update = {
        id: document.getElementById('id_project').value,
        name: document.getElementById('name_project').value,
        users: document.getElementById('author_project').value,
        url_repo: document.getElementById('repo_project').value
    }
    localStorage.setItem('project_update', JSON.stringify(project_update));
    document.getElementById('project_update_form').style.display = 'block';
    document.getElementById('edit_save').style.display = 'none';

    const name_project = document.getElementById("name_project");
    const author_project = document.getElementById("author_project");
    const repo_project = document.getElementById("repo_project");

    name_project.setAttribute('disabled', 'true');
    author_project.setAttribute('disabled', 'true');
    repo_project.setAttribute('disabled', 'true');

    name_project.classList.remove('project__detail__edit');
    author_project.classList.remove('project__detail__edit');
    repo_project.classList.remove('project__detail__edit');
}

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

function HandProjectEdit() {
    const name_project = document.getElementById("name_project");
    const author_project = document.getElementById("author_project");
    const repo_project = document.getElementById("repo_project");
    document.getElementById("edit_project").style.display = 'none';
    document.getElementById("edit_save").style.display = 'block';
    document.getElementById("edit_cancel").style.display = 'block';

    name_project.removeAttribute('disabled');
    name_project.removeAttribute('placeholder');
    author_project.removeAttribute('disabled');
    repo_project.removeAttribute('disabled');

    name_project.classList.add('project__detail__edit');
    author_project.classList.add('project__detail__edit');
    repo_project.classList.add('project__detail__edit');
}

const ProjectDetail = ({filteredProject, users, countTodos}) => {

    let usersStorage = users;
    var authors = [];
    for (var projectUser of filteredProject.users) {
        for (var user of usersStorage) {
            if (projectUser === user['id']) {
                projectUser = user['last_name'];
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
                        <input className="project__detail" type="text" id="id_project" placeholder={filteredProject.id}
                               disabled
                               value={filteredProject.id}/>
                    </div>
                    <div className={"top__menu__text bottom__menu__navi"} id="edit_project"
                         onClick={HandProjectEdit}>
                        <img src={edit} className={'top__menu__image'}/>
                        Редактировать
                    </div>


                    <div className={"top__menu__text bottom__menu__navi"} id="edit_save"
                         onClick={handlerUpdate}
                         style={{display: 'none'}}>
                        <img src={save} className={'top__menu__image'}/>
                        Сохранить
                    </div>


                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Название проекта</div>
                        <input className="project__detail" name="name" id="name_project" type="text"
                               placeholder={filteredProject.name}
                               disabled/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Автор проекта</div>
                        <select className="project__detail" name="users" id="author_project"
                                disabled>
                            <option
                                value={authors.map((author) => author + " ")}>{authors.map((author) => author + " ")}
                            </option>
                            {users.map((user) => (
                                <option value={user.id} key={user.id}>
                                    {user.last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Ссылка на репозиторий</div>
                        <input className="project__detail" name="url_repo" id="repo_project" type="url"
                               placeholder={filteredProject.url_repo}
                               disabled="true"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Количество заметок</div>
                        <input className="project__detail" type="text" placeholder={countTodos} disabled="true"/>
                    </div>
                    <Link to={'/projects/'} className={"top__menu__text bottom__menu__navi"} id="edit_cancel"
                          style={{display: 'none'}}>
                        <img src={cancel} className={'top__menu__image'}/>
                        Отменить
                    </Link>
                </div>
            </div>
        </div>
    )
}


export const ProjectDetails = ({todos, projects, users, projectDelete, projectUpdate}) => {
    console.log('todos', todos)

    let {id} = useParams();
    let filteredProject = projects.filter((project) => project.id === +id);
    filteredProject = filteredProject[0]

    let filteredTodos = todos.filter((todo) => todo.short_note === filteredProject.name);

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
                               countTodos={countTodos}>
                </ProjectDetail>
            </div>
            <div className="container project_update_case">
                <Link to={'/projects/'}
                      className="project_update_form top__menu__text"
                      id="project_update_form"
                      onClick={projectUpdate}>
                    Подтвердить изменения
                </Link>
            </div>
            {countTodos ?
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
                </div> :
                <div></div>}
        </div>
    )
}

export default ProjectDetails;