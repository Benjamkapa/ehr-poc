import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '', medication: '', dosage: '', instructions: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("prescriptions") || "[]");
    setPrescriptions(stored);
  }, []);

  const saveToStorage = (data) => {
    sessionStorage.setItem("prescriptions", JSON.stringify(data));
  };

  const addPrescription = (e) => {
    e.preventDefault();
    const { patientName, medication, dosage, instructions } = newPrescription;
    if (!patientName || !medication) {
      return toast.error('Patient name and medication are required');
    }

    const newEntry = { ...newPrescription, id: Date.now() };
    const updated = [...prescriptions, newEntry];
    setPrescriptions(updated);
    saveToStorage(updated);
    setNewPrescription({ patientName: '', medication: '', dosage: '', instructions: '' });
    toast.success('Prescription added');
  };

  const deletePrescription = (id) => {
    const updated = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updated);
    saveToStorage(updated);
    toast.success('Prescription deleted');
    if (editIndex !== null && prescriptions[editIndex]?.id === id) {
      setEditIndex(null);
      setEditData({});
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...prescriptions[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updated = [...prescriptions];
    updated[editIndex] = editData;
    setPrescriptions(updated);
    saveToStorage(updated);
    setEditIndex(null);
    setEditData({});
    toast.success('Prescription updated');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({});
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Toaster />

      <div className="col-span-2 px-10">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">Prescription</h1>

        {/* Add Form */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4 text-lg">Create New Prescription</h2>
          <form onSubmit={addPrescription} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text" name="patientName" placeholder="Patient Name"
              value={newPrescription.patientName}
              onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
              className="border p-2 rounded hover:shadow"
              required
            />
            <input
              type="text" name="medication" placeholder="Medication"
              value={newPrescription.medication}
              onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
              className="border p-2 rounded hover:shadow"
              required
            />
            <input
              type="text" name="dosage" placeholder="Dosage"
              value={newPrescription.dosage}
              onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
              className="border p-2 rounded hover:shadow"
            />
            <input
              type="text" name="instructions" placeholder="Instructions"
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
              className="border p-2 rounded hover:shadow"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full col-span-full mx-auto w-1/2 hover:bg-blue-500">
              Add Prescription
            </button>
          </form>
        </section>

        {/* Prescription Table */}
        <section className="mb-8">
          <h2 className="font-semibold mb-4 text-lg">Prescriptions</h2>
          <table className="w-full border table-auto shadow-lg bg-gray-100">
            <thead>
              <tr className="bg-slate-400">
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Medication</th>
                <th className="p-2 border">Dosage</th>
                <th className="p-2 border">Instructions</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-4">No prescriptions.</td></tr>
              ) : (

                prescriptions.map((pres, index) => (
                  <tr key={pres.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {editIndex === index ? (
                      <>
                        <td className="p-2 border">
                          <input
                            name="patientName"
                            value={editData.patientName}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="medication"
                            value={editData.medication}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="dosage"
                            value={editData.dosage}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            name="instructions"
                            value={editData.instructions}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="p-2 border">
                          <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Save</button>
                          <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border">{pres.patientName}</td>
                        <td className="p-2 border">{pres.medication}</td>
                        <td className="p-2 border">{pres.dosage}</td>
                        <td className="p-2 border">{pres.instructions}</td>
                        <td className="p-2 border">
                          <button onClick={() => startEdit(index)} className="bg-blue-600 text-white px-2 py-1 rounded mr-2">Edit</button>
                          <button onClick={() => deletePrescription(pres.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Prescription;
