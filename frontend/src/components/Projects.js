import React from "react";
import {Link} from "react-router-dom";
import filtering from "../img/filtering.png";
import addProject from "../img/addProject.png";
import search from "../img/search.png";


const ProjectItem = ({project, users}) => {

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
                        <p>{authors.map((author) => author + " ")}</p>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

const ProjectList = ({projects, users, projectsFilter}) => {

    return (
        <div>

            <div className={"navi__bottom"}>
                <div className={"container navi__content"}>

                    <Link to={'/projects/create'} className={"top__menu__text bottom__menu__navi"}>
                        <img src={addProject} className={'top__menu__image'}/>
                        Создать проект
                    </Link>
                    <form className={'display__flex'}>
                        <input className={'top__menu__search__area top__menu__text'}
                               id="search_project"
                               type="text"
                        />
                        <div className={'bottom__menu__search__button-area'}
                             onClick={() => projectsFilter(document.getElementById("search_project").value)}>

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
                {projects.map((project) => <ProjectItem project={project} users={users}/>)}
            </div>

        </div>

    )

}


export default ProjectList;