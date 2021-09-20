import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";
import filtering from "../img/filtering.png";
import addProject from "../img/addProject.png";


const ProjectItem = ({project}) => {
    let usersStorage = JSON.parse(localStorage.getItem('usersStorage'));
    var authors = [];
    for (var projectUser of project.users) {
        for (var user of usersStorage) {
            if (projectUser === user['id']) {
                projectUser = user['first_name'][0] + '.' + user['last_name'];
                authors.push(projectUser)
            }
        }
    }
    console.log(authors)

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
                        <a href={project.url_repo}>{project.url_repo}</a>
                    </div>
                    <div className="card__box__component-element">
                        {authors + ' '}
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