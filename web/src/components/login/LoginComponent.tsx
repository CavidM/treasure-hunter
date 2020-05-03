import React, {useState} from 'react';

function LoginComponent(props:any){

    return(
        <div>
            <input type="text" onChange={props.handleUsernameChange}></input>
            <button onClick={props.submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent