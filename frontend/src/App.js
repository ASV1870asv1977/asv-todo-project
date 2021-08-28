import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/usersapp/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <UserList users={this.state.users}/>
        )
    }
}

export default App;
