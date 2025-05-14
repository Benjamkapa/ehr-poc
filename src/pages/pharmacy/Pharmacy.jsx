import React, { useState, useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';

const Pharmacy = () => {
  const [dispensedDrugs, setDispensedDrugs] = useState([]);
  const [editDispensedIndex, setEditDispensedIndex] = useState(null);
  const [editDispensedFormData, setEditDispensedFormData] = useState({
    drugName: '',
    quantity: '',
    instructions: '',
  });

  const [inventory, setInventory] = useState([
    { drugName: 'Amoxicillin', quantity: 120, expiryDate: '2025-09-01' },
    { drugName: 'ARVs', quantity: 90, expiryDate: '2024-12-31' },
    { drugName: 'Paracetamol', quantity: 30, expiryDate: '2024-06-30' },
  ]);
  const [editInventoryIndex, setEditInventoryIndex] = useState(null);
  const [editInventoryFormData, setEditInventoryFormData] = useState({
    drugName: '',
    quantity: '',
    expiryDate: '',
  });

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');

  // Initialize dispensed drugs from sessionStorage on page load
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("dispensedDrugs") || "[]");
    setDispensedDrugs(storedData);
  }, []);

  // Stock alert threshold
  const ALERT_THRESHOLD = 20;

  // Stock alert check - dynamic based on ALERT_THRESHOLD
  const lowStockItems = inventory.filter(item => item.quantity < ALERT_THRESHOLD);

  // Handle dispensing medication form submission
  const handleDispenseSubmit = (e) => {
    e.preventDefault();

    const drugName = e.target.drugName.value;
    const quantity = e.target.quantity.value;
    const instructions = e.target.instructions.value;

    const currentData = JSON.parse(sessionStorage.getItem("dispensedDrugs") || "[]");

    const newEntry = { drugName, quantity, instructions };
    const updatedData = [...currentData, newEntry];

    sessionStorage.setItem("dispensedDrugs", JSON.stringify(updatedData));
    setDispensedDrugs(updatedData); // update state for rendering
    e.target.reset(); // reset form after submission

    toast.success('Dispensation added successfully!');
  };

  // Delete dispensed drug entry
  const deleteDispensedDrug = (index) => {
    const updatedData = dispensedDrugs.filter((_, i) => i !== index);
    sessionStorage.setItem("dispensedDrugs", JSON.stringify(updatedData));
    setDispensedDrugs(updatedData);
    if (editDispensedIndex === index) {
      setEditDispensedIndex(null);
    }
  };

  // Start editing a dispensed drug entry
  const editDispensedDrug = (index) => {
    const drug = dispensedDrugs[index];
    setEditDispensedFormData({ ...drug });
    setEditDispensedIndex(index);
  };

  // Handle changes in dispensed drug edit form inputs
  const handleEditDispensedChange = (e) => {
    const { name, value } = e.target;
    setEditDispensedFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited dispensed drug entry
  const saveEditedDispensedDrug = (index) => {
    const updatedData = [...dispensedDrugs];
    updatedData[index] = editDispensedFormData;
    sessionStorage.setItem("dispensedDrugs", JSON.stringify(updatedData));
    setDispensedDrugs(updatedData);
    setEditDispensedIndex(null);
    toast.success('Dispensed drug updated successfully!');
  };

  // Cancel editing dispensed drug
  const cancelEditDispensed = () => {
    setEditDispensedIndex(null);
  };

  // Start editing an inventory item
  const editInventoryItem = (index) => {
    const item = inventory[index];
    setEditInventoryFormData({ ...item });
    setEditInventoryIndex(index);
  };

  // Handle changes in inventory edit form inputs
  const handleEditInventoryChange = (e) => {
    const { name, value } = e.target;
    setEditInventoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited inventory item
  const saveEditedInventoryItem = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory[index] = editInventoryFormData;
    setInventory(updatedInventory);
    setEditInventoryIndex(null);
    toast.success('Inventory item updated successfully!');
  };

  // Cancel editing inventory item
  const cancelEditInventory = () => {
    setEditInventoryIndex(null);
  };

  // Handle barcode input change
  const handleBarcodeChange = (e) => {
    setBarcodeInput(e.target.value);
  };

  // Handle barcode scan submit (simulate barcode scanning)
  const handleBarcodeScan = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    // For demo, just add a dispensed drug with barcodeInput as drugName
    const currentData = JSON.parse(sessionStorage.getItem("dispensedDrugs") || "[]");
    const newEntry = { drugName: barcodeInput.trim(), quantity: 1, instructions: '' };
    const updatedData = [...currentData, newEntry];
    sessionStorage.setItem("dispensedDrugs", JSON.stringify(updatedData));
    setDispensedDrugs(updatedData);
    setBarcodeInput('');
    toast.success(`Dispensed drug added for barcode: ${barcodeInput.trim()}`);
  };

  // Handle payment confirmation toggle
  const togglePaymentConfirmation = () => {
    setPaymentConfirmed(!paymentConfirmed);
    toast.success(`Payment ${!paymentConfirmed ? 'confirmed' : 'unconfirmed'}`);
  };

  // Placeholder for KEMSA reorder request
  const handleKEMSAReorder = () => {
    // Implement API integration here
    toast('KEMSA reorder request sent (simulated).');
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* Left Column: Main content */}
      <div className='col-span-2'>
        <h1 className='font-bold uppercase text-xl text-center mb-4'>Pharmacy</h1>

        {/* Stock Alerts */}
        {lowStockItems.length > 0 && (
          <section className='mb-6 mx-10 p-4 bg-yellow-100 border border-yellow-400 rounded'>
            <h2 className='font-semibold text-lg mb-2 text-yellow-800'>Stock Alerts</h2>
            <ul className='list-disc list-inside text-yellow-900'>
              {lowStockItems.map((item, idx) => (
                <li key={idx}>
                  {item.drugName} below threshold (Currently : {item.quantity})
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Prescription List from Clinical Module */}
        <section className='mx-5 px-5 rounded'>
          <h2 className='font-semibold text-lg mb-2'>Prescriptions</h2>
          <table className='w-full border table-auto bg-gray-100 shadow-lg'>
            <thead>
              <tr className='bg-slate-400'>
                <th className='p-2 border'>Drug Name</th>
                <th className='p-2 border'>Dosage</th>
                <th className='p-2 border'>Duration</th>
                <th className='p-2 border'>Route</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td className='p-2 border'>Paracetamol</td>
                <td className='p-2 border'>500mg</td>
                <td className='p-2 border'>5 days</td>
                <td className='p-2 border'>Oral</td>
              </tr>
              {/* Add more dummy prescription data here */}
            </tbody>
          </table>
        </section>

        {/* Inventory Table */}
        <section className='mx-5 px-5 my-5'>
          <h2 className='font-semibold text-lg mb-2'>Inventory</h2>
          <table className='w-full border table-auto bg-gray-100 shadow-lg'>
            <thead>
              <tr className='bg-slate-400'>
                <th className='p-2 border'>Drug Name</th>
                <th className='p-2 border'>Quantity</th>
                <th className='p-2 border'>Expiry Date</th>
                <th className='p-2 border'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className='text-center'>
                  {editInventoryIndex === index ? (
                    <>
                      <td className='p-2 border'>
                        <input
                          type='text'
                          name='drugName'
                          value={editInventoryFormData.drugName}
                          onChange={handleEditInventoryChange}
                          className='border p-1 w-full'
                        />
                      </td>
                      <td className='p-2 border'>
                        <input
                          type='number'
                          name='quantity'
                          value={editInventoryFormData.quantity}
                          onChange={handleEditInventoryChange}
                          className='border p-1 w-full'
                          min='0'
                        />
                      </td>
                      <td className='p-2 border'>
                        <input
                          type='date'
                          name='expiryDate'
                          value={editInventoryFormData.expiryDate}
                          onChange={handleEditInventoryChange}
                          className='border p-1 w-full'
                        />
                      </td>
                      <td className='p-2 border'>
                        <button
                          onClick={() => saveEditedInventoryItem(index)}
                          className='bg-green-600 text-white px-2 py-1 rounded mr-2'
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditInventory}
                          className='bg-gray-400 text-white px-2 py-1 rounded'
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className='p-2 border'>{item.drugName}</td>
                      <td className='p-2 border'>{item.quantity}</td>
                      <td className='p-2 border'>{item.expiryDate}</td>
                      <td className='p-2 border'>
                        <button
                          onClick={() => editInventoryItem(index)}
                          className='bg-blue-600 text-white px-2 py-1 rounded mr-2'
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className='mx-5 px-5 py-5'>
        {/* Adverse Reactions */}
        <section className='mb-6'>
          <h2 className='font-semibold text-lg mb-2'>Adverse Reactions</h2>
          <textarea
            className='border p-2 w-full rounded'
            rows='2'
            placeholder='Note any adverse drug reactions...'
          ></textarea>
        </section>

        {/* Payment Confirmation */}
        <section className='mb-6'>
          <h2 className='font-semibold text-lg mb-2'>Payment Confirmation</h2>
          <label className='inline-flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={paymentConfirmed}
              onChange={togglePaymentConfirmation}
              className='form-checkbox cursor-pointer'
            />
            <span>Confirm payment has been made</span>
          </label>
        </section>

        {/* Barcode Scanning */}
        <section className='mb-6'>
          <h2 className='font-semibold text-lg mb-2'>Barcode Scanning</h2>
          <form onSubmit={handleBarcodeScan} className='flex space-x-2'>
            <input
              type='text'
              value={barcodeInput}
              onChange={handleBarcodeChange}
              placeholder='Scan or enter barcode'
              className='border p-2 flex-grow rounded'
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500'
            >
              Add Dispensation
            </button>
          </form>
        </section>

        {/* KEMSA Reorder Request */}
        <section className='mb-6'>
          <h2 className='font-semibold text-lg mb-2'>KEMSA Reorder Request</h2>
          <button
            onClick={handleKEMSAReorder}
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500'
          >
            Send Reorder Request
          </button>
        </section>

        <div className='rounded shadow-lg bg-gray-100 pb-5'>

        {/* Dispense Form */}
        <section className='mb-6 mx-5'>
          <h2 className='font-semibold text-lg mb-2'>Dispense Medication</h2>
          <form onSubmit={handleDispenseSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              name='drugName'
              placeholder='Drug Name'
              className='border p-2 hover:shadow rounded'
              required
            />
            <input
              type='number'
              name='quantity'
              placeholder='Quantity Issued'
              className='border p-2 hover:shadow rounded'
              required
              min='1'
            />
            <input
              type='text'
              name='instructions'
              placeholder='Patient Instructions'
              className='border p-2 md:col-span-2 hover:shadow rounded'
            />
            <button
              type='submit'
              className='bg-blue-600 mx-auto text-white px-4 w-1/2 rounded-full py-2 hover:bg-blue-500 col-span-full'
            >
              Dispense
            </button>
          </form>
        </section>
        </div>
      </div>
      </div>

      {/* Right Column: Dispensed Drugs */}
      <div className='col-span-1 overflow-auto rounded px-5'>
        {dispensedDrugs.length > 0 && (
          <section className='mt-11 mx-8'>
            <h2 className='font-semibold text-lg mb-2'>Dispensed Drugs</h2>
            <table className='w-full border table-auto bg-gray-100 shadow-lg'>
              <thead>
                <tr className='text-center bg-slate-400'>
                  <th className='p-2 border'>Drug Name</th>
                  <th className='p-2 border'>Quantity</th>
                  <th className='p-2 border'>Instructions</th>
                  <th className='p-2 border'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {dispensedDrugs.map((item, index) => (
                  <tr key={index}>
                    {editDispensedIndex === index ? (
                      <>
                        <td className='p-2 border'>
                          <input
                            type='text'
                            name='drugName'
                            value={editDispensedFormData.drugName}
                            onChange={handleEditDispensedChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <input
                            type='number'
                            name='quantity'
                            value={editDispensedFormData.quantity}
                            onChange={handleEditDispensedChange}
                            className='border p-1 w-full'
                            min='1'
                          />
                        </td>
                        <td className='p-2 border'>
                          <input
                            type='text'
                            name='instructions'
                            value={editDispensedFormData.instructions}
                            onChange={handleEditDispensedChange}
                            className='border p-1 w-full'
                          />
                        </td>
                        <td className='p-2 border'>
                          <button
                            onClick={() => saveEditedDispensedDrug(index)}
                            className='bg-green-600 text-white px-2 py-1 rounded mr-2'
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditDispensed}
                            className='bg-gray-400 text-white px-2 py-1 rounded'
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className='p-2 border'>{item.drugName}</td>
                        <td className='p-2 border'>{item.quantity}</td>
                        <td className='p-2 border'>{item.instructions}</td>
                        <td className='p-2 border flex'>
                          <button
                            onClick={() => editDispensedDrug(index)}
                            className='hover:text-blue-600 px-2 py-1 rounded mr-2'
                          >
                           <BsPencilSquare className='inline' title='Edit'/>
                          </button>
                          <button
                            onClick={() => deleteDispensedDrug(index)}
                            className='hover:text-red-400 px-2 py-1 rounded'
                          >
                            <BsTrash3 className='inline' title='Delete'/>
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default Pharmacy;
