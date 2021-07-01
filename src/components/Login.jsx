import React from "react";
import useForm from './useForm'

const Login = (props) => {

    const { values, handleChange, handleSubmit } = useForm(login);
    const getToken = props.getToken;

    function login(){
        getToken(values);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='username' onChange={handleChange} value={values.front} /><br />
                <input type='password' name='password' placeholder='Password' onChange={handleChange} value={values.back} /><br />
                <button type='submit' className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;