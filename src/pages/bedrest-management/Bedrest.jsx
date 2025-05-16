import { useState } from 'react';
import { 
  Calendar, 

  BedDouble, 
  FileText, 
  Users, 
  Clipboard, 
  AlertCircle, 
  Download, 
  ChevronDown,
  Check,
  Clock,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Main App Component
export default function HealthcareManagementSystem() {
  const [activeTab, setActiveTab] = useState('bedrest');
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Healthcare Management System</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md text-sm">
              <Users className="inline mr-1 h-4 w-4" />
              Admin
            </button>
            <span>Dr. Sarah Johnson</span>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="flex space-x-1 px-6">
          <button 
            className={`py-4 px-4 font-medium ${activeTab === 'bedrest' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('bedrest')}
          >
            <BedDouble className="inline mr-2 h-4 w-4" />
            Bedrest Management
          </button>
          <button 
            className={`py-4 px-4 font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText className="inline mr-2 h-4 w-4" />
            Reports
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {activeTab === 'bedrest' ? <BedrestManagement /> : <ReportsModule />}
      </main>
    </div>
  );
}

// Bedrest Management Component
function BedrestManagement() {
  const [selectedBed, setSelectedBed] = useState(null);
  const [showDischargeForm, setShowDischargeForm] = useState(false);
  
  const wards = [
    {
      id: 1,
      name: "General Ward",
      beds: [
        { id: 101, status: "occupied", patient: "John Doe", condition: "Stable", admissionDate: "12/05/2025", doctor: "Dr. Smith" },
        { id: 102, status: "free" },
        { id: 103, status: "occupied", patient: "Jane Smith", condition: "Improving", admissionDate: "14/05/2025", doctor: "Dr. Johnson" },
        { id: 104, status: "occupied", patient: "Robert Brown", condition: "Critical", admissionDate: "10/05/2025", doctor: "Dr. Smith" },
        { id: 105, status: "free" },
        { id: 106, status: "occupied", patient: "Mary Williams", condition: "Stable", admissionDate: "09/05/2025", doctor: "Dr. Williams" },
      ]
    },
    {
      id: 2,
      name: "Pediatric Ward",
      beds: [
        { id: 201, status: "free" },
        { id: 202, status: "occupied", patient: "Alice Johnson", condition: "Stable", admissionDate: "11/05/2025", doctor: "Dr. Garcia" },
        { id: 203, status: "occupied", patient: "Tommy Lee", condition: "Improving", admissionDate: "13/05/2025", doctor: "Dr. Chen" },
        { id: 204, status: "free" },
      ]
    },
    {
      id: 3,
      name: "ICU",
      beds: [
        { id: 301, status: "occupied", patient: "Samuel Green", condition: "Critical", admissionDate: "08/05/2025", doctor: "Dr. Wilson" },
        { id: 302, status: "occupied", patient: "Elizabeth Taylor", condition: "Critical", admissionDate: "07/05/2025", doctor: "Dr. Martinez" },
        { id: 303, status: "free" },
      ]
    }
  ];
  
  const handleBedClick = (bed) => {
    setSelectedBed(bed);
    setShowDischargeForm(false);
  };
  
  return (
    <div className="flex h-full space-x-4">
      {/* Left panel - Bed allocation map */}
      <div className="w-2/3 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Bed Allocation Map</h2>
          <div className="flex items-center text-sm">
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Available
            </span>
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Occupied
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> Reserved
            </span>
          </div>
        </div>
        
        <div className="space-y-6">
          {wards.map((ward) => (
            <div key={ward.id} className="border rounded-md p-4">
              <h3 className="font-medium mb-3">{ward.name}</h3>
              <div className="grid grid-cols-6 gap-3">
                {ward.beds.map((bed) => (
                  <div 
                    key={bed.id}
                    className={`
                      border p-2 rounded-md cursor-pointer flex flex-col items-center
                      ${bed.status === 'free' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}
                      ${selectedBed?.id === bed.id ? 'ring-2 ring-blue-500' : ''}
                    `}
                    onClick={() => handleBedClick(bed)}
                  >
                    <BedDouble className={`mb-1 ${bed.status === 'free' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className="text-xs font-medium">Bed {bed.id}</span>
                    {bed.status === 'occupied' && (
                      <span className="text-xs truncate w-full text-center">{bed.patient}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between">
          <div>
            <span className="text-sm font-medium mr-2">Total Beds: 13</span>
            <span className="text-sm font-medium mr-2">Occupied: 8</span>
            <span className="text-sm font-medium">Available: 5</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            <AlertCircle className="inline mr-1 h-4 w-4" />
            Bed Alerts (2)
          </button>
        </div>
      </div>
      
      {/* Right panel - Patient details */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-y-auto">
        {selectedBed ? (
          <>
            {!showDischargeForm ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Bed {selectedBed.id} Details</h2>
                  {selectedBed.status === 'occupied' && (
                    <div className="flex space-x-2">
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setShowDischargeForm(true)}
                      >
                        Discharge
                      </button>
                    </div>
                  )}
                </div>
                
                {selectedBed.status === 'free' ? (
                  <div className="text-center py-8">
                    <BedDouble className="mx-auto mb-2 text-green-600 h-12 w-12" />
                    <h3 className="text-lg font-medium">Bed {selectedBed.id} is available</h3>
                    <p className="text-gray-600 mb-4">This bed is ready for new patient allocation</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                      Assign Patient
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="border-b pb-3 mb-3">
                      <h3 className="font-medium">{selectedBed.patient}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Admission Date: {selectedBed.admissionDate}</div>
                        <div>Doctor: {selectedBed.doctor}</div>
                        <div className="mt-1">
                          Condition: 
                          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${selectedBed.condition === 'Critical' ? 'bg-red-100 text-red-800' : 
                            selectedBed.condition === 'Stable' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                          >
                            {selectedBed.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ward Round Notes */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Ward Round Notes</h4>
                      <textarea
                        className="w-full border rounded-md p-2 text-sm"
                        rows="4"
                        placeholder="Enter daily patient updates here..."
                        defaultValue="Patient vitals stable. Continuing current treatment plan. Pain level reduced from yesterday."
                      ></textarea>
                      <div className="flex justify-end mt-1">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          Save Notes
                        </button>
                      </div>
                    </div>
                    
                    {/* Patient Timeline */}
                    <div>
                      <h4 className="font-medium mb-2">Patient Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">15 May, 9:30 AM</div>
                            <div>Medication administered - Amoxicillin 500mg</div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">14 May, 2:15 PM</div>
                            <div>Lab results received - Blood count normal</div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-2 mt-0.5">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-xs text-gray-500">14 May, 8:00 AM</div>
                            <div>Ward round - Dr. Smith noted improvement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DischargeForm bed={selectedBed} onCancel={() => setShowDischargeForm(false)} />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto mb-3 text-gray-400 h-12 w-12" />
            <h3 className="text-lg font-medium text-gray-600">No Bed Selected</h3>
            <p className="text-gray-500">Select a bed from the map to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Discharge Form Component
function DischargeForm({ bed, onCancel }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discharge Summary</h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mb-3">
        <div className="font-medium">{bed.patient}</div>
        <div className="text-sm text-gray-600">Bed {bed.id} • Admitted on {bed.admissionDate}</div>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Diagnosis</label>
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows="2"
            placeholder="Final diagnosis"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Medications</label>
          <div className="border rounded-md p-2 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Amoxicillin 500mg</div>
                <div className="text-xs text-gray-500">1 tab TID for 7 days</div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Paracetamol 500mg</div>
                <div className="text-xs text-gray-500">1 tab QID PRN for pain</div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">+ Add Medication</button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Follow-up Plan</label>
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows="2"
            placeholder="Follow-up instructions"
          ></textarea>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Discharge Checklist</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Patient educated on medication regimen</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Follow-up appointment scheduled</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Prescriptions provided</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-sm">Insurance documentation completed</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Complete Discharge
          </button>
        </div>
      </form>
    </div>
  );
}

// Reports Module Component
function ReportsModule() {
  const [selectedReport, setSelectedReport] = useState('moh731');
  const [dateRange, setDateRange] = useState('month');
  
  return (
    <div className="h-full">
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-2 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Report Generator</h2>
            <div className="flex space-x-2">
              <select 
                className="border rounded-md px-3 py-2"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="moh731">MOH 731 (HIV)</option>
                <option value="moh405">MOH 405 (Outpatient)</option>
                <option value="revenue">Financial Report</option>
                <option value="disease">Disease Trends</option>
                <option value="custom">Custom Report</option>
              </select>
              
              <select 
                className="border rounded-md px-3 py-2"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              PDF
            </button>
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              Excel
            </button>
            <button className="flex items-center border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              KHIS Format
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow p-4 h-4/5 overflow-auto">
        {selectedReport === 'moh731' && <HIVReport />}
        {selectedReport === 'moh405' && <OutpatientReport />}
        {selectedReport === 'revenue' && <FinancialReport />}
        {selectedReport === 'disease' && <DiseaseReport />}
      </div>
      
      {/* Schedule Reports */}
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Scheduled Reports</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">+ Schedule New Report</button>
        </div>
        <div className="mt-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>MOH 731 Report</span>
            </div>
            <div className="text-gray-500">Monthly • Next: 01/06/2025</div>
          </div>
          <div className="flex justify-between py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Financial Summary</span>
            </div>
            <div className="text-gray-500">Weekly • Next: 23/05/2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// HIV Report Component
function HIVReport() {
  const mohData = {
    testing: {
      title: "HIV Testing & Counselling",
      data: [
        { category: "Tested", count: 487 },
        { category: "Positive", count: 42 },
        { category: "Linked to Care", count: 39 }
      ]
    },
    care: {
      title: "HIV Care",
      data: [
        { category: "New Enrollments", count: 39 },
        { category: "Currently in Care", count: 875 },
        { category: "On ART", count: 865 },
        { category: "Viral Load Suppressed", count: 810 }
      ]
    },
    pmtct: {
      title: "PMTCT",
      data: [
        { category: "Pregnant Women Tested", count: 112 },
        { category: "Positive", count: 8 },
        { category: "On ART", count: 8 },
        { category: "Infants Tested", count: 7 }
      ]
    }
  };
  
  const data = [
    { name: 'Apr', tested: 450, positive: 39, enrolled: 37 },
    { name: 'May', tested: 487, positive: 42, enrolled: 39 },
    { name: 'Jun', tested: 423, positive: 35, enrolled: 33 },
    { name: 'Jul', tested: 465, positive: 40, enrolled: 38 },
    { name: 'Aug', tested: 478, positive: 45, enrolled: 42 },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">MOH 731 - HIV/AIDS Program Report</h2>
        <div className="text-sm text-gray-600">Reporting Period: April 16 - May 15, 2025</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.values(mohData).map((section, index) => (
          <div key={index} className="border rounded-md p-4">
            <h3 className="font-medium mb-2">{section.title}</h3>
            <div className="space-y-2">
              {section.data.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm">{item.category}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">HIV Testing & Enrollment Trends</h3>
        <div className="h-64 w-full">
          {/* <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <BarChart />
            <div className="text-center text-xs text-gray-500 mt-2">
              Chart: Monthly HIV testing, positive cases, and enrollment trends
            </div>
          </BarChart> */}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Facility Performance Indicators</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">HIV Testing Rate</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">487</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">97%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Linkage to Care</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">95%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">93%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">98%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Viral Load Suppression</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">90%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">94%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">104%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">PMTCT Coverage</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Outpatient Report Component
function OutpatientReport() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">MOH 405 - Outpatient Summary Report</h2>
        <div className="text-sm text-gray-600">Reporting Period: April 16 - May 15, 2025</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Patients</div>
            <div className="text-xl font-semibold">1,892</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">New Patients</div>
            <div className="text-xl font-semibold">347</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Referrals</div>
            <div className="text-xl font-semibold">62</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-purple-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Avg. Wait Time</div>
            <div className="text-xl font-semibold">24 min</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Top 10 Diagnoses</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Upper Respiratory Infection</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">286</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">15.1%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Malaria</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">204</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">10.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Diarrhea</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">187</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">9.9%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Hypertension</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">156</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">8.2%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Diabetes</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">142</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">7.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Pneumonia</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">98</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">5.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Patient Demographics</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-xs w-16">0-5 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    <span className="text-xs font-medium">22%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">6-18 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <span className="text-xs font-medium">18%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">19-35 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-xs font-medium">30%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">36-50 yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                    <span className="text-xs font-medium">17%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-16">51+ yrs</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '13%' }}></div>
                    </div>
                    <span className="text-xs font-medium">13%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Gender</h4>
                <div className="flex flex-col items-center justify-center h-32">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Male (46%)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                    <span className="text-xs">Female (54%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Daily Patient Flow</h3>
        <div className="border rounded-md p-4 h-64">
          {/* <BarChart width={500} height={300} data={[
            { day: 'Mon', patients: 98 },
            { day: 'Tue', patients: 87 },
            { day: 'Wed', patients: 95 },
            { day: 'Thu', patients: 102 },
            { day: 'Fri', patients: 120 },
            { day: 'Sat', patients: 75 },
            { day: 'Sun', patients: 45 }
          ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="day" />
            <YAxis />
            <BarChart />
          </BarChart> */}
        </div>
      </div>
    </div>
  );
}

// Financial Report Component
function FinancialReport() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Financial Report</h2>
        <div className="text-sm text-gray-600">Reporting Period: April 16 - May 15, 2025</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-xl font-semibold">KSh 2.4M</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Expenses</div>
            <div className="text-xl font-semibold">KSh 1.8M</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Net Profit</div>
            <div className="text-xl font-semibold">KSh 600K</div>
          </div>
        </div>
        <div className="border rounded-md p-4 flex items-center">
          <div className="mr-4 bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Profit Margin</div>
            <div className="text-xl font-semibold">25%</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Revenue by Department</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Outpatient</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">KSh 850K</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">35.4%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Inpatient</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">KSh 620K</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">25.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Laboratory</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">KSh 450K</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">18.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Pharmacy</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">KSh 360K</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">15.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Radiology</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">KSh 120K</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">5.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Expense Breakdown</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Salaries & Wages</span>
                  <span className="text-sm font-medium">KSh 950K (52.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52.7%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Medical Supplies</span>
                  <span className="text-sm font-medium">KSh 420K (23.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23.3%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Utilities</span>
                  <span className="text-sm font-medium">KSh 180K (10.0%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10.0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Maintenance</span>
                  <span className="text-sm font-medium">KSh 150K (8.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '8.3%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Other Expenses</span>
                  <span className="text-sm font-medium">KSh 100K (5.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '5.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Revenue vs. Expenses (Monthly)</h3>
        <div className="border rounded-md p-4 h-64">
          {/* <BarChart width={500} height={300} data={[
            { month: 'Jan', revenue: 2100000, expenses: 1650000 },
            { month: 'Feb', revenue: 2250000, expenses: 1680000 },
            { month: 'Mar', revenue: 2350000, expenses: 1750000 },
            { month: 'Apr', revenue: 2400000, expenses: 1800000 },
            { month: 'May', revenue: 2400000, expenses: 1800000 }
          ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <BarChart />
          </BarChart> */}
        </div>
      </div>
    </div>
  );
}

// Disease Report Component
function DiseaseReport() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Disease Trend Report</h2>
        <div className="text-sm text-gray-600">Reporting Period: April 16 - May 15, 2025</div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Common Diagnoses Trend</h3>
          <div className="border rounded-md p-4 h-64">
            {/* <BarChart width={500} height={300} data={[
              { name: 'URI', prev: 274, current: 286 },
              { name: 'Malaria', prev: 187, current: 204 },
              { name: 'Diarrhea', prev: 165, current: 187 },
              { name: 'HTN', prev: 142, current: 156 },
              { name: 'Diabetes', prev: 138, current: 142 }
            ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <BarChart />
            </BarChart> */}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Malaria Cases by Age Group</h3>
          <div className="border rounded-md p-4 h-64">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">0-5 years</span>
                  <span className="text-sm font-medium">68 (33.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '33.3%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">6-14 years</span>
                  <span className="text-sm font-medium">42 (20.6%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '20.6%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">15-24 years</span>
                  <span className="text-sm font-medium">30 (14.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '14.7%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">25-45 years</span>
                  <span className="text-sm font-medium">45 (22.1%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '22.1%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">46+ years</span>
                  <span className="text-sm font-medium">19 (9.3%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '9.3%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-3">Disease Distribution by Location</h3>
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Diagnosis</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cases</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Kibera</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Malaria</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">87</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Westlands</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Hypertension</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">58</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Eastleigh</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Diarrhea</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">52</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Karen</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Diabetes</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">45</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Githurai</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">URI</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Notifiable Diseases</h3>
          <div className="border rounded-md p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Tuberculosis</div>
                  <div className="text-xs text-gray-600">12 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Report to MOH</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Typhoid</div>
                  <div className="text-xs text-gray-600">5 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Report to MOH</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Cholera</div>
                  <div className="text-xs text-gray-600">0 new cases</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">No cases</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Measles</div>
                  <div className="text-xs text-gray-600">2 new cases</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Report to MOH</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Polio</div>
                  <div className="text-xs text-gray-600">0 new cases</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">No cases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Disease Outbreak Monitoring</h3>
        <div className="border rounded-md p-4">
          <div className="flex justify-between mb-3">
            <div>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Alert</span>
              <span className="ml-2 font-medium">Diarrheal Disease Increase</span>
            </div>
            <span className="text-sm text-gray-600">Last 7 days: +32% cases</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">187 cases reported in the last 30 days, with significant increase in Eastleigh area. Potential outbreak investigation recommended.</p>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Generate Alert Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}