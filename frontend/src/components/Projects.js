import React from "react";
import {Link} from "react-router-dom";
import HeaderNavi from "./Naviheader";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/project/${project.id}/`}>
                    {project.name}
                </Link>
            </td>
            <td>{project.url_repo}</td>
            <td>{project.users}</td>

        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div>
            <HeaderNavi>

            </HeaderNavi>
            <table>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Repository</th>
                    <th>Users</th>
                </tr>
                {projects.map((project) => <ProjectItem project={project}/>)}
                </tbody>
            </table>
        </div>
    )
}


export default ProjectList;