import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom"

const Register = () => {

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

    const { store, actions } = useContext(Context); ``

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleNewUserName = (e) => {
        //console.log(e.target.value)
        let userInputName = e.target.value
        setUserName(userInputName)
    }

    const handleNewUserEmail = (e) => {
        //console.log(e.target.value)
        let userInputEmail = e.target.value
        setUserEmail(userInputEmail)
    }

    const handleNewUserPassword = (e) => {
        //console.log(e.target.value)
        let userInputPassowrd = e.target.value
        setUserPassword(userInputPassowrd)
    }

    const handleRegisterSubmit = async (e) => {
        //console.log("submited1")
        await actions.register(userEmail, userName, userPassword)

        //console.log(store)
        //     console.log(e.target.value)
        //     let userInputName = e.target.value
        //     setUserName(userInputName)
    }
    return (
        <div>

            <div>
                <Navbar />
            </div>




            <label htmlFor="name">Name</label>
            <input id="name" onChange={(e) => handleNewUserName(e)} type="text" name="name" />
            <br />
            <label htmlFor="email">Email</label>
            <input id="email" onChange={(e) => handleNewUserEmail(e)} type="text" name="email" />
            <br />
            <label htmlFor="password">Password</label>
            <input id="password" onChange={(e) => handleNewUserPassword(e)} type="password" name="password" />
            <br />
            <button onClick={(e) => handleRegisterSubmit(e)} type="submit">Register</button>

        </div>
    )
}

export default Register