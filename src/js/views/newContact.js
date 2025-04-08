import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const NewContact = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	//newContact almacena un solo string (el texto del input).
	const [newContact, setnewContact] = useState({
		email: "",
		phone: "",
		name: "",
		address: "",
	});

	const handleSubmit = () => {
		fetch("https://playground.4geeks.com/contact/agendas/franco/contacts",{
			method: "POST",
			body: JSON.stringify(newContact),
			headers: { "content-type": "application/json" }
		})
			
			.then(response => {
				if(response.status!==201){
					throw new Error("error al crear el contacto")
				}
				return response.json()
			})
			.then(data=> {
					if(data){
						actions.setContacts([...store.contacts, data])
						navigate("/")
					}
						 
					
			})

		}	



	return (
		<div className="container">

			<div>
				<h1>Add New Contact</h1>
				<div>
					<div className="mb-3">
						<label htmlFor="fullName" className="form-label">Full Name</label>
						<input onChange={(e) => setnewContact({ ...newContact, name: e.target.value })} type="text" className="form-control" id="fullName" placeholder="Full Name" />
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input onChange={(e) => setnewContact({ ...newContact, email: e.target.value })} type="email" className="form-control" id="email" placeholder="Enter Email" />
					</div>
					<div className="mb-3">
						<label htmlFor="phone" className="form-label">Phone</label>
						<input onChange={(e) => setnewContact({ ...newContact, phone: e.target.value })} type="tel" className="form-control" id="phone" placeholder="Enter Phone" />
					</div>
					<div className="mb-3">
						<label htmlFor="address" className="form-label">Address</label>
						<input onChange={(e) => setnewContact({ ...newContact, address: e.target.value })} type="text" className="form-control" id="address" placeholder="Enter Address" />
					</div>

					<button onClick={() => handleSubmit()} type="button" className="btn btn-primary w-100">Save</button>
				</div>
			</div>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
