import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-image">
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <h2 className="index-title">Django REST API</h2>
        <div className="button-container">
          <Link to="/list" className="button">List of persons</Link>
          <Link to="/create" className="button">Create a person</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
