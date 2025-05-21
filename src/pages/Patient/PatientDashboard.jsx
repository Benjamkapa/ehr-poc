import React, { useState } from 'react';
import './PatientDashboard.css';

const tabs = [
  'Dashboard',
  'Profile',
  'Messages',
  'Appointments',
  'Payments',
  'Medications',
  'Prescriptions',
];



export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Joe Calvin',
    dob: '1990-01-01',
    gender: 'Male',
    phone: '+254 712 289 648',
    email: 'joecalvin@gmail.com',
    nhifStatus: 'Active',
  });
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    doctor: '',
  });
  const [appointments, setAppointments] = useState([
    { date: '2025-06-01', doctor: 'Dr. Wanjiru (Cardiology)' },
    { date: '2025-06-15', doctor: 'Dr. Ouma (Dermatology)' },
  ]);


  const [payments, setPayments] = React.useState([
    { id: 1, date: '2025-04-01', amount: 20000, status: 'Paid' },
    { id: 2, date: '2025-03-15', amount: 7500, status: 'Paid' },
    { id: 3, date: '2024-02-28', amount: 38000, status: 'Pending' },
  ]);

  const [paymentFilter, setPaymentFilter] = React.useState('All'); 
  const [paymentSearch, setPaymentSearch] = React.useState('');     

  const [medications, setMedications] = useState([]);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    route: '',
    date: '',
    time: ''
  });

  const [lastAdded, setLastAdded] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    duration: '',
    notes: ''
  });






  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Patient Portal</h1>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Dashboard' && (
          <div className="dashboard-content">
            <div className="card">
              <h3 className="card-title">Upcoming Appointments</h3>
              <ul className="card-list">
                {appointments.map((appt, index) => (
                  <li key={index}>
                    <strong>Date:</strong> {appt.date} — <strong>Doctor:</strong> {appt.doctor}
                  </li>
                ))}
              </ul>

            </div>

            <div className="card">
              <h3 className="card-title">Recent Lab Results</h3>
              <ul className="card-list">
                <li>
                  <strong>Test:</strong> Complete Blood Count — <strong>Result:</strong> Normal — <strong>Date:</strong> 2025-05-10
                </li>
                <li>
                  <strong>Test:</strong> COVID-19 PCR — <strong>Result:</strong> Negative — <strong>Date:</strong> 2025-05-05
                </li>
              </ul>
            </div>
          </div>
        )}


        {activeTab === 'Profile' && (
          <div className="profile-container">
            <h2 className="section-title">Personal Profile</h2>

            <div className="profile-grid">
              <div>
                <label className="profile-label">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.fullName}</p>
                )}
              </div>

              <div>
                <label className="profile-label">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) =>
                      setProfile({ ...profile, dob: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.dob}</p>
                )}
              </div>


              <div>
                <label className="profile-label">Gender</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({ ...profile, gender: e.target.value })
                    }
                    className="profile-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="profile-value">{profile.gender}</p>
                )}
              </div>


              <div>
                <label className="profile-label">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="profile-label">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="profile-label">NHIF Status</label>
                <span className="nhif-status">{profile.nhifStatus}</span>
              </div>
            </div>

            <div className="edit-button">
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        )}


        {activeTab === 'Messages' && (
          <div>
            <h2 className="section-title">Secure Messages</h2>
            <p>Chat feature coming soon...</p>
          </div>
        )}

        {activeTab === 'Appointments' && (
          <div className="appointments-section">
            <h2 className="section-title">Book or Reschedule Appointment</h2>

            {showAppointmentForm ? (
              <form
                className="appointment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setAppointments([...appointments, newAppointment]);
                  setShowAppointmentForm(false);
                  setNewAppointment({ date: '', doctor: '' });
                  alert('Appointment successfully updated.');
                }}
              >
                <label>
                  Appointment Date:
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Doctor:
                  <select
                    value={newAppointment.doctor}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, doctor: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Mwangi">Dr. Mwangi</option>
                    <option value="Dr. Achieng">Dr. Achieng</option>
                    <option value="Dr. Kamau">Dr. Kamau</option>
                    <option value="Dr. Otieno">Dr. Otieno</option>
                  </select>
                </label>

                <button type="submit">Confirm Appointment</button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                className="add-appointment-button"
                onClick={() => setShowAppointmentForm(true)}
              >
                Add Appointment
              </button>
            )}
          </div>
        )}


        {activeTab === 'Payments' && (
          <div className="payments-section">
            <div className="payments-header">
              <h2 className="section-title">Payment History</h2>
            </div>

            <div className="payments-controls">
              <div className="payments-summary">
                <p>Total Paid: <strong>Ksh {payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</strong></p>
                <p>Total Pending: <strong>Ksh {payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</strong></p>
              </div>

              <div className="payments-filter-group">
                <label htmlFor="filterPayments">Filter by Status:</label>
                <select
                  id="filterPayments"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>

                <input
                  type="text"
                  className="payment-search"
                  placeholder="Search by date or amount"
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                />
              </div>
            </div>

            <ul className="payments-list">
              {payments
                .filter(payment => {
                  const matchesFilter = paymentFilter === 'All' || payment.status === paymentFilter;
                  const matchesSearch = payment.date.includes(paymentSearch) || payment.amount.toString().includes(paymentSearch);
                  return matchesFilter && matchesSearch;
                })
                .map((payment, index) => (
                  <li key={index} className={`payment-item ${payment.status.toLowerCase()}`}>
                    <div className="payment-details">
                      <p><strong>Date:</strong> {payment.date}</p>
                      <p><strong>Amount:</strong> Ksh {payment.amount.toLocaleString()}</p>
                    </div>
                    <span className={`status-badge ${payment.status.toLowerCase()}`}>{payment.status}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}


        {activeTab === 'Medications' && (
          <div className="medications-section">
            <h2 className="section-title">Drugs Administered</h2>
            <button
              className="add-medication-button"
              onClick={() => setShowMedicationForm(true)}
            >
              Add Administered Drug
            </button>

            {showSuccess && (
              <div className="success-toast">
                Medication added: {lastAdded.name} – {lastAdded.dosage} – {lastAdded.route} – {lastAdded.date} at {lastAdded.time}
              </div>
            )}
            <br /> <br />

            {medications.length === 0 ? (
              <p>No drugs have been administered yet.</p>
            ) : (
              <table className="medications-table">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => (
                    <tr key={index}>
                      <td>{med.name}</td>
                      <td>{med.dosage}</td>
                      <td>{med.route}</td>
                      <td>{med.date}</td>
                      <td>{med.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}


            {/* Modal Popup Form */}
            {showMedicationForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Add Administered Drug</h3>
                  <form
                    className="medication-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMedications([...medications, newMedication]);
                      setLastAdded(newMedication);
                      setShowSuccess(true);
                      setTimeout(() => setShowSuccess(false), 3000);
                      setShowMedicationForm(false);
                      setNewMedication({ name: '', dosage: '', route: '', date: '', time: '' });
                    }}
                  >
                    <label>
                      Medication Name:
                      <select
                        value={newMedication.name}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, name: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Medication</option>
                        <option value="Paracetamol">Paracetamol</option>
                        <option value="Amoxicillin">Amoxicillin</option>
                        <option value="Ibuprofen">Ibuprofen</option>
                        <option value="Metformin">Metformin</option>
                        <option value="Omeprazole">Omeprazole</option>
                      </select>
                    </label>

                    <label>
                      Dosage:
                      <select
                        value={newMedication.dosage}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, dosage: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Dosage</option>
                        <option value="250mg once daily">250mg once daily</option>
                        <option value="500mg twice daily">500mg twice daily</option>
                        <option value="100mg three times daily">100mg three times daily</option>
                        <option value="200mg once daily">200mg once daily</option>
                      </select>
                    </label>

                    <label>
                      Route of Administration:
                      <select
                        value={newMedication.route}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, route: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Route</option>
                        <option value="Oral">Oral</option>
                        <option value="Intravenous (IV)">Intravenous (IV)</option>
                        <option value="Intramuscular (IM)">Intramuscular (IM)</option>
                        <option value="Subcutaneous (SC)">Subcutaneous (SC)</option>
                        <option value="Topical">Topical</option>
                      </select>
                    </label>

                    <label>
                      Date Administered:
                      <input
                        type="date"
                        value={newMedication.date}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, date: e.target.value })
                        }
                        required
                      />
                    </label>

                    <label>
                      Time Administered:
                      <input
                        type="time"
                        value={newMedication.time}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, time: e.target.value })
                        }
                        required
                      />
                    </label>

                    <div className="modal-buttons">
                      <button type="submit">Add Medication</button> 
                      <button
                        type="button"
                        className="cancel-medication-button"
                        onClick={() => setShowMedicationForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}


        {activeTab === 'Prescriptions' && (
          <div className="prescriptions-section">
            <h2 className="section-title">Prescriptions and Treatment Plans</h2>
            <button
              className="add-prescription-button"
              onClick={() => setShowPrescriptionForm(true)}
            >
              Add Prescription
            </button>
            <br />

            {prescriptions.length === 0 ? (
              <p>No prescriptions available.</p>
            ) : (
              <ul className="prescriptions-list">
                {prescriptions.map((prescription, index) => (
                  <li key={index}>
                    <strong>{prescription.medication}</strong> — {prescription.dosage} — Duration: {prescription.duration}
                    {prescription.notes && <p><em>Instructions:</em> {prescription.notes}</p>}
                  </li>
                ))}
              </ul>
            )}

            {/* Modal Form */}
            {showPrescriptionForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Add Prescription</h3>
                  <form
                    className="prescription-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPrescriptions([...prescriptions, newPrescription]);
                      setShowPrescriptionForm(false);
                      setNewPrescription({ medication: '', dosage: '', duration: '', notes: '' });
                    }}
                  >
                    <label>
                      Medication:
                      <select
                        value={newPrescription.medication}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, medication: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Medication</option>
                        <option value="Paracetamol">Paracetamol</option>
                        <option value="Amoxicillin">Amoxicillin</option>
                        <option value="Ibuprofen">Ibuprofen</option>
                        <option value="Metformin">Metformin</option>
                        <option value="Omeprazole">Omeprazole</option>
                      </select>
                    </label>

                    <label>
                      Dosage:
                      <select
                        value={newPrescription.dosage}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, dosage: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Dosage</option>
                        <option value="250mg once daily">250mg once daily</option>
                        <option value="500mg twice daily">500mg twice daily</option>
                        <option value="100mg three times daily">100mg three times daily</option>
                        <option value="200mg once daily">200mg once daily</option>
                      </select>
                    </label>

                    <label>
                      Duration:
                      <select
                        value={newPrescription.duration}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, duration: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Duration</option>
                        <option value="3 days">3 days</option>
                        <option value="5 days">5 days</option>
                        <option value="7 days">7 days</option>
                        <option value="10 days">10 days</option>
                        <option value="Until review">Until review</option>
                      </select>
                    </label>

                    <label>
                      Instructions / Notes:
                      <textarea
                        value={newPrescription.notes}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, notes: e.target.value })
                        }
                        placeholder="e.g. Take with food or after meals"
                        rows={3}
                      />
                    </label>

                    <div className="prescription-form-buttons">
                      <button type="submit" className="submit-prescription-button">Add Prescription</button>
                      <button
                        type="button"
                        className="cancel-prescription-button"
                        onClick={() => {
                          setShowPrescriptionForm(false);
                          setNewPrescription({ medication: '', dosage: '', duration: '', notes: '' });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}
