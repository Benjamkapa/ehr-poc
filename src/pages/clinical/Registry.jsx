
import React, { useState, useRef, useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';

const Registry = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const [search, setSearch] = useState('');
  const [modalType, setModalType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const menuRef = useRef(null);

  const patients = [
    { id: 1, name: 'John Doe', phone: '0712345678', dob: '1990-05-14', idNumber: '12345678', residence: 'Nairobi' },
    { id: 2, name: 'Jane Smith', phone: '0723456789', dob: '1985-11-30', idNumber: '87654321', residence: 'Mombasa' },
    { id: 3, name: 'Peter Mwangi', phone: '0734567890', dob: '1992-03-22', idNumber: '11223344', residence: 'Kisumu' },
    { id: 4, name: 'Alice Kimani', phone: '0711112222', dob: '1995-07-19', idNumber: '33445566', residence: 'Thika' },
    { id: 5, name: 'Brian Otieno', phone: '0722223333', dob: '1988-02-03', idNumber: '99887766', residence: 'Eldoret' },
    { id: 6, name: 'Lucy Wanjiku', phone: '0733334444', dob: '1993-09-09', idNumber: '55667788', residence: 'Nyeri' },
    { id: 7, name: 'James Kariuki', phone: '0744445555', dob: '1991-12-01', idNumber: '44332211', residence: 'Nakuru' },
    { id: 8, name: 'Susan Chebet', phone: '0755556666', dob: '1980-01-15', idNumber: '22114433', residence: 'Kericho' },
    { id: 9, name: 'Daniel Njoroge', phone: '0766667777', dob: '1996-06-06', idNumber: '66778899', residence: 'Machakos' },
    { id: 10, name: 'Grace Muthoni', phone: '0777778888', dob: '1994-03-27', idNumber: '33446655', residence: 'Meru' },
    { id: 11, name: 'Mark Otieno', phone: '0788889999', dob: '1997-10-20', idNumber: '12234455', residence: 'Kakamega' },
    { id: 12, name: 'Emily Achieng', phone: '0799990000', dob: '1982-08-17', idNumber: '66778800', residence: 'Kisii' },
    { id: 13, name: 'George Wekesa', phone: '0700001111', dob: '1990-11-11', idNumber: '55664477', residence: 'Bungoma' },
    { id: 14, name: 'Faith Nduta', phone: '0710101010', dob: '1998-04-30', idNumber: '77889900', residence: 'Kitui' },
    { id: 15, name: 'Samuel Kiprotich', phone: '0720202020', dob: '1987-12-12', idNumber: '44556677', residence: 'Narok' },
  ];

  const filteredPatients = patients.filter((patient) =>
    Object.values(patient)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const openModal = (type, patient = null) => {
    setModalType(type);
    setSelectedPatient(patient);
    document.getElementById('dynamic_modal').showModal();
  };
//   id types
  const idTypes = [
    { id: 1, name: 'National ID' },
    { id: 2, name: 'Passport' },
    { id: 3, name: 'Driver\'s License' },
    { id: 4, name: 'Birth Certificate' },
    { id: 5, name: 'Student ID' },
    { id: 6, name: 'Military ID' },
  ];
//   sex types
const sexTypes=[
    { id: 1, name: 'Choose not to say' },
    { id: 2, name: 'Male' },
    { id: 3, name: 'Female' },
    { id: 4, name: 'Other' },

  ];
//   occupation types
const occupation=[
    { id: 1, name: 'Pilot' },
    { id: 2, name: 'Doctor' },
    { id: 3, name: 'Nurse' },
    { id: 4, name: 'Pharmacist' },
    { id: 5, name: 'Lab Technician' },
    { id: 6, name: 'Receptionist' },
    { id: 7, name: 'Softaware Engineer' },

  ];
//   departments
const departments = [
    { id: 1, name: 'Emergency' },
    { id: 2, name: 'Outpatient' },
    { id: 3, name: 'Inpatient' },
    { id: 4, name: 'Pediatrics' },
    { id: 5, name: 'Maternity' },
    { id: 6, name: 'Surgery' },
    { id: 7, name: 'Radiology' },
    { id: 8, name: 'Laboratory' },
    { id: 9, name: 'Pharmacy' },
    { id: 10, name: 'Cardiology' },
    { id: 11, name: 'Orthopedics' },
    { id: 12, name: 'Dermatology' },
    { id: 13, name: 'ENT (Ear, Nose, Throat)' },
    { id: 14, name: 'Ophthalmology' },
    { id: 15, name: 'Oncology' },
    { id: 16, name: 'Neurology' },
    { id: 17, name: 'Psychiatry' },
    { id: 18, name: 'Physiotherapy' },
    { id: 19, name: 'ICU (Intensive Care Unit)' },
    { id: 20, name: 'Dental' }
  ];
  


const handleAdd=()=>{
    console.log("ADD PATIENT");
}
const handleQueue=()=>{
    console.log("QUEUE PATIENT");
}


  return (
    <div className='p-4'>
      <div className='flex flex-wrap items-center justify-between gap-4 mb-4'>
        <p className='font-semibold'>Patients</p>
        <input
          type='text'
          placeholder='Search patients by name, phone or id number'
          className='border px-2 py-1.5 rounded text-sm w-full max-w-xs'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal('add')}
          className='bg-primary py-2 px-4 text-white rounded whitespace-nowrap'
        >
          Add Patient
        </button>
      </div>

      <table className='w-full text-xs'>
        <thead>
          <tr>
            <th className='text-left p-2'>PATIENT NAME</th>
            <th className='text-left p-2'>PHONE</th>
            <th className='text-left p-2'>DOB</th>
            <th className='text-left p-2'>ID NO</th>
            <th className='text-left p-2'>RESIDENCE</th>
            <th className='text-left p-2'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr
              key={patient.id}
              className={`${patient.id % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}`}
            >
              <td className='px-2'>{patient.name}</td>
              <td className='px-2'>{patient.phone}</td>
              <td className='px-2'>{patient.dob}</td>
              <td className='px-2'>{patient.idNumber}</td>
              <td className='px-2'>{patient.residence}</td>
              <td className='relative px-2'>
                <button onClick={() => toggleMenu(patient.id)}>
                  <CiMenuKebab size={20} />
                </button>

                {menuOpen === patient.id && (
                  <div
                    ref={menuRef}
                    className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm z-10'
                  >
                    <ul>
                      <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>View</li>
                      <li
                        onClick={() => openModal('queue', patient)}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      >
                        Queue Patient
                      </li>
                      <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Delete</li>
                      <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Deactivate Patient</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="6" className='text-center py-4 text-gray-500'>No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="dynamic_modal" className="modal">
        <div className={` modal-box ${modalType === 'add' ? 'w-11/12 max-w-6xl' : 'w-11/12 max-w-2xl'}`}>
          <h3 className="font-bold text-lg mb-4">
            {modalType === 'add' && 'Add New Patient'}
            {modalType === 'queue' && `Add ${selectedPatient?.name} To Queue`}
          </h3>

          {modalType === 'add' && (
            <div>
                <form className='gap-7 grid grid-cols-3 '>
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                        <div>
                        <label className="block text-sm font-medium mb-1">Patient Name</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Phone number</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Id Type</label>

                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select Id type</option>
                        {idTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Id number</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                    {/* </div> */}
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                        <div>
                        <label className="block text-sm font-medium mb-1">Residence</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Date Of Birth</label>
                        <input type="date" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Sex </label>
                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option>Select sex</option>
                        {sexTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                    {/* </div> */}
                    {/* <div className="grid grid-cols-3 gap-3"> */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Occupation </label>
                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select occupation</option>
                        {occupation.map((type) => (
                            // select 
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="border px-2 py-1 rounded w-full" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Next of Kin Name</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>            <div>
                        <label className="block text-sm font-medium mb-1">Next of Kin Relationship</label>
                        <input type="text" className="border px-2 py-1 rounded w-full" />
                        </div>            <div>
                        <label className="block text-sm font-medium mb-1">Next of Kin Contact</label>
                        <input type="number" className="border px-2 py-1 rounded w-full" />
                        </div>
    
                    {/* </div> */}
                    
 
                </form>
            </div>
          )}

          {modalType === 'queue' && (
            <div>
            <form className='grid grid-cols-2 gap-7'>
            <div
            >
                        <label className="block text-sm font-medium mb-1">From</label>

                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select from  department</option>
                        {departments.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
                        <div
            >
                        <label className="block text-sm font-medium mb-1">To</label>

                        <select className='border px-2 py-1 rounded w-full' id="">
                            <option >Select to department</option>
                        {departments.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                         </select>
                        </div>
            </form>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-500 text-white">Close</button>
            </form>
              <button onClick={modalType==="queue"? handleQueue: handleAdd} className="bg-primary text-white px-4 py-1.5 rounded">{modalType === "queue" ?"Queue patient":"Add patient"}</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Registry;
