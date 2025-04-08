import React, { useContext, useEffect } from "react";
import "../../styles/home.css";

import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	console.log(store)
	

	function deleteContact(id) {
		fetch("https://playground.4geeks.com/contact/agendas/franco/contacts/" + id, {
			method: "DELETE"
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("error eliminando el contacto")
				}
				return response
			})
			.then((data) => {
				if (data) {
					actions.setContacts(store.contacts.filter(item => item.id != id))
				}
			})
			.catch((error) => { console.log(error) })

	}
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<div className="d-flex flex-column align-items-center">
				{store.contacts.map((contacto) => (
					<div key={contacto.id} className="card mb-3" style={{ maxWidth: "540px" }}>
						<div className="row g-0">
							<div className="col-md-3">
								<img
									src="https://picsum.photos/id/237/200/300"
									className="img-fluid rounded-circle"
									alt="..."
								/>
							</div>
							<div className="col-md-7">
								<div className="card-body">
									<h5 className="card-title">{contacto.name}</h5>
									<p className="card-text">
										<i className="fa-solid fa-location-dot"></i> {contacto.email}
									</p>
									<p className="card-text">
										<i className="fa-solid fa-phone"></i> {contacto.phone}
									</p>
									<p className="card-text">
										<i className="fa-solid fa-envelope"></i> {contacto.address}
									</p>
								</div>
							</div>
							<div className="col-md-2 d-flex flex-column justify-content-start align-items-start p-2 gap-2">
								<button
									className="btn btn-primary btn-sm"
									onClick={() => navigate("/editcontact/" + contacto.id)}
								>
									<i className="fa-solid fa-pen-to-square"></i>
								</button>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => deleteContact(contacto.id)}
								>
									<i className="fa-solid fa-trash"></i>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)};
