import './App.css';
import React from "react";
import axios from "axios";
// import {GraphQLClient, gql} from 'graphql-request'
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import TodosList from "./components/Todos";
import {BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import HeaderNavi from "./components/Naviheader";

import MainContent from "./components/Main";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/lib";
import ProjectDetails from "./components/ProjectDetails";
import ProjectForm from "./components/ProjectForm";


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
        localStorage.removeItem('nameNavi');
        localStorage.removeItem('flag');

    }

    getToken(username, password) {
        axios.post(get_url('api/token-auth/'),
            {username: username, password: password}
        ).then(response => {
            this.setToken(response.data['token']);
            localStorage.setItem('flag', this.flag);
        }).catch(error => {
                this.flag = 1;
                localStorage.setItem('flag', this.flag);
                window.location.reload();
            }
        )

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
                this.setState({users: response.data});  // ['results']
                console.log(this.state.users);
            })
            .catch(error => console.log(error))

        axios.get(get_url('api/projects/'), {headers})
            .then(response => {
                this.setState({projects: response.data});  // ['results']
                console.log(this.state.projects);
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get(get_url('api/todos/'), {headers})
            .then(response => {
                this.setState({todos: response.data});  //  ['results']
                console.log(this.state.todos);
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

    projectCreate(name, users, url_repo) {
        // console.log('create project', name, users, url_repo)
        const headers = this.getHeaders();
        axios
            .post(get_url('api/projects/'),
                {name: name, users: users, url_repo: url_repo},
                {headers})
            .then(result => {
                const newProject = result.data;
                console.log('result.data', newProject)
                this.setState({
                    projects: [...this.state.projects, newProject]
                })
            })
            .catch(error => console.log(error))
    }

    projectDelete(id) {
        console.log('delete project', id, this);
        alert('Удалить проект?')
        // const headers = this.getHeaders();
        // axios
        //     .delete('http://127.0.0.1:8000/api/projects/' + id + '/',
        //         {headers})
        //     .then(result => {
        //         this.setState({
        //             projects: this.state.projects.filter((item) => item.id !== id)
        //         })
        //     })
        //     .catch(error => console.log(error))
        window.location.assign('/projects/');
    }


    render() {
        this.state.flag = localStorage.getItem('flag')
        let username = localStorage.getItem('nameNavi');
        for (let user of this.state.users) {
            if (user['username'] === username) {
                var userLastName = user['last_name'];
                var userFirstName = user['first_name'];
            }
        }
        this.state.nameNavi = userFirstName + ' ' + userLastName;

        for (let project of this.state.projects) {
            for (let todo of this.state.todos)
                if (todo.short_note === project['id']) {
                    todo.short_note = project['name'];
                }
        }
        // console.log('this.state.todos', this.state.todos);

        return (
            <div className={'App'}>
                <BrowserRouter>

                    <HeaderNavi
                        logout={() => this.logout()}
                        username={this.state.nameNavi}
                        token={this.state.token}/>
                    <Switch>
                        <Route exact path={'/'} component={() => <MainContent/>}/>
                        <Route exact path={'/projects/'}
                               component={() => <ProjectList projects={this.state.projects}
                                                             users={this.state.users}
                                                             todos={this.state.todos}/>}/>

                        <Route exact path={'/projects/create'}>
                            <ProjectForm
                                projectCreate={(name, url_repo, users) => this.projectCreate(name, url_repo, users)}
                                users={this.state.users}/>
                        </Route>

                        <Route exact path={'/todos/'} component={() => <TodosList todos={this.state.todos}
                                                                                  projects={this.state.projects}/>}/>
                        <Route exact path={'/login/'}>
                            <LoginForm getToken={(username, password) => this.getToken(username, password)}
                                       flag={this.state.flag}/>
                        </Route>

                        <Route path={'/project/:id'} component={() => <ProjectDetails todos={this.state.todos}
                                                                                      projects={this.state.projects}
                                                                                      users={this.state.users}
                                                                                      projectDelete={(id) => this.projectDelete(id)}
                        />}/>

                        <Route exact path={'/users/'} component={() => <UserList users={this.state.users}/>}/>
                        <Route component={pageNotFound404}/>
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default App;


// getProjectDetails() {
//     const headers = this.getHeaders();
//     const client = new GraphQLClient(get_url('graphql/', {headers}));
//     const query = gql`
//         {
//             projectById(pk: 2) {
//                 id
//                 name
//                 urlRepo
//                 users {
//                     firstName
//                     lastName
//                 }
//                 todoProject {
//                     description
//                     createdBy {
//                         firstName
//                         lastName
//                     }
//                     createdAt
//                     updateAt
//                 }
//             }
//         }`
//
//     client.request(query)
//         .then((data) => {
//             console.log(data)
//         })
// }