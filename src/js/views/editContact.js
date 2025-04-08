import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate,useParams} from "react-router-dom";

const EditContact = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const {id} = useParams();
  
    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts) {
            if (store.contacts.length > 0){
                const result = store.contacts.find(item => item.id== id)
                if(result){
                    setNewContact(result)
                }
            }
    
        }
    }, [id,store.contacts]);

    const handleSubmit = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/franco/contacts/${newContact.id}`, {
            method: "PUT",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el contacto");
                }
                return response.json();
            })
            .then(data => {
                if(data){
                    const newArray = store.contacts.map(item=> {
                        if(item.id== data.id){
                            item=data
                        }
                        return item
                    }) 
                    actions.setContacts(newArray)
                    navigate("/")
                }
                
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="container mt-4">
            <h1>Editar Contacto</h1>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    value={newContact.name}
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Full Name"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    value={newContact.email}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    value={newContact.phone}
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                    value={newContact.address}
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Guardar</button>
        </div>
    );
};

export default EditContact;

