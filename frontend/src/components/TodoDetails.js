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

function HandTodoEdit() {
    const name_todo = document.getElementById("name_todo");
    const author_todo = document.getElementById("author_todo");
    const description_todo = document.getElementById("description");
    document.getElementById("edit_todo").style.display = 'none';
    document.getElementById("edit_save").style.display = 'block';
    document.getElementById("edit_cancel").style.display = 'block';

    name_todo.removeAttribute('disabled');
    name_todo.removeAttribute('placeholder');
    author_todo.removeAttribute('disabled');
    description_todo.removeAttribute('disabled');

    name_todo.classList.add('project__detail__edit');
    author_todo.classList.add('project__detail__edit');
    description_todo.classList.add('project__detail__edit');
}

const TodoDetail = ({filteredTodo, users, projects}) => {

    return (
        <div className="container ">
            <p className="project__info_text_heading"><b>Информация о заметке:</b></p>
            <div className="project__info project__info_text_heading">

                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">ID заметки</div>
                        <input className="project__detail" type="text" id="id_todo" placeholder={filteredTodo.id}
                               disabled
                               value={filteredTodo.id}/>
                    </div>
                    <div className={"top__menu__text bottom__menu__navi"} id="edit_todo"
                         onClick={HandTodoEdit}>
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
                        <div className="project__card__key">Заметка к проекту</div>
                        <select className="project__detail" name="short_note" id="name_todo"
                                disabled>
                            <option value={filteredTodo.short_note}>
                                {filteredTodo.short_note}
                            </option>
                            {projects.map((project) => (
                                <option value={project.id} key={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Автор заметки</div>
                        <select className="project__detail" name="created_by" id="author_todo"
                                disabled>
                            <option value={filteredTodo.created_by}>
                                {filteredTodo.created_by}
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
                        <div className="project__card__key">Содержание</div>
                        <textarea className="project__detail" name="description" id="description"
                               placeholder={filteredTodo.description} disabled="true"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Создана</div>
                        <input className="project__detail" name="created_at" id="created_at"
                               placeholder={filteredTodo.created_at}
                               disabled="true"/>
                    </div>
                </div>
                <div className="project__info__card">
                    <div className="display__flex">
                        <div className="project__card__key">Последнее обновление</div>
                        <input className="project__detail" type="text" placeholder={filteredTodo.update_at} disabled="true"/>
                    </div>
                    <Link to={'/todos/'} className={"top__menu__text bottom__menu__navi"} id="edit_cancel"
                          style={{display: 'none'}}>
                        <img src={cancel} className={'top__menu__image'}/>
                        Отменить
                    </Link>
                </div>
            </div>
        </div>
    )
}


export const TodoDetails = ({todos, projects, users, todoDelete}) => {

    let {id} = useParams();
    console.log(useParams())
    let filteredTodo = todos.filter((todo) => todo.id === +id);
    filteredTodo = filteredTodo[0];
    console.log('filteredTodo', filteredTodo)



    return (
        <div>
            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>
                    <div/>
                    <div/>
                    <div className={"top__menu__text bottom__menu__navi bottom__menu__navi-delete"}
                        onClick={() => todoDelete(filteredTodo.id)}>
                        <img src={deleteIcon} className={'top__menu__image'}/>
                        Удалить заметку
                    </div>
                </div>
            </div>
            <div className={'content'}>
                <TodoDetail filteredTodo={filteredTodo}
                            users={users}
                            projects={projects}>
                </TodoDetail>
            </div>
            <div className="container project_update_case">
                <Link to={'/projects/'}
                      className="project_update_form top__menu__text"
                      id="project_update_form"
                    // onClick={projectUpdate}
                >
                    Подтвердить изменения
                </Link>
            </div>

        </div>
    )
}

export default TodoDetails;