import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Navbar } from "./component/navbar"

const HomeWithNavBar = () => {

    const navigate = useNavigate()

    useEffect(() => {

        //console.log(localStorage)
        let token = localStorage.getItem("myToken");
        //console.log("User has a token", token)
        if (token) {
            // Si el token existe, redirigir al usuario a home donde ya puede ver su perfil de home privado
            navigate("/private")
        }
    })

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default HomeWithNavBar