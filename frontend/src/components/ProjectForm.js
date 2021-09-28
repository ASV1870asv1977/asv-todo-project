import React from "react";
import {Link} from "react-router-dom";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            users: [],
            url_repo: ""

        }
    }

    handlerOnChange(event) {
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        console.log('submit', this.state);
        this.state.users = [parseInt(this.state.users)]
        console.log('submit==[]=>', this.state);
        event.preventDefault();
        this.props.projectCreate(this.state.name, this.state.users, this.state.url_repo);
        window.location.assign('/projects/');
    }

    render() {
        // console.log('FLAG___', this.props.flag)
        return (
            <div className="auth_main" id={"auth_main"}>
                <div className="auth_main_content">
                    <div className="auth_main_content_header">
                        <h2 style={{color: "#253c58"}}>To Do</h2>
                        <p>Добавление проекта</p>
                        {/*{this.props.flag ?*/}
                        {/*    <p style={{color: '#C44303'}}>Неверный логин или пароль!</p>:*/}
                        {/*    }*/}
                    </div>

                    <form onSubmit={(event) => this.handlerOnSubmit(event)} >
                        {console.log('users in ProjectForm-->', this.props.users)}
                        <input type="text" name="name"
                               value={this.state.name}
                               onChange={(event) => this.handlerOnChange(event)}/>
                        <select name="users"
                                onChange={(event) => this.handlerOnChange(event)}>
                            {this.props.users.map((user) => (
                                <option value={user.id} key={user.id}>
                                    {/*Почему-то при добавление второго значения - first_name, не работает submit*/}
                                    {user.last_name}
                                </option>
                            ))}
                        </select>

                        <input type="text" name="url_repo"
                               value={this.state.url_repo}
                               onChange={(event) => this.handlerOnChange(event)}/>

                        <input type="submit" value="Добавить"/>
                    </form>


                </div>
            </div>
        )
    }
}


export default ProjectForm;