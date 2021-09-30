import React from "react";
import {Link} from "react-router-dom";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            short_note: "",
            description: "",
            created_by: ""
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        this.state.short_note = parseInt(this.state.short_note)
        event.preventDefault();
        this.props.todoCreate(this.state.short_note, this.state.description, this.state.created_by);
        window.location.assign('/todos/');
    }

    render() {
        return (
            <div className="auth_main" id={"auth_main"}>
                <div className="auth_main_content">
                    <div className="auth_main_content_header">
                        <h2 style={{color: "#253c58"}}>To Do</h2>
                        <p>Добавление заметки</p>
                    </div>
                    <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                        <select name="short_note"
                                onChange={(event) => this.handlerOnChange(event)}>
                            {this.props.projects.map((project) => (
                                <option value={project.id} key={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        <select name="created_by"
                                onChange={(event) => this.handlerOnChange(event)}>
                            {this.props.users.map((user) => (
                                <option value={user.last_name} key={user.last_name}>
                                    {user.last_name}
                                </option>
                            ))}
                        </select>
                        <input type="text" name="description"
                                  value={this.state.description}
                                  onChange={(event) => this.handlerOnChange(event)}/>
                        <input type="submit" value="Добавить"/>
                    </form>


                </div>
            </div>
        )
    }
}


export default ProjectForm;