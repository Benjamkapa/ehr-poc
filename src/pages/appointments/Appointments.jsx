import React, { useState, useEffect } from 'react';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentIndex, setEditAppointmentIndex] = useState(null);
  const [editAppointmentFormData, setEditAppointmentFormData] = useState({
    patientName: '',
    doctor: '',
    appointmentDate: '',
    reason: '',
  });

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("appointments") || "[]");
    setAppointments(storedData);
  }, []);

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      patientName: form.patientName.value,
      doctor: form.doctor.value,
      appointmentDate: form.appointmentDate.value,
      reason: form.reason.value,
    };

    const updatedData = [...appointments, newEntry];
    sessionStorage.setItem("appointments", JSON.stringify(updatedData));
    setAppointments(updatedData);
    form.reset();
    toast.success('Appointment added successfully!');
  };

  const deleteAppointment = (index) => {
    const updatedData = appointments.filter((_, i) => i !== index);
    sessionStorage.setItem("appointments", JSON.stringify(updatedData));
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
    sessionStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
    setEditAppointmentIndex(null);
    toast.success('Appointment updated successfully!');
  };

  const cancelEditAppointment = () => {
    setEditAppointmentIndex(null);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='col-span-2'>
        <h1 className='font-bold uppercase text-xl text-center mb-4'>Appointments</h1>

        <section className='mx-5 px-5 py-5'>
          <div className='mb-8 border p-4 rounded shadow-lg bg-gray-100'>
            <h2 className='font-semibold text-lg mb-2'>Add Appointment</h2>
            <form onSubmit={handleAppointmentSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input name='patientName' placeholder='Patient Name' className='rounded border hover:shadow p-2' required />
              <input name='doctor' placeholder='Doctor' className='border p-2 rounded hover:shadow' required />
              <input type='date' name='appointmentDate' className='border rounded p-2 hover:shadow' required />
              <input name='reason' placeholder='Reason for Visit' className='rounded hover:shadow border p-2 md:col-span-2' />
              <button type='submit' className='bg-blue-600 mx-auto text-white px-4 w-1/2 rounded-full py-2 hover:bg-blue-500 col-span-full'>
                Add Appointment
              </button>
            </form>
          </div>
        </section>

        <section className='mx-5 px-5'>
          <h2 className='font-semibold text-lg mb-2'>Appointments List</h2>
          <table className='w-full border table-auto bg-gray-100 shadow-lg'>
            <thead>
              <tr className='bg-slate-400'>
                <th className='p-2 border'>Patient Name</th>
                <th className='p-2 border'>Doctor</th>
                <th className='p-2 border'>Date</th>
                <th className='p-2 border'>Reason</th>
                <th className='p-2 border'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center p-4'>No appointments added.</td>
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
                          <button onClick={saveEditedAppointment} className='bg-green-600 text-white p-1 rounded'>Save</button>
                          <button onClick={cancelEditAppointment} className='bg-red-600 text-white p-1 rounded ml-2'>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className='p-2 border'>{appointment.patientName}</td>
                        <td className='p-2 border'>{appointment.doctor}</td>
                        <td className='p-2 border'>{appointment.appointmentDate}</td>
                        <td className='p-2 border'>{appointment.reason}</td>
                        <td className='p-2 border'>
                          <button onClick={() => editAppointment(index)} className='bg-green-600 text-white p-1 rounded'>
                            <BsPencilSquare />
                          </button>
                          <button onClick={() => deleteAppointment(index)} className='bg-red-600 text-white p-1 rounded ml-2'>
                            <BsTrash3 />
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
