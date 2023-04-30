import React from "react";
import { Routes, Route } from "react-router-dom";
import PersonaForm from "../components/forms/PersonaForm";
import SuccessPage from "../pages/SuccessPage";
import App from "../App";
import DataTablePeople from "../pages/DataTablePeople";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/create" element={<PersonaForm />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/list" element={<DataTablePeople />} />
    </Routes>
  );
}

export default AppRoutes;
