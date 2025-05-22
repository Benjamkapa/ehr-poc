import React from 'react'
import { IoAdd } from "react-icons/io5";
import TriageForm from '../../components/forms/TriageForm';


const Triage = () => {
  const [selectedPatient, setSelectedPatient] = React.useState(null);


const fetchQueuedPatients = async () => {
    // Fetch triage data from local storage 
    const queuedPatients = localStorage.getItem('queuedPatients');
    if (queuedPatients) {
        return JSON.parse(queuedPatients);
    }
    return [];
}
const [patients, setPatients] = React.useState([]);
React.useEffect(() => {
    const getPatients = async () => {
        const data = await fetchQueuedPatients();
        setPatients(data);
    }
    getPatients();

}, [])


// const fetchTriageData = async () => {
//   // Fetch triage data from local storage 
//   const triageData = localStorage.getItem('triageData');
//   if (triageData) {
//       return JSON.parse(triageData);
//   }
//   return [];
// }
// const [triageData, setTriageData] = React.useState([]);
// React.useEffect(() => {
//   const getTriageData = async () => {
//       const data = await fetchTriageData();
//       setTriageData(data);
//   }
//   getTriageData();

// }, [])

// console.log("triageData", triageData);




    const handleView = (patient) => {
      setSelectedPatient(patient);
  };
    const handleSearch = (e) => {
        // Handle search action here
        console.log(`Search for patient: ${e.target.value}`);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submit action here
        console.log(`Search submitted`);
    }



    console.log("selected patient",selectedPatient)


  return (
    <div>

    
<div className="grid grid-cols-2 gap-5">
<div className='bg-white p-5 rounded bg-white p-5 rounded '>
         <p className='text-primary text-md'> Patient Queue</p>
            <table className='w-full mt-5 text-xs'>
                <thead>
                    <th className='text-left'>Queue No</th>
                    <th className='text-left'>Patient Name</th>

                    <th className='text-left'>Action</th>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className={`${patient.id % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}`}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>
                                <p className='text-primary underline cursor-pointer' onClick={() => handleView(patient)}>View</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  
        <div className='bg-white p-5 rounded bg-white p-5 rounded  space-y-3'> 
         <p className='text-primary text-md'> Patient Details</p>
         <div  className='flex items-center justify-between bg-gray-100 p-2 rounded'> 
            <h2>Fullname</h2>
            <p>{selectedPatient?.name || "N/A"}</p>
         </div>
         <div  className='flex items-center justify-between  p-2 ' > 
            <h2>ID Number</h2>
            <p>{selectedPatient?.id_number || "N/A"}</p>
         </div>        
          <div  className='flex items-center justify-between bg-gray-100 p-2 rounded'> 
            <h2>Phone</h2>
            < p>{selectedPatient?.phone_number || "N/A"}</p>
         </div>         <div  className='flex items-center justify-between  p-2 '> 
            <h2>Sex</h2>
            <p>{selectedPatient?.sex || "N/A"}</p>
         </div>        
        
        </div>
        <div className='bg-white p-5 rounded bg-white p-5 rounded  space-y-3'> 
            <div className="flex justify-between items-center">
            <p className='text-primary text-md'>General Examination</p>
            <IoAdd onClick={()=>document.getElementById('my_modal_3').showModal()} size={25} className='bg-primary  text-white cursor-pointer rounded'/>
            </div>  
            <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
            <h2>Height</h2>
            <p>1.5m</p>
            </div>
            <div className='flex items-center justify-between p-2'>
            <h2>Weight</h2>
            <p>70kg</p>
            </div>
            <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
            <h2>Blood Pressure</h2>
            <p>120/80</p>
                    
           </div>
            <div className='flex items-center justify-between p-2'>
            <h2>Temperature</h2>
            <p>37.5°C</p>
            </div>
            <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
            <h2>Pulse</h2>
            <p>80 bpm</p>
            </div>
            <div className='flex items-center justify-between p-2'>
            <h2>Respiration Rate</h2>
            <p>20 breaths/min</p>
            </div>
            <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
            <h2>Oxygen Saturation</h2>
            <p>98%</p>

            </div>
  
            <div className='flex items-center justify-between p-2'>
            <h2>Pain Scale</h2>
            <p>0</p>
            </div>
              
        </div>
</div>

<dialog id="my_modal_3" className="modal ">
  <div className="modal-box w-full max-w-5xl">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-md">Triage General Examination</h3>
    <TriageForm />

  </div>
</dialog>
</div>
  ) 
}

export default Triage