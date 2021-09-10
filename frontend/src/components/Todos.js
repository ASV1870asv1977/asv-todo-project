import React from "react";
import {Link} from "react-router-dom";
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

const TodosList = ({todos}) => {
    return (
        <div>
            <HeaderNavi>

            </HeaderNavi>
            <table>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Short note</th>
                    <th>Description</th>
                    <th>Created by</th>
                    <th>Created at</th>
                    <th>Update at</th>
                    <th>Is active</th>
                </tr>
                {todos.map((todo) => <TodoItem todo={todo}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default TodosList;