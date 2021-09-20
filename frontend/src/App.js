import './App.css';
import React from "react";

import axios from "axios";
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import HeaderNavi from "./components/Naviheader";
import ProjectDetails from "./components/ProjectDetails";
import MainContent from "./components/Main";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/lib";


const API_ROOT = 'http://127.0.0.1:8000/';

const get_url = (name_page) => `${API_ROOT}${name_page}`;

const pageNotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница '{location.pathname}' не существует</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            project: {},
            todos: [],
        }
    }

    logout = (e) => {
        this.setToken('');
        localStorage.removeItem('usersStorage');
        localStorage.removeItem('projectsStorage');
        localStorage.removeItem('todosStorage');
    }

    getToken(username, password) {
        axios.post(get_url('api-token-auth/'),
            {username: username, password: password}
        ).then(response => {
            this.setToken(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
        this.nameNavi = username;
        localStorage.setItem('nameNavi', this.nameNavi);
        document.getElementById("auth_main").style.display = 'none';
    }

    getTokenFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log("token", token);
        this.setState({'token': token}, () => this.loadData())
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    loadData() {
        if (!this.isAuthenticated()) {
            return;
        }
        const headers = this.getHeaders()
        axios.get(get_url('api/users/'), {headers})
            .then(response => {
                this.setState({users: response.data['results']});
                console.log(this.state.users);
                let usersStorage = JSON.stringify(this.state.users);
                localStorage.setItem('usersStorage', usersStorage);
            })
            .catch(error => console.log(error))

        axios.get(get_url('api/projects/'), {headers})
            .then(response => {
                this.setState({projects: response.data['results']});
                console.log(this.state.projects);
                let projectsStorage = JSON.stringify(this.state.projects);
                localStorage.setItem('projectsStorage', projectsStorage);
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get(get_url('api/todos/'), {headers})
            .then(response => {
                this.setState({todos: response.data['results']});
                console.log(this.state.todos);
                let todosStorage = JSON.stringify(this.state.todos);
                localStorage.setItem('todosStorage', todosStorage);
            })
            .catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`;
        }
        return headers
    }

    isAuthenticated() {
        return this.state.token !== '';
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>

                    <HeaderNavi
                        logout={this.logout}
                        username={localStorage.getItem('nameNavi')}
                        token={this.state.token}/>
                    <Switch>
                        <Route exact path={'/'} component={() => <MainContent/>}/>
                        <Route exact path={'/projects/'}
                               component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path={'/todos/'} component={() => <TodosList todos={this.state.todos}/>}/>


                        <Route exact path={'/login'}>
                            <LoginForm getToken={(username, password) => this.getToken(username, password)}/>
                        </Route>

                        {/*<Route path={'/project/:id'} component={() => <ProjectDetails todos={this.state.todos}/>}/>*/}

                        // Не успел доработать
                        {/*<Route path="/project/:id">*/}
                        {/*    <ProjectDetails getProject={(id) => this.getProject(id)}*/}
                        {/*                    item={this.state.projects}*/}
                        {/*                    todos={this.state.todos}/>*/}
                        {/*</Route>*/}

                        <Route exact path={'/users/'} component={() => <UserList users={this.state.users}/>}/>
                        <Route component={pageNotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
