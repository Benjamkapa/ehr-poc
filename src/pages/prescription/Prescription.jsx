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
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  const handleViewPrescriptions = (appointment) => {
    const allPrescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const filtered = allPrescriptions.filter(p => p.patientName === appointment.patientName);
    setModalPrescriptions(filtered);
    setModalPatientName(appointment.patientName);
    setSelectedAppointment(appointment);
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
                        onClick={() => handleViewPrescriptions(app)}
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
        {showModal && selectedAppointment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative overflow-y-auto max-h-screen">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                >
                  &times;
                </button>
                <h2 className="font-semibold mb-4 text-xl text-center">
                  {modalPatientName} Detail
                </h2>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow mb-4 text-sm text-gray-800">
                  <div><strong>Doctor:</strong> {selectedAppointment.doctor}</div>
                  <div><strong>Date:</strong> {selectedAppointment.appointmentDate}</div>
                  <div><strong>Reason:</strong> {selectedAppointment.reason}</div>
                  <div><strong>Visit Type:</strong> {selectedAppointment.visitType || 'N/A'}</div>
                  <div><strong>Department:</strong> {selectedAppointment.department || 'N/A'}</div>
                  <div><strong>Allergies:</strong> {selectedAppointment.allergies || 'None reported'}</div>
                  <div className="md:col-span-2">
                    <strong>Doctor's Notes:</strong> <p>{selectedAppointment.notes || 'No notes added'}</p>
                  </div>
                </div>

                {/* Vitals */}
                {selectedAppointment.vitals && (
                  <div className="bg-blue-50 p-4 rounded shadow mb-4 text-sm text-blue-900">
                    <h3 className="font-semibold mb-2">Vitals</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><strong>Temperature:</strong> {selectedAppointment.vitals.temperature} °C</div>
                      <div><strong>Pulse:</strong> {selectedAppointment.vitals.pulse} bpm</div>
                      <div><strong>Blood Pressure:</strong> {selectedAppointment.vitals.bp}</div>
                      <div><strong>Weight:</strong> {selectedAppointment.vitals.weight} kg</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Prescription;
