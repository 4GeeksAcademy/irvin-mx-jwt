import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<div>
						{location.pathname === '/'? <div>
							<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
						<Link to="/register">
							<button className="btn btn-primary">Register</button>
						</Link>
						</div> : null}
						{location.pathname === '/register'? <Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link> :null}
						{location.pathname === '/login'? <Link to="/register">
							<button className="btn btn-primary">Register</button>
						</Link> : null}
						{location.pathname === '/private'? <Link to="/">
							<button onClick={()=>localStorage.clear()} className="btn btn-primary">Logout</button>
						</Link> : null}
					</div>
				</div>
			</div>
		</nav>
	);
};
