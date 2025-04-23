const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			test: async () => {
				try{
					// fetching data from the backend
					console.log(process.env.BACKEND_URL )
					const resp = await fetch(process.env.BACKEND_URL + "/api/test")
					console.log(resp)
					if(!resp.ok){
						throw new Error("Somehting whent wrong here")
					}
					const data = await resp.json()
					setStore({...getStore(),infoEntrante:data.mensaje})
					// don't forget to return something, that is how the async resolves
					// return data;
				}catch(error){
					console.log("Error", error)
				}
			},
			register: async (email,name,password) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
						method:"POST",
						headers: {
							"Content-Type": "application/json",
						  },
						  body: JSON.stringify({ email: email, name: name , password:password})
					})
					if(!resp.ok){
						throw new Error("Somehting whent wrong here")
					}
					const data = await resp.json()
					//console.log(data)
					return data
					
				}catch(error){
					console.log("Error", error)
				}
			},
			login: async (userEmail,userPassword) => {
				try{

					const resp =  await fetch(process.env.BACKEND_URL + "/api/token", {
						method:"POST",
						headers: {
							"Content-Type":"application/json"
						},
						body: JSON.stringify({email:userEmail,password:userPassword})

					})

					if(!resp.ok){
						throw new Error("Error trying to login")
					}

					const data = await resp.json()
					//console.log(data)
					setStore({...setStore,token:data.access_token})
					return data


				}catch(e){
					console.log("Errorrrr",e)
				}
			},
			getUsers: async () => {
				try{
				
					
					//console.log(localStorage.getItem("myToken"))
					let userTokenFromLocalStorage = localStorage.getItem("myToken")
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: "GET",
						headers:{
							"Authorization": `Bearer ${userTokenFromLocalStorage}`
						}
					})
					
					if(!resp.ok){
						throw new Error("Somehting whent wrong here")
					}
					const data = await resp.json()
					//console.log(data)
					setStore({...setStore,usersArray:data})
					return data
				}catch(error){
					console.log("Error", error)
				}
			}
		}
	};
};

export default getState;
