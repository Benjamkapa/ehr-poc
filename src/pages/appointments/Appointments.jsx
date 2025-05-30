import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { GoPlus } from 'react-icons/go';
import { SaveIcon } from 'lucide-react';
import { TiCancel } from 'react-icons/ti';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentIndex, setEditAppointmentIndex] = useState(null);
  const [editAppointmentFormData, setEditAppointmentFormData] = useState({
    patientName: '',
    doctor: '',
    appointmentDate: '',
    reason: '',
    status: 'approved',
  });
  const [showModal, setShowModal] = useState(false);

  // Load full appointments on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(storedData);
    if (storedData.length === 0) {
      const dummyAppointments = [
        {
          patientName: "John Doe",
          doctor: "Dr. Smith",
          appointmentDate: "2025-06-01",
          reason: "Routine Checkup",
          status: "approved",
        },
        {
          patientName: "Jane Wanjiku",
          doctor: "Dr. Patel",
          appointmentDate: "2025-06-02",
          reason: "Fever and Cough",
          status: "pending",
        },
        {
          patientName: "Ali Mwangi",
          doctor: "Dr. Kimani",
          appointmentDate: "2025-06-03",
          reason: "Follow-up",
          status: "cancelled",
        },
      ];
      localStorage.setItem("appointments", JSON.stringify(dummyAppointments));
      setAppointments(dummyAppointments);
    } else {
      setAppointments(storedData);
    }
  }, []);

  // Whenever appointments change, update localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      patientName: form.patientName.value,
      doctor: form.doctor.value,
      appointmentDate: form.appointmentDate.value,
      reason: form.reason.value,
      status: form.status.value,
    };

    const updatedData = [...appointments, newEntry];
    setAppointments(updatedData);
    form.reset();
    toast.success('Appointment added successfully!');
    setShowModal(false);
  };

  const deleteAppointment = (index) => {
    const updatedData = appointments.filter((_, i) => i !== index);
    setAppointments(updatedData);
    if (editAppointmentIndex === index) {
      setEditAppointmentIndex(null);
    }
    toast.success('Appointment deleted!');
  };

  const editAppointment = (index) => {
    setEditAppointmentFormData({ ...appointments[index] });
    setEditAppointmentIndex(index);
  };

  const handleEditAppointmentChange = (e) => {
    const { name, value } = e.target;
    setEditAppointmentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedAppointment = () => {
    const updated = [...appointments];
    updated[editAppointmentIndex] = editAppointmentFormData;
    setAppointments(updated);
    setEditAppointmentIndex(null);
    toast.success('Appointment updated successfully!');
  };

  const cancelEditAppointment = () => {
    setEditAppointmentIndex(null);
  };
  

  return (
    <div className='grid grid-cols-1 gap-6 mx-10'>
      <div className='col-span-2'>
        <h1 className='font-bold uppercase text-xl text-center mb-4'>Appointments</h1>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h2 className='font-semibold text-lg mb-4'>Add Appointment</h2>
              <form onSubmit={handleAppointmentSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <input name='patientName' placeholder='Patient Name' className='rounded border p-2' required />
                <input name='doctor' placeholder='Doctor' className='border p-2 rounded' required />
                <input type='date' name='appointmentDate' className='border rounded p-2' required />
                <input name='reason' placeholder='Reason for Visit' className='rounded border p-2' />
                <select name='status' className='border rounded p-2' defaultValue='pending' required>
                  <option value='approved'>Approved</option>
                  <option value='cancelled'>Cancelled</option>
                  <option value='pending'>Pending</option>
                </select>
                <button
                  type='submit'
                  className='bg-blue-600 mx-auto text-white px-4 w-1/2 rounded-full py-2 hover:bg-blue-500 col-span-full'
                >
                  Save Appointment
                </button>
              </form>
            </div>
          </div>
        )}

        <section className='mx-5 px-5'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-lg mb-2'></h2>
            <GoPlus
              className='hover:bg-blue-500 hover:text-white text-2xl text-blue-500 mb-4 cursor-pointer hover:rounded'
              title='Add Appointment'
              onClick={() => setShowModal(true)}
            />
          </div>
          <table className='w-full border table-auto bg-gray-100 shadow-lg'>
            <thead>
              <tr className='bg-slate-400'>
                <th className='p-2 border'>Patient Name</th>
                <th className='p-2 border'>Doctor</th>
                <th className='p-2 border'>Date</th>
                <th className='p-2 border'>Reason</th> 
                <th className='p-2 border'>Status</th>
                <th className='p-2 border'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan='6' className='text-center p-4'>No appointments added.</td>
                </tr>
              ) : (
                appointments.map((appointment, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {editAppointmentIndex === index ? (
                      <>
                        <td className='p-2 border'>
                          <input
                            type='text'
                            name='patientName'
                            value={editAppointmentFormData.patientName}
                            onChange={handleEditAppointmentChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <input
                            type='text'
                            name='doctor'
                            value={editAppointmentFormData.doctor}
                            onChange={handleEditAppointmentChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <input
                            type='date'
                            name='appointmentDate'
                            value={editAppointmentFormData.appointmentDate}
                            onChange={handleEditAppointmentChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <input
                            type='text'
                            name='reason'
                            value={editAppointmentFormData.reason}
                            onChange={handleEditAppointmentChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <select
                            name='status'
                            value={editAppointmentFormData.status}
                            onChange={handleEditAppointmentChange}
                            className='border p-1 w-full'
                          >
                            <option value='approved'>approved</option>
                            <option value='cancelled'>Cancelled</option>
                            <option value='pending'>Pending</option>
                          </select>
                        </td>
                        <td className='p-2 border flex-row'>
                          <button onClick={saveEditedAppointment} title='save' className='bg-green-600 text-white p-1 rounded'><SaveIcon size={12} /></button>
                          <button onClick={cancelEditAppointment} title='cancel' className='bg-red-600 text-white p-1 rounded ml-2'><TiCancel /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className='p-2 border'>{appointment.patientName}</td>
                        <td className='p-2 border'>{appointment.doctor}</td>
                        <td className='p-2 border'>{appointment.appointmentDate}</td>
                        <td className='p-2 border'>{appointment.reason}</td>
                        <td className='p-2 border'>{appointment.status}</td>
                        <td className='p-2 border'>
                          <button onClick={() => editAppointment(index)} className='bg-blue-600 text-white px-4 rounded'>
                            Act
                          </button>
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
      <Toaster />
    </div>
  );
};

export default Appointments;
