import { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaHeartbeat, FaThermometerHalf, FaHeartbeat as FaActivity, 
         FaArrowDown, FaArrowUp, FaClock, FaUser } from 'react-icons/fa';

// Mock data for queue and triageData
// const triageData = {
//   id: 'P-1234',
//   name: 'John Doe',
//   age: 0,
//   vitals: {
//     systolic: 120,
//     diastolic: 80,
//     pulse: 75,
//     temperature: 37.0,
//     weight: 70,
//     height: 175, 
//     oxygenSaturation: 98
//   },
//   pain: 2,
//   chiefComplaint: '',
//   triageColor: 'green',
//   queuePosition: 3
// };

const initialTriageData = {
  id: 'P-1234',
  name: 'John Doe',
  age: 0,
  vitals: {
    systolic: 0,
    diastolic: 0,
    pulse: 0,
    temperature: 0,
    weight: 0,
    height: 10,
    oxygenSaturation: 0
  },
  pain: 0,
  chiefComplaint: '',
  triageColor: 'green',
  queuePosition: 0
};

// Common complaints for autocomplete
const commonComplaints = [
  'Fever', 'Cough', 'Headache', 'Chest pain', 'Abdominal pain',
  'Nausea', 'Vomiting', 'Dizziness', 'Shortness of breath', 'Back pain'
];

export default function TriageForm() {



  const [triageData, setTriageData] = useState(initialTriageData);
  const [suggestions, setSuggestions] = useState([]);
  const [queueUpdateMessage, setQueueUpdateMessage] = useState('');

  // Check vitals for abnormalities
  const checkVitalStatus = (vitalType) => {
    const { vitals } = triageData;
    
    switch(vitalType) {
      case 'bp':
        return vitals.systolic > 140 || vitals.systolic < 90 || 
               vitals.diastolic > 90 || vitals.diastolic < 60 ? 'red' : 'green';
      case 'pulse':
        return vitals.pulse > 100 || vitals.pulse < 60 ? 'orange' : 'green';
      case 'temperature':
        return vitals.temperature > 38 || vitals.temperature < 36 ? 'orange' : 'green';
      case 'oxygenSaturation':
        return vitals.oxygenSaturation < 95 ? 'red' : 'green';
      default:
        return 'green';
    }
  };

  // Handle vital sign changes
  const handleVitalChange = (type, value) => {
    setTriageData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [type]: value
      }
    }));
  };

  // Handle pain scale changes
  const handlePainChange = (value) => {
    setTriageData(prev => ({
      ...prev,
      pain: value
    }));
  };

  // Handle chief complaint changes with suggestions
  const handleComplaintChange = (e) => {
    const value = e.target.value;
    setTriageData(prev => ({
      ...prev,
      chiefComplaint: value
    }));
    
    // Generate suggestions
    if (value.length > 0) {
      const filtered = commonComplaints.filter(complaint => 
        complaint.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Apply suggestion
  const applySuggestion = (suggestion) => {
    setTriageData(prev => ({
      ...prev,
      chiefComplaint: suggestion
    }));
    setSuggestions([]);
  };

  // Handle triage color assignment
  const assignTriageColor = (color) => {
    setTriageData(prev => ({
      ...prev,
      triageColor: color
    }));
  };


  // Simulate real-time queue updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Randomly update queue position (for demo purposes)
  //     const newPosition = Math.max(1, triageData.queuePosition + Math.floor(Math.random() * 3) - 1);
      
  //     if (newPosition !== triageData.queuePosition) {
  //       setTriageData(prev => ({
  //         ...prev,
  //         queuePosition: newPosition
  //       }));      
  //       setQueueUpdateMessage(`Queue position updated to ${newPosition}`);
  //       // setTimeout(() => setQueueUpdateMessage(''), 3000);
  //     }
  //   }, 10000);
    
  //   return () => clearInterval(interval);
  // }, [triageData.queuePosition]);




  // console.log('triageData Data:', triageData);

  // const handleInternalQueue = () => {
  //   handleQueue(triageData);
  // }


  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem('triageData')) || [];
    const updated = [...stored, triageData];
    localStorage.setItem('triageData', JSON.stringify(updated));
    setQueueUpdateMessage('Triage data added successfully!');
    console.log('Queued patient:', triageData);
  }



 

  return (
    <div className="w-full ">

      {/* Vital Signs Section */}
      <div className="mb-6">
        <h2 className=" text-md font-semibold my-5">Vital Signs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Blood Pressure */}
          <div className={`p-3 rounded-md ${checkVitalStatus('bp') === 'red' ? 'bg-red-100' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-1">
              <FaActivity className={`mr-1 ${checkVitalStatus('bp') === 'red' ? 'text-red-500' : 'text-gray-600'}`} size={18} />
              <label className="text-sm font-medium">Blood Pressure</label>
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.systolic}
                onChange={(e) => handleVitalChange('systolic', parseInt(e.target.value))}
              />
              <span className="text-sm self-center">/</span>
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.diastolic}
                onChange={(e) => handleVitalChange('diastolic', parseInt(e.target.value))}
              />
              <span className="text-sm self-center">mmHg</span>
            </div>
          </div>
          
          {/* Pulse */}
          <div className={`p-3 rounded-md ${checkVitalStatus('pulse') === 'orange' ? 'bg-orange-100' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-1">
              <FaHeartbeat className={`mr-1 ${checkVitalStatus('pulse') === 'orange' ? 'text-orange-500' : 'text-gray-600'}`} size={18} />
              <label className="text-sm font-medium">Pulse</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.pulse}
                onChange={(e) => handleVitalChange('pulse', parseInt(e.target.value))}
              />
              <span className="text-sm ml-2">BPM</span>
            </div>
          </div>
          
          {/* Temperature */}
          <div className={`p-3 rounded-md ${checkVitalStatus('temperature') === 'orange' ? 'bg-orange-100' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-1">
              <FaThermometerHalf className={`mr-1 ${checkVitalStatus('temperature') === 'orange' ? 'text-orange-500' : 'text-gray-600'}`} size={18} />
              <label className="text-sm font-medium">Temperature</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                step="0.1"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.temperature}
                onChange={(e) => handleVitalChange('temperature', parseFloat(e.target.value))}
              />
              <span className="text-sm ml-2">°C</span>
            </div>
          </div>
          
          {/* Weight */}
          <div className="p-3 rounded-md bg-gray-100">
            <div className="flex items-center mb-1">
              <FaArrowDown className="mr-1 text-gray-600" size={18} />
              <label className="text-sm font-medium">Weight</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.weight}
                onChange={(e) => handleVitalChange('weight', parseInt(e.target.value))}
              />
              <span className="text-sm ml-2">kg</span>
            </div>
          </div>
          
          {/* Height */}
          <div className="p-3 rounded-md bg-gray-100">
            <div className="flex items-center mb-1">
              <FaArrowUp className="mr-1 text-gray-600" size={18} />
              <label className="text-sm font-medium">Height</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.height}
                onChange={(e) => handleVitalChange('height', parseInt(e.target.value))}
              />
              <span className="text-sm ml-2">cm</span>
            </div>
          </div>
          
          {/* Oxygen Saturation */}
          <div className={`p-3 rounded-md ${checkVitalStatus('oxygenSaturation') === 'red' ? 'bg-red-100' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-1">
              <FaExclamationTriangle className={`mr-1 ${checkVitalStatus('oxygenSaturation') === 'red' ? 'text-red-500' : 'text-gray-600'}`} size={18} />
              <label className="text-sm font-medium">O₂ Saturation</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 p-1 border rounded"
                value={triageData?.vitals.oxygenSaturation}
                onChange={(e) => handleVitalChange('oxygenSaturation', parseInt(e.target.value))}
              />
              <span className="text-sm ml-2">%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pain Scale */}
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-3">Pain Assessment</h2>
        <div className="flex items-center">
          <span className="text-sm mr-2">0</span>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={triageData?.pain}
            onChange={(e) => handlePainChange(parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-sm ml-2">10</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-green-500">No Pain</span>
          <span className="text-xs text-yellow-500">Moderate</span>
          <span className="text-xs text-red-500">Severe</span>
        </div>
        <div className="mt-2 text-center">
          <span className="font-medium">Current Pain Level: {triageData?.pain}/10</span>
        </div>
      </div>
      
      {/* Chief Complaint */}
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-3">Chief Complaint</h2>
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Enter chief complaint..."
            value={triageData?.chiefComplaint}
            onChange={handleComplaintChange}
          />
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 bg-white border rounded mt-1 w-full shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => applySuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Triage Color Assignment */}
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-3">Triage Assessment</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'green' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}
            onClick={() => assignTriageColor('green')}
          >
            Normal
          </button>
          <button
            className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'orange' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'}`}
            onClick={() => assignTriageColor('orange')}
          >
            Abnormal
          </button>
          <button
            className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'red' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'}`}
            onClick={() => assignTriageColor('red')}
          >
            Urgent
          </button>
        </div>
      </div>
      <div className="flex justify-end">
      <button onClick={handleSave} className='bg-primary  text-white rounded  px-5 py-3'>SAVE</button>

      </div>
      

    </div>
  );
}





// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import toast from 'react-hot-toast';

// const TriageForm = forwardRef((props, ref) => {
//   console.log("props ",props);
//   const [triageData, setTriageData] = useState({
//     id: 'TD-' + Math.floor(Math.random() * 1000),
//     name: props.selectedPatient,
//     age: 0,
//     vitals: {
//       systolic: 0,
//       diastolic: 0,
//       pulse: 0,
//       temperature: 0,
//       weight: 0,
//       height: 0,
//       oxygenSaturation: 0,
//     },
//     pain: 0,
//     chiefComplaint: '',
//     triageColor: 'green',
//     queuePosition: 0,
//   });

//   // Expose submitToQueue method
//   useImperativeHandle(ref, () => ({
//     submitToQueue() {
//       const stored = JSON.parse(localStorage.getItem('queuedPatients')) || [];
//       const updated = [...stored, triageData];
//       localStorage.setItem('queuedPatients', JSON.stringify(updated));
//       toast.success('Patient queued successfully!');
//       // console.log('Queued patient:', triageData);
//     }
//   }));

//   // ... keep your existing state logic and handlers (handleVitalChange, etc.)
// // Common complaints for autocomplete
// const commonComplaints = [
//   'Fever', 'Cough', 'Headache', 'Chest pain', 'Abdominal pain',
//   'Nausea', 'Vomiting', 'Dizziness', 'Shortness of breath', 'Back pain'
// ];

//   // const [triageData, setTriageData] = useState(initialTriageData);
//   const [suggestions, setSuggestions] = useState([]);
//   const [queueUpdateMessage, setQueueUpdateMessage] = useState('');

//   // Check vitals for abnormalities
//   const checkVitalStatus = (vitalType) => {
//     const { vitals } = triageData;
    
//     switch(vitalType) {
//       case 'bp':
//         return vitals.systolic > 140 || vitals.systolic < 90 || 
//                vitals.diastolic > 90 || vitals.diastolic < 60 ? 'red' : 'green';
//       case 'pulse':
//         return vitals.pulse > 100 || vitals.pulse < 60 ? 'orange' : 'green';
//       case 'temperature':
//         return vitals.temperature > 38 || vitals.temperature < 36 ? 'orange' : 'green';
//       case 'oxygenSaturation':
//         return vitals.oxygenSaturation < 95 ? 'red' : 'green';
//       default:
//         return 'green';
//     }
//   };

//   // Handle vital sign changes
//   const handleVitalChange = (type, value) => {
//     setTriageData(prev => ({
//       ...prev,
//       vitals: {
//         ...prev.vitals,
//         [type]: value
//       }
//     }));
//   };

//   // Handle pain scale changes
//   const handlePainChange = (value) => {
//     setTriageData(prev => ({
//       ...prev,
//       pain: value
//     }));
//   };

//   // Handle chief complaint changes with suggestions
//   const handleComplaintChange = (e) => {
//     const value = e.target.value;
//     setTriageData(prev => ({
//       ...prev,
//       chiefComplaint: value
//     }));
    
//     // Generate suggestions
//     if (value.length > 0) {
//       const filtered = commonComplaints.filter(complaint => 
//         complaint.toLowerCase().startsWith(value.toLowerCase())
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Apply suggestion
//   const applySuggestion = (suggestion) => {
//     setTriageData(prev => ({
//       ...prev,
//       chiefComplaint: suggestion
//     }));
//     setSuggestions([]);
//   };

//   // Handle triage color assignment
//   const assignTriageColor = (color) => {
//     setTriageData(prev => ({
//       ...prev,
//       triageColor: color
//     }));
//   };

//   return (
//     <div className="w-full ">
//       {/* Vital Signs Section */}
//       <div className="mb-6">
//         <h2 className=" text-md font-semibold my-5">Vital Signs</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Blood Pressure */}
//           <div className={`p-3 rounded-md ${checkVitalStatus('bp') === 'red' ? 'bg-red-100' : 'bg-gray-100'}`}>
//             <div className="flex items-center mb-1">
//               <FaActivity className={`mr-1 ${checkVitalStatus('bp') === 'red' ? 'text-red-500' : 'text-gray-600'}`} size={18} />
//               <label className="text-sm font-medium">Blood Pressure</label>
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.systolic}
//                 onChange={(e) => handleVitalChange('systolic', parseInt(e.target.value))}
//               />
//               <span className="text-sm self-center">/</span>
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.diastolic}
//                 onChange={(e) => handleVitalChange('diastolic', parseInt(e.target.value))}
//               />
//               <span className="text-sm self-center">mmHg</span>
//             </div>
//           </div>
          
//           {/* Pulse */}
//           <div className={`p-3 rounded-md ${checkVitalStatus('pulse') === 'orange' ? 'bg-orange-100' : 'bg-gray-100'}`}>
//             <div className="flex items-center mb-1">
//               <FaHeartbeat className={`mr-1 ${checkVitalStatus('pulse') === 'orange' ? 'text-orange-500' : 'text-gray-600'}`} size={18} />
//               <label className="text-sm font-medium">Pulse</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.pulse}
//                 onChange={(e) => handleVitalChange('pulse', parseInt(e.target.value))}
//               />
//               <span className="text-sm ml-2">BPM</span>
//             </div>
//           </div>
          
//           {/* Temperature */}
//           <div className={`p-3 rounded-md ${checkVitalStatus('temperature') === 'orange' ? 'bg-orange-100' : 'bg-gray-100'}`}>
//             <div className="flex items-center mb-1">
//               <FaThermometerHalf className={`mr-1 ${checkVitalStatus('temperature') === 'orange' ? 'text-orange-500' : 'text-gray-600'}`} size={18} />
//               <label className="text-sm font-medium">Temperature</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 step="0.1"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.temperature}
//                 onChange={(e) => handleVitalChange('temperature', parseFloat(e.target.value))}
//               />
//               <span className="text-sm ml-2">°C</span>
//             </div>
//           </div>
          
//           {/* Weight */}
//           <div className="p-3 rounded-md bg-gray-100">
//             <div className="flex items-center mb-1">
//               <FaArrowDown className="mr-1 text-gray-600" size={18} />
//               <label className="text-sm font-medium">Weight</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.weight}
//                 onChange={(e) => handleVitalChange('weight', parseInt(e.target.value))}
//               />
//               <span className="text-sm ml-2">kg</span>
//             </div>
//           </div>
          
//           {/* Height */}
//           <div className="p-3 rounded-md bg-gray-100">
//             <div className="flex items-center mb-1">
//               <FaArrowUp className="mr-1 text-gray-600" size={18} />
//               <label className="text-sm font-medium">Height</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.height}
//                 onChange={(e) => handleVitalChange('height', parseInt(e.target.value))}
//               />
//               <span className="text-sm ml-2">cm</span>
//             </div>
//           </div>
          
//           {/* Oxygen Saturation */}
//           <div className={`p-3 rounded-md ${checkVitalStatus('oxygenSaturation') === 'red' ? 'bg-red-100' : 'bg-gray-100'}`}>
//             <div className="flex items-center mb-1">
//               <FaExclamationTriangle className={`mr-1 ${checkVitalStatus('oxygenSaturation') === 'red' ? 'text-red-500' : 'text-gray-600'}`} size={18} />
//               <label className="text-sm font-medium">O₂ Saturation</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 className="w-16 p-1 border rounded"
//                 value={triageData?.vitals.oxygenSaturation}
//                 onChange={(e) => handleVitalChange('oxygenSaturation', parseInt(e.target.value))}
//               />
//               <span className="text-sm ml-2">%</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Pain Scale */}
//       <div className="mb-6">
//         <h2 className="text-md font-semibold mb-3">Pain Assessment</h2>
//         <div className="flex items-center">
//           <span className="text-sm mr-2">0</span>
//           <input
//             type="range"
//             min="0"
//             max="10"
//             step="1"
//             value={triageData?.pain}
//             onChange={(e) => handlePainChange(parseInt(e.target.value))}
//             className="w-full"
//           />
//           <span className="text-sm ml-2">10</span>
//         </div>
//         <div className="flex justify-between mt-1">
//           <span className="text-xs text-green-500">No Pain</span>
//           <span className="text-xs text-yellow-500">Moderate</span>
//           <span className="text-xs text-red-500">Severe</span>
//         </div>
//         <div className="mt-2 text-center">
//           <span className="font-medium">Current Pain Level: {triageData?.pain}/10</span>
//         </div>
//       </div>
      
//       {/* Chief Complaint */}
//       <div className="mb-6">
//         <h2 className="text-md font-semibold mb-3">Chief Complaint</h2>
//         <div className="relative">
//           <input
//             type="text"
//             className="w-full p-3 border rounded"
//             placeholder="Enter chief complaint..."
//             value={triageData?.chiefComplaint}
//             onChange={handleComplaintChange}
//           />
          
//           {/* Suggestions */}
//           {suggestions.length > 0 && (
//             <div className="absolute z-10 bg-white border rounded mt-1 w-full shadow-lg">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="p-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => applySuggestion(suggestion)}
//                 >
//                   {suggestion}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Triage Color Assignment */}
//       <div className="mb-6">
//         <h2 className="text-md font-semibold mb-3">Triage Assessment</h2>
//         <div className="flex space-x-4">
//           <button
//             className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'green' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}
//             onClick={() => assignTriageColor('green')}
//           >
//             Normal
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'orange' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'}`}
//             onClick={() => assignTriageColor('orange')}
//           >
//             Abnormal
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${triageData?.triageColor === 'red' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'}`}
//             onClick={() => assignTriageColor('red')}
//           >
//             Urgent
//           </button>
//         </div>
//       </div>
      

//     </div>
//   );
// }
// );

// export default TriageForm;