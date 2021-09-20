import React from "react";
import {Link} from "react-router-dom";

import facebook from "../img/facebook.png";
import twitter from "../img/twitter.png";
import instagram from "../img/instagram.png";
import google from "../img/google.png";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
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
        this.props.getToken(this.state.username, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
                <div className="auth_main" id={"auth_main"}>
                    <div className="auth_main_content">
                        <div className="auth_main_content_header">
                            <h2 style={{color: "#253c58"}}>To Do</h2>
                            <p>Авторизация пользователя</p>
                        </div>
                        <form className="auth_main_content_body" action=""
                              onSubmit={(event) => this.handlerOnSubmit(event)}>
                            <input className="auth_main_content_body_input"
                                   type="text"
                                   name="username"
                                   placeholder=" Логин"
                                   onChange={(event) => this.handlerOnChange(event)}/>
                            <input className="auth_main_content_body_input"
                                   type="password"
                                   name="password"
                                   placeholder=" Пароль"
                                   onChange={(event) => this.handlerOnChange(event)}/>

                            <input className="auth_main_content_body_submit"
                                   type="submit"
                                   value="Авторизироваться"/>
                        </form>
                        <div className="auth_main_content_footer">
                            <img src={facebook} alt=""/>
                            <img src={twitter} alt=""/>
                            <img src={instagram} alt=""/>
                            <img src={google} alt=""/>
                        </div>
                    </div>
                </div>
        )
    }
}


export default LoginForm;