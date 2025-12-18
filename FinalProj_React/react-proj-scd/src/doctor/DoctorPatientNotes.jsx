import API from "../api/axios";

export default function DoctorPatientNotes({ patientId }) {
  const submit = async (e) => {
    e.preventDefault();

    await API.post(`/patients/${patientId}/doctor-note`, {
      note: e.target.note.value
    });

    alert("Note Added");
  };

  return (
    <form onSubmit={submit}>
      <textarea name="note" />
      <button>Add Note</button>
    </form>
  );
}
