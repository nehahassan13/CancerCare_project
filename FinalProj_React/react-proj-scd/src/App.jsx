import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";

import ProtectedRoute from "./utils/ProtectedRoute";
import DoctorLayout from "./layout/DoctorLayout";
import PatientLayout from "./layout/PatientLayout";


import DoctorDashboard from "./doctor/DoctorDashboard";
import DoctorProfile from "./doctor/DoctorProfile";
import DoctorPatients from "./doctor/DoctorPatients";
import DoctorAlerts from "./doctor/DoctorAlerts";
import DoctorTreatments from "./doctor/DoctorTreatments";
import DoctorPatientNotes from "./doctor/DoctorPatientNotes";


import PatientDashboard from "./patient/PatientDashboard";
import PatientProfile from "./patient/PatientProfile";
import AddSymptom from "./patient/AddSymptom";
import PatientSymptoms from "./patient/PatientSymptoms";
import PatientDoctorNotes from "./patient/PatientDoctorNotes";
import PatientTreatments from "./patient/PatientTreatments";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/register" />} />

       
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> 

      
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="patient/:id/notes" element={<DoctorPatientNotes />} />
          <Route path="alerts" element={<DoctorAlerts />} />
          <Route path="treatments" element={<DoctorTreatments />} />
        </Route>

      
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="Patient">
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="add-symptom" element={<AddSymptom />} />
          <Route path="symptoms" element={<PatientSymptoms />} />
          <Route path="doctor-notes" element={<PatientDoctorNotes />} />
          <Route path="treatments" element={<PatientTreatments />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}





