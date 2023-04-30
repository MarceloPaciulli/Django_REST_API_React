import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="bg-image">
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="alert alert-success text-center my-4 p-4 rounded" role="alert">
          <div className="title-container">
            <h1 className="text-success">Person created successfully!</h1>
          </div>
          <h2 className="index-title">Django REST API</h2>
          <div className="button-container">
            <Link to="/create" className="button">Create another person</Link>
            <Link to="/" className="button">Return to Index</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
