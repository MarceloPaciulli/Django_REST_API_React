import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';
import '../Custom.css';


function useSuccessMessage() {
  const [successMessage, setSuccessMessage] = useState(null);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return [successMessage, showSuccessMessage];
}

function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return [errorMessage, showErrorMessage];
}

const PeopleList = () => {
  const [personas, setPersonas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedPersonaDelete, setSelectedPersonaDelete] = useState(null);
  const [successMessage, showSuccessMessage] = useSuccessMessage();
  const [errorMessage, showErrorMessage] = useErrorMessage("");

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await axios.get("http://localhost:8000/api/personas/");
      setPersonas(response.data);
    };
    fetchPersonas();
  }, []);


    const handleUpdate = async (updatedPerson) => {
      if (!updatedPerson.nombre || !updatedPerson.apellido ||
        !updatedPerson.email || !updatedPerson.telefono ) {
        showErrorMessage("Please fill in the fieldError");
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8000/api/personas/update/${updatedPerson.id}`, updatedPerson);
        showSuccessMessage("Record successfully updated");
        setPersonas((prevPersons) => {
          const updatedPersons = prevPersons.map((person) => {
            if (person.id === updatedPerson.id) {
              return response.data;
            }
            return person;
          });
          return updatedPersons;
        });
        setSelectedPersona(null);
      } catch (error) {
        console.log(error);
      }
    };

    const handleDelete = async (persona) => {
        try {
          await axios.delete(`http://localhost:8000/api/personas/delete/${persona.id}`);
          showSuccessMessage("Record successfully deleted");
          setPersonas(personas.filter((p) => p.id !== persona.id));
        } catch (error) {
          console.error(error);
        }
      }
    
    

  const customStyles = {
    cells: {
      style: {
        fontSize: '16px', // ajusta aquí el tamaño de la fuente
      },
    },
    headCells: {
      style: {
        fontSize: '18px', // ajusta aquí el tamaño de la fuente
      },
    },
    rows: {
      style: {
        transition: 'background-color 0.01s ease-in-out',
        '&:hover': {
          backgroundColor: '#f2f2f2',
        },
      },
    },
  };

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
  };

  const handleSelectPersonaDelete = (persona) => {
    setSelectedPersonaDelete(persona);
  };


  const columns = [
    {
      name: "Name",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.apellido,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div style={{ marginLeft: "-20px" }}>{row.email}</div>
    },
    {
      name: "Phone",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      cell: (row) => <div style={{ marginLeft: "-20px" }}>{row.id}</div>
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#editarPersonaModal"
            onClick={() => handleSelectPersona(row)}
          >
            Update
          </button>
          <button
            className="btn btn-danger ms-2"
            data-bs-toggle="modal"
            data-bs-target="#deletePersonaModal"
            onClick={() => handleSelectPersonaDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
    },
    
  ];

  const filteredPersonas = personas.filter((persona) => {
    return (
      persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  

  return (
    <div className="people-list">
      <h2 className="dtlist-title">Persons List</h2>
      <Link to="/" className="button-return-list">Return to Index</Link>
      {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}
{errorMessage && <div className="error-message">{errorMessage}</div>}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        className="search-input"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      
      <DataTable
        columns={columns}
        data={filteredPersonas}
        pagination={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        className="dataTable"
        customStyles={customStyles}
        search={false}
      />
      {selectedPersona && (
<UpdateModal
       person={selectedPersona}
       onSubmit={handleUpdate}
       onClose={setSelectedPersona}
     />
)}

{selectedPersonaDelete && (
  <DeleteModal
  person={selectedPersonaDelete}
  onCancel={setSelectedPersonaDelete}
  onSubmit={handleDelete}
/>
)}

    </div>
  );
};

export default PeopleList;
