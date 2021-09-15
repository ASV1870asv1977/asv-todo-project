import './App.css';
import React from "react";

import axios from "axios";
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import HeaderNavi from "./components/Naviheader";
import ProjectPage from "./components/ProjectTodos";
import ProjectTodoList from "./components/ProjectTodos";
import SoloProjectList from "./components/ProjectTodos";


const pageNotFound404 = ({location}) => {
    return (
        <div>
            <HeaderNavi>

            </HeaderNavi>
            <h1>Страница '{location.pathname}' не существует</h1>
        </div>
    )
}

const API_ROOT = 'http://127.0.0.1:8000/api/';
const get_url = (name_page) => `${API_ROOT}${name_page}`;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todos: []
        }
    }

    componentDidMount() {
        axios
            .get(get_url('users'))
            .then(response => {
                const users = response.data['results']
                console.log(users) // ----------------------------------
                this.setState(
                    {
                        users: users
                    }
                )
            })
            .catch(error => console.log(error))

        axios
            .get(get_url('projects'))
            .then(response => {
                const projects = response.data['results']
                console.log(projects) // ----------------------------------

                this.setState(
                    {
                        projects: projects
                    }
                )
            })
            .catch(error => console.log(error))

        axios
            .get(get_url('todos'))
            .then(response => {
                const todos = response.data['results']
                console.log(todos) // ----------------------------------
                this.setState(
                    {
                        todos: todos
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Switch>
                        {/*<Route exact path={'/'} component={() => <HeaderNavi/>}/>*/}
                        <Route exact path={'/'}
                               component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path={'/todos/'} component={() => <TodosList todos={this.state.todos}/>}/>
                        <Route path={'/project/:id'} component={() => <ProjectTodoList todos={this.state.todos}/>}/>
                        <Route exact path={'/users/'} component={() => <UserList users={this.state.users}/>}/>
                        <Route component={pageNotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
