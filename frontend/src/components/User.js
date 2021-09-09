import React from "react";
import {Link} from "react-router-dom";
import MainPage from "./main";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div>
            <MainPage>

            </MainPage>
            <table>
                <tbody>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
                {users.map((user) => <UserItem user={user}/>)}
                </tbody>

            </table>
        </div>
    )
}

export default UserList;