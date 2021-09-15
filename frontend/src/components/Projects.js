import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";
import projectsImg from "../img/projects.png";
import todos from "../img/todos.png";
import usersImg from "../img/users.png";
import search from "../img/search.png";
import filtering from "../img/filtering.png";
import addProject from "../img/addProject.png";


const ProjectItem = ({project}) => {
    return (
        <div className={'container'}>
            <div className="card__box__list">
                <div className="card__box__component card__box__component-text">
                    <Link className="card__box__component-link" to={`/project/${project.id}/`}>
                        {project.id}
                    </Link>
                    <div className="card__box__component-element">
                        {project.name}
                    </div>
                    <div className="card__box__component-element">
                        <a>{project.url_repo}</a>
                    </div>
                    <div className="card__box__component-element">
                        {project.users}
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

const ProjectList = ({projects}) => {

    return (
        <div>
            <div className={"top__space"}>
                <div className={"container top__menu__container"}>
                    <div className={'top__menu'}>
                        <Link to={'/'} className={"top__menu__text top__menu__navi-active"}>
                            <img src={projectsImg} className={'top__menu__image'}/>
                            Проекты
                        </Link>
                        <Link to={'/todos/'} className={"top__menu__text top__menu__navi"}>
                            <img src={todos} className={'top__menu__image'}/>
                            Заметки
                        </Link>
                        <Link to={'/users/'} className={"top__menu__text top__menu__navi"}>
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
                        <Link to={'/'} className={"top__menu__text bottom__menu__navi"}>
                            <img src={addProject} className={'top__menu__image'}/>
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

            <div className={'content'}>
                <div className={'container'}>
                    <div className="card__box__list">
                        <hr/>
                        <div className="card__box__component card__box__component-text">
                            <div className="card__box__component-link" style={{background: 'none'}}>
                            </div>
                            <div className="card__box__component-element">
                                <b>Название проекта</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Ссылка на репозиторий</b>
                            </div>
                            <div className="card__box__component-element">
                                <b>Автор</b>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>

                {projects.map((project) => <ProjectItem project={project}/>)}

            </div>
        </div>
    )
}


export default ProjectList;