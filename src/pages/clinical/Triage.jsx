import React from 'react'

const Triage = () => {
const patients=[
    { id: 1, name: 'John Doe', from: '10:00 AM', to: '10:30 AM', clinic: 'Cardiology' },
    { id: 2, name: 'Jane Smith', from: '11:00 AM', to: '11:30 AM', clinic: 'Dermatology' },
    { id: 3, name: 'Sam Wilson', from: '12:00 PM', to: '12:30 PM', clinic: 'Pediatrics' },
    { id: 4, name: 'Lisa Brown', from: '01:00 PM', to: '01:30 PM', clinic: 'Orthopedics' },
    { id: 5, name: 'Tom Hardy', from: '02:00 PM', to: '02:30 PM', clinic: 'Neurology' },
    { id: 6, name: 'Emma Watson', from: '03:00 PM', to: '03:30 PM', clinic: 'Gynecology' },
    { id: 7, name: 'Chris Evans', from: '04:00 PM', to: '04:30 PM', clinic: 'Oncology' },

    ];

    const handleView = (id) => {
        // Handle view action here
        console.log(`View details for patient with ID: ${id}`);
    }
    const handleSearch = (e) => {
        // Handle search action here
        console.log(`Search for patient: ${e.target.value}`);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submit action here
        console.log(`Search submitted`);
    }
    


  return (
    <div>
        <div className="flex items-center justify-between">
            <p className='w-full'> Patient Queue</p>
            <div>
            {/* <button className='bg-primary text-white  rounded'>Add To Queue</button> */}
            {/* <button className="bg-primary text-white  rounded" onClick={()=>document.getElementById('my_modal_4').showModal()}>Add To Queue</button> */}
            </div>
        </div>

        

        <div>
            <table className='w-full mt-5 text-xs'>
                <thead>
                    <th className='text-left'>QUEUE NO</th>
                    <th className='text-left'>Patient Name</th>
                    <th className='text-left'>From</th>
                    <th className='text-left'>To</th>
                    <th className='text-left'>Clinic name</th>
                    <th className='text-left'>Action</th>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className={`${patient.id % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}`}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.from}</td>
                            <td>{patient.to}</td>
                            <td>{patient.clinic}</td>
                            <td>
                                <button className='bg-primary text-white p-1 rounded' onClick={() => handleView(patient.id)}>View</button>
                            </td>
                        </tr>
                    ))}
  
                </tbody>
            </table>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}00
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        
    </div>
  )
}

export default Triage