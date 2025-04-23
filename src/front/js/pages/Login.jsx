import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';

import { Navbar } from '../component/navbar';

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {

        //console.log(localStorage)
        let token = localStorage.getItem("myToken");
        //console.log("User has a token",token)
        if (token) {
            // Si el token existe, redirigir al usuario a home donde ya puede ver su perfil de home 
            navigate("/private")
        }
    })

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    //Context
    const { store, actions } = useContext(Context)


    const handleLoginUserEmail = (e) => {
        //console.log(e.target.value)
        setUserEmail(e.target.value)
    }

    const handleLoginPassword = (e) => {
        //console.log(e.target.value)
        setUserPassword(e.target.value)
    }

    const handleLoginButton = async (e) => {
        // console.log("login1")

        await actions.login(userEmail, userPassword)
        // console.log("login2")
        //console.log("Login, store:",store)
        localStorage.setItem("myToken", store.token);
        if (store.token) {
            //console.log(store.token)
            navigate("/private")
        }

    }


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <label htmlFor="email">Email</label>
            <input id='email' onChange={(e) => handleLoginUserEmail(e)} type="text" name='email' />
            <br />
            <label htmlFor="password">Password</label>
            <input id='password' onChange={(e) => handleLoginPassword(e)} type="password" name='password' />
            <br />
            <button onClick={(e) => handleLoginButton(e)} type="submit">Login</button>
        </div>
    )
}

export default Login