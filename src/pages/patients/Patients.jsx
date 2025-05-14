import React, { useState, useEffect } from 'react';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
  });

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('patients') || '[]');
    setPatients(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      toast.error('Name and contact are required');
      return;
    }

    let updated;
    if (editIndex !== null) {
      updated = [...patients];
      updated[editIndex] = formData;
      toast.success('Patient updated');
    } else {
      updated = [...patients, { ...formData, id: Date.now() }];
      toast.success('Patient added');
    }

    setPatients(updated);
    sessionStorage.setItem('patients', JSON.stringify(updated));
    setFormData({ name: '', age: '', gender: '', contact: '' });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(patients[index]);
  };

  const handleDelete = (index) => {
    const updated = patients.filter((_, i) => i !== index);
    setPatients(updated);
    sessionStorage.setItem('patients', JSON.stringify(updated));
    toast.success('Patient deleted');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setFormData({ name: '', age: '', gender: '', contact: '' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Toaster />
      <div className="col-span-2 px-10">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">Patients</h1>

        {/* Form Section */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4 text-lg">{editIndex !== null ? 'Edit' : 'Add'} Patient</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded hover:shadow"
              required
            />
            <input
              type="date"
              name="age"
              title='Date of Birth'
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border p-2 rounded hover:shadow"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded hover:shadow"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Rather Not Say">Rather Not Say</option>
            </select>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border p-2 rounded"
              required
            />
            <div className="col-span-full flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-full mx-auto w-1/2"
              >
                {editIndex !== null ? 'Update' : 'Add'} Patient
              </button>
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Section */}
        <section>
          <h2 className="font-semibold mb-4 text-lg">Patients List</h2>
          <table className="w-full border table-auto shadow-lg bg-gray-100">
            <thead>
              <tr className="bg-slate-400">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">No patients added.</td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr key={patient.id}>
                    <td className="p-2 border">{patient.name}</td>
                    <td className="p-2 border">{patient.age}</td>
                    <td className="p-2 border">{patient.gender}</td>
                    <td className="p-2 border">{patient.contact}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="hover:text-blue-700"
                      >
                        <BsPencilSquare className="inline" title="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="hover:text-red-700"
                      >
                        <BsTrash3 className="inline" title="Delete" />
                      </button>
                    </td>
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

export default Patients;
