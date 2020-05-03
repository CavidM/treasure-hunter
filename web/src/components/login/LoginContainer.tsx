import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Login} from '../../store/actions/AuthAction';
import {CreateGame} from '../../store/actions/GameAction';
import LoginComponent from './LoginComponent';
import {useHistory} from 'react-router-dom';

function LoginContainer(props:any){

    let history = useHistory();
    
    const [username, setUsername] = useState('');

    const submitForm = () => {
        const login = props.Login({username});

        login.then((res: any) => {
            
            props.CreateGame();

            history.push('/game')
        })
    }

    const handleUsernameChange = (val:any) => {
        setUsername(val.target.value)
    }

    return(
        <LoginComponent 
            handleUsernameChange={handleUsernameChange}
            submitForm={submitForm}
        />
    );
}

const mapD = {
    Login,
    CreateGame
}

export default connect(null, mapD)(LoginContainer);