import { DeleteIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { BiEdit, BiSolidSave } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import { GoPlus } from 'react-icons/go';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '', medication: '', dosage: '', instructions: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalPrescriptions, setModalPrescriptions] = useState([]);
  const [modalPatientName, setModalPatientName] = useState('');

  // Load data on mount
  useEffect(() => {
    const storedPrescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    setPrescriptions(storedPrescriptions);
    setAppointments(storedAppointments);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("prescriptions", JSON.stringify(data));
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
    setShowModal(false);
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

  const handleViewPrescriptions = (patientName) => {
    const allPrescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const filtered = allPrescriptions.filter(p => p.patientName === patientName);
    setModalPrescriptions(filtered);
    setModalPatientName(patientName);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 mx-10 gap-6">
      <Toaster />

      <div className="col-span-2 px-10">
        <h1 className="text-xl font-bold mb-6 text-center uppercase">Prescription</h1>

        <section className="mb-8">
          <table className="w-full border table-auto shadow-lg bg-gray-100">
            <thead>
              <tr className="bg-slate-400">
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {appointments.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-4">No prescriptions.</td></tr>
              ) : (
                appointments.map((app, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="p-2 border">{app.patientName}</td>
                    <td className="p-2 border">{app.doctor}</td>
                    <td className="p-2 border">{app.appointmentDate}</td>
                    <td className="p-2 border">{app.reason}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleViewPrescriptions(app.patientName)}
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Modal for showing prescription details */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h2 className="font-semibold mb-4 text-lg text-center">
                Detailed Prescription for {modalPatientName}
              </h2>

              <div className="bg-gray-100 p-4 rounded shadow-inner">
                {modalPrescriptions.length === 0 ? (
                  <p className="text-center text-gray-600">No prescriptions available for this patient.</p>
                ) : (
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {modalPrescriptions.map(p => (
                      <li key={p.id}>
                        <strong>Medication:</strong> {p.medication}, <strong>Dosage:</strong> {p.dosage}, <strong>Instructions:</strong> {p.instructions}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescription;
