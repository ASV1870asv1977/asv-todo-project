import React from "react";
import {useParams, useLocation} from "react-router-dom";

import HeaderNavi from "./Naviheader";


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.short_note}
            </td>
            <td>
                {todo.description}
            </td>
            <td>
                {todo.created_by}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.update_at}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}


const ProjectTodoList = ({todos}) => {

    let {id} = useParams();
    console.log('id------', id);
    console.log('todos---!!!', todos);




    let filteredTodos = todos.filter((todo) => todo.short_note === +id);
    console.log('filteredTodos------', filteredTodos);

    return (
        <div>
            <HeaderNavi>

            </HeaderNavi>
            <table>
                <tbody>
                <h1>{id}</h1>
                <tr>
                    <th>ID</th>
                    <th>Short note</th>
                    <th>Description</th>
                    <th>Created by</th>
                    <th>Created at</th>
                    <th>Update at</th>
                    <th>Is active</th>
                </tr>
                {filteredTodos.map((todo) => <TodoItem todo={todo}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectTodoList;