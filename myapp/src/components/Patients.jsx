import { useEffect, useState } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    disease: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/patients");

      setPatients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/patients", formData);

      alert("Patient Added Successfully");

      setFormData({
        name: "",
        age: "",
        disease: "",
      });

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="patient-container">
      <h2>Patient Management</h2>

      <form className="patient-form" onSubmit={addPatient}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Patient Age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="disease"
          placeholder="Disease"
          value={formData.disease}
          onChange={handleChange}
        />

        <button type="submit">Add Patient</button>
      </form>

      <div className="patient-list">
        {patients.map((patient) => (
          <div className="patient-card" key={patient._id}>
            <h3>{patient.name}</h3>

            <p>Age: {patient.age}</p>

            <p>Disease: {patient.disease}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;
