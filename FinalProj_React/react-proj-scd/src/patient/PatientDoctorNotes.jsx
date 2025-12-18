

import { useEffect, useState } from "react";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode";

export default function DoctorNotes() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const patientId = decoded.id;

  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    API.get(`/treatments/patient/${patientId}`)
      .then(res => setTreatments(res.data || []))
      .catch(err => console.log(err));
  }, [patientId]);

  return (
    <div>
      <h2>Doctor Notes</h2>

      {treatments.length === 0 && <p>No notes yet</p>}

      {treatments.map(t => (
        t.notes && (
          <div key={t._id}>
            <h4>{t.treatmentType}</h4>
            <p>{t.notes}</p>
          </div>
        )
      ))}
    </div>
  );
}
