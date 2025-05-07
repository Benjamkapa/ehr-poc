import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import {BiPencil, BiSolidEdit} from 'react-icons/bi';
import {BsPencilSquare, BsTrash3} from 'react-icons/bs';

const commonTests = [
  'Complete Blood Count (CBC)',
  'Malaria Smear',
  'CD4 Count',
  'Blood Glucose',
  'Urinalysis',
  'Liver Function Test',
  'Kidney Function Test',
  'HIV Viral Load',
  'Pregnancy Test',
  // Add more tests as needed
];

const Laboratory = () => {
  const [testOrders, setTestOrders] = useState([]);
  const [testResults, setTestResults] = useState(() => {
    const storedResults = sessionStorage.getItem('testResults');
    return storedResults ? JSON.parse(storedResults) : [];
  });
  const [newOrder, setNewOrder] = useState('');
  const [resultEntry, setResultEntry] = useState({
    testName: '',
    resultValue: '',
    normalRange: '',
    criticalLow: '',
    criticalHigh: '',
  });
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed

  // State for editing test results
  const [editResultIndex, setEditResultIndex] = useState(null);
  const [editResultFormData, setEditResultFormData] = useState({
    testName: '',
    resultValue: '',
    normalRange: '',
    criticalLow: '',
    criticalHigh: '',
  });

  // Persist testResults to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('testResults', JSON.stringify(testResults));
  }, [testResults]);

  // Add new test order
  const addTestOrder = (e) => {
    e.preventDefault();
    if (!newOrder) {
      toast.error('Please select a test to order');
      return;
    }
    const order = {
      id: Date.now(),
      testName: newOrder,
      status: 'pending',
      orderedAt: new Date().toLocaleString(),
    };
    setTestOrders([...testOrders, order]);
    setNewOrder('');
    toast.success(`Test order for "${newOrder}" added`);
  };

  // Handle result input change
  const handleResultChange = (e) => {
    const { name, value } = e.target;
    setResultEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Save test result
  const saveTestResult = (e) => {
    e.preventDefault();
    if (!resultEntry.testName || !resultEntry.resultValue) {
      toast.error('Please fill in test name and result value');
      return;
    }
    const result = {
      id: Date.now(),
      ...resultEntry,
      enteredAt: new Date().toLocaleString(),
    };
    setTestResults([...testResults, result]);
    // Mark order as completed if exists
    setTestOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.testName === resultEntry.testName && order.status === 'pending'
          ? { ...order, status: 'completed' }
          : order
      )
    );
    setResultEntry({
      testName: '',
      resultValue: '',
      normalRange: '',
      criticalLow: '',
      criticalHigh: '',
    });
    toast.success('Test result saved');
  };

  // Filtered test orders based on filterStatus
  const filteredOrders = testOrders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  // Check for critical values and alert
  const isCritical = (result) => {
    const val = parseFloat(result.resultValue);
    const low = parseFloat(result.criticalLow);
    const high = parseFloat(result.criticalHigh);
    if (!isNaN(low) && val < low) return true;
    if (!isNaN(high) && val > high) return true;
    return false;
  };

  // Notify clinician for critical results (placeholder)
  const notifyClinician = (result) => {
    toast(`Clinician notified for critical result: ${result.testName}`);
  };

  // Start editing a test result
  const editTestResult = (index) => {
    const result = testResults[index];
    setEditResultFormData({ ...result });
    setEditResultIndex(index);
  };

  // Handle changes in edit form inputs
  const handleEditResultChange = (e) => {
    const { name, value } = e.target;
    setEditResultFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited test result
  const saveEditedTestResult = (index) => {
    const updatedResults = [...testResults];
    updatedResults[index] = editResultFormData;
    setTestResults(updatedResults);
    setEditResultIndex(null);
    toast.success('Test result updated successfully!');
  };

  // Cancel editing test result
  const cancelEditResult = () => {
    setEditResultIndex(null);
  };

  // Delete test result
  const deleteTestResult = (index) => {
    const updatedResults = testResults.filter((_, i) => i !== index);
    setTestResults(updatedResults);
    if (editResultIndex === index) {
      setEditResultIndex(null);
    }
    toast.success('Test result deleted successfully!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2 px-10">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">Laboratory</h1>

        {/* Test Order Form */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4">Order Test</h2>
          <form onSubmit={addTestOrder} className="flex space-x-4 items-center">
            <select
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
              className="border p-2 rounded flex-grow"
            >
              <option value="">Select a test</option>
              {commonTests.map((test, idx) => (
                <option key={idx} value={test}>
                  {test}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Add Order
            </button>
          </form>
        </section>

        {/* Test Orders Table */}
        <section className="mb-8">
          <h2 className="font-semibold mb-4">Test Orders</h2>
          <div className="mb-2">
            <label className="mr-4">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filterStatus === 'all'}
                onChange={() => setFilterStatus('all')}
              />{' '}
              All
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="filter"
                value="pending"
                checked={filterStatus === 'pending'}
                onChange={() => setFilterStatus('pending')}
              />{' '}
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                value="completed"
                checked={filterStatus === 'completed'}
                onChange={() => setFilterStatus('completed')}
              />{' '}
              Completed
            </label>
          </div>
          <table className="w-full border table-auto shadow-lg bg-gray-100">
            <thead>
              <tr className="bg-slate-400">
                <th className="p-2 border">Test Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No test orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="p-2 border">{order.testName}</td>
                    <td className="p-2 border capitalize">{order.status}</td>
                    <td className="p-2 border">{order.orderedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Test Result Entry */}
        <section className="mb-8 border p-4 rounded shadow-lg bg-gray-100">
          <h2 className="font-semibold mb-4">Enter Test Result</h2>
          <form onSubmit={saveTestResult} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="testName"
              value={resultEntry.testName}
              onChange={handleResultChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select test</option>
              {commonTests.map((test, idx) => (
                <option key={idx} value={test}>
                  {test}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="resultValue"
              placeholder="Result Value"
              value={resultEntry.resultValue}
              onChange={handleResultChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="normalRange"
              placeholder="Normal Range (e.g., 4.5-11.0)"
              value={resultEntry.normalRange}
              onChange={handleResultChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="criticalLow"
              placeholder="Critical Low Value"
              value={resultEntry.criticalLow}
              onChange={handleResultChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="criticalHigh"
              placeholder="Critical High Value"
              value={resultEntry.criticalHigh}
              onChange={handleResultChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 w-1/2 mx-auto rounded-full col-span-full hover:bg-green-500"
            >
              Save Result
            </button>
          </form>
        </section>
      </div>

      {/* Test Results History flexed to the right */}
      <section className="w-96 flex-shrink-0 ml-8 py-12">
        <h2 className="font-semibold mb-4">Test Results History</h2>
        <table className="w-full border shadow-lg bg-gray-100 table-auto">
          <thead>
            <tr className="bg-slate-400">
              <th className="p-2 border">Test Name</th>
              <th className="p-2 border">Result Value</th>
              <th className="p-2 border">Normal Range</th>
              <th className="p-2 border">Entered At</th>
              <th className="p-2 border">Critical Alert</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testResults.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No test results entered.
                </td>
              </tr>
            ) : (
              testResults.map((result, index) => {
                const val = parseFloat(result.resultValue);
                const low = parseFloat(result.criticalLow);
                const high = parseFloat(result.criticalHigh);
                const critical =
                  (!isNaN(low) && val < low) || (!isNaN(high) && val > high);
                if (editResultIndex === index) {
                  return (
                    <tr key={result.id} className={critical ? 'bg-red-100 font-bold' : ''}>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name="testName"
                          value={editResultFormData.testName}
                          onChange={handleEditResultChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name="resultValue"
                          value={editResultFormData.resultValue}
                          onChange={handleEditResultChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name="normalRange"
                          value={editResultFormData.normalRange}
                          onChange={handleEditResultChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="p-2 border">{editResultFormData.enteredAt}</td>
                      <td className="p-2 border">{critical ? 'Yes' : 'No'}</td>
                      <td className="p-2 border flex space-x-2">
                        <button
                          onClick={() => saveEditedTestResult(index)}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditResult}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={result.id} className={critical ? 'bg-red-100 font-bold' : ''}>
                    <td className="p-2 border">{result.testName}</td>
                    <td className="p-2 border">{result.resultValue}</td>
                    <td className="p-2 border">{result.normalRange}</td>
                    <td className="p-2 border">{result.enteredAt}</td>
                    <td className="p-2 border">{critical ? 'Yes' : 'No'}</td>
                    <td className="p-2 border flex space-x-2">
                      {critical && (
                        <button
                          onClick={() => notifyClinician(result)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                        >
                          Notify Clinician
                        </button>
                      )}
                      <button
                        onClick={() => editTestResult(index)}
                        className="hover:text-blue-700 px-2 py-1 rounded"
                      >
                        
                        <BsPencilSquare className='inline' title='Edit'/>
                      </button>
                      <button
                        onClick={() => deleteTestResult(index)}
                        className="hover:text-red-700 px-2 py-1 rounded"
                      >
                        <BsTrash3 className='inline' title='Delete'/>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      <Toaster />
    </div>
  );
};

export default Laboratory;
