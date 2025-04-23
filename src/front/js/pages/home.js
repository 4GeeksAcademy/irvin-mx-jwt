import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../component/navbar";

export const Home = () => {

	const navigate = useNavigate()

	const { store, actions } = useContext(Context);

	useEffect(() => {
		//console.log(store)
		//console.log(localStorage.getItem("myToken"))
		//console.log(store.token)
		if (!store.token) {
			if (!localStorage.getItem("myToken")) {
				navigate("/login")
			}

		}
	})

	return (
		<div >

			<div>
				<Navbar />
			</div>


			<div>
				<div>private home</div>
				<button onClick={() => actions.getUsers()}>Show users</button>
				{store.usersArray ? store.usersArray.map((item, index, array) => {
					return <div key={item.id}>{item.email}</div>
				}) : null}
			</div>









			{/* <h1>Hello Rigo!!</h1>
			<p> */}
			{/* <img src={rigoImageUrl} /> */}
			{/* <button onClick={()=>actions.test()}>Test</button>
				<h3>{store.infoEntrante}</h3> */}
			{/* </p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
		</div>
	);
};
