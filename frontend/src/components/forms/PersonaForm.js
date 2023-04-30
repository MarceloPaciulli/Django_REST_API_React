import { useState } from "react";
import axios from "axios";
import '../../App.css';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function PersonaForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { nombre, apellido, email, telefono };
    try {
      const res = await axios.post("http://localhost:8000/api/personas/", data);
      console.log(res);
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
      setFormSubmitted(false);
    }
  };
  

  if (formSubmitted) {
    return <Navigate to="/success" />;
  }

  return (
    <div>
      <div className="button-container">
      <Link to="/" className="button">Return to Index</Link>
      </div>
       <h3 className="form-title">Create a Person</h3>
    <div className="container anchor-container">
      <form onSubmit={handleSubmit} className="needs-validation form-container">
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="nombre" className="form-label text-end">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <div className="invalid-feedback">Este campo es requerido.</div>
          </div>
          <div className="col-md-12">
            <label htmlFor="apellido" className="form-label text-end">
              Lastname
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <div className="invalid-feedback">Este campo es requerido.</div>
          </div>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label text-end">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <div className="invalid-feedback">Ingrese un email válido.</div>
          </div>
          <div className="col-md-12">
            <label htmlFor="telefono" className="form-label text-end">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <div className="invalid-feedback">Ingrese un número de teléfono válido.</div>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Create person
          </button>
        </div>
      </form>
    </div>
</div>
  );
}

export default PersonaForm;
