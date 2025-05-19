import { useState, useEffect } from "react";
import {
  Search,
  Save,
  Upload,
  Mic,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  RefreshCw,
} from "lucide-react";

// Sample patient data
const samplePatients = [
  {
    id: "12345678",
    name: "John Doe",
    dob: "1985-05-15",
    gender: "Male",
    phone: "0712345678",
    email: "john.doe@example.com",
    address: "123 Main St, Nairobi",
    nationalId: "12345678",
    nhifNumber: "NHIF12345",
    photo: null,
    emergencyContact: {
      name: "Jane Doe",
      phone: "0723456789",
    },
    allergies: [
      {
        id: 1,
        type: "Penicillin",
        severity: "Severe",
        reaction: "Anaphylaxis",
      },
      { id: 2, type: "Pollen", severity: "Moderate", reaction: "Rhinitis" },
    ],
    conditions: [
      {
        id: 1,
        condition: "Hypertension",
        diagnosed: "2020-05-15",
        status: "Active",
      },
      {
        id: 2,
        condition: "Type 2 Diabetes",
        diagnosed: "2018-11-10",
        status: "Active",
      },
    ],
    visits: [
      {
        id: 1,
        date: "2025-05-10",
        type: "General Medical Checkup",
        summary:
          "Blood pressure check. Prescribed losartan for hypertension management.",
        isRecent: true,
        soap: {
          subjective:
            "Patient reports occasional headaches and dizziness. No chest pain.",
          objective: "BP: 145/90, Pulse: 72, Weight: 85kg, BMI: 28.4",
          assessment: "Hypertension - poorly controlled",
          plan: "Increase losartan to 100mg daily. Review in 2 weeks.",
        },
        diagnoses: [
          { code: "I10", description: "Essential (primary) hypertension" },
        ],
        prescriptions: [
          {
            medication: "Losartan",
            dosage: "100mg",
            frequency: "Once daily",
            duration: "30 days",
          },
        ],
      },
      {
        id: 2,
        date: "2025-03-15",
        type: "Diabetes Follow-up",
        summary: "HbA1c test: 7.2%. Continued metformin therapy.",
        isRecent: false,
        soap: {
          subjective: "No new complaints. Maintaining diet restrictions.",
          objective: "BP: 138/85, Pulse: 70, Weight: 86kg, HbA1c: 7.2%",
          assessment: "Type 2 Diabetes - moderately controlled",
          plan: "Continue current medications. Review in 3 months.",
        },
        diagnoses: [
          {
            code: "E11.9",
            description: "Type 2 diabetes mellitus without complications",
          },
        ],
        prescriptions: [
          {
            medication: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: "90 days",
          },
        ],
      },
      {
        id: 3,
        date: "2025-01-20",
        type: "Common Cold",
        summary:
          "Symptoms of cold. Prescribed rest and increased fluid intake.",
        isRecent: false,
        soap: {
          subjective: "Runny nose, sore throat, and mild cough for 3 days.",
          objective:
            "Temp: 37.2°C, BP: 130/82, Pulse: 75, Throat: mild erythema",
          assessment: "Common cold/Upper respiratory infection",
          plan: "Rest, increase fluids. Paracetamol for symptomatic relief.",
        },
        diagnoses: [
          { code: "J00", description: "Acute nasopharyngitis [common cold]" },
        ],
        prescriptions: [
          {
            medication: "Paracetamol",
            dosage: "500mg",
            frequency: "As needed, up to 4 times daily",
            duration: "5 days",
          },
        ],
      },
    ],
  },
  {
    id: "87654321",
    name: "Jane Smith",
    dob: "1990-11-20",
    gender: "Female",
    phone: "0723456789",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Mombasa",
    nationalId: "87654321",
    nhifNumber: "NHIF54321",
    photo: null,
    emergencyContact: {
      name: "John Smith",
      phone: "0734567890",
    },
    allergies: [
      {
        id: 1,
        type: "NSAIDs",
        severity: "Moderate",
        reaction: "Rash and hives",
      },
    ],
    conditions: [
      { id: 1, condition: "Asthma", diagnosed: "2015-03-22", status: "Active" },
      { id: 2, condition: "HIV", diagnosed: "2019-07-14", status: "Active" },
    ],
    visits: [
      {
        id: 1,
        date: "2025-04-25",
        type: "HIV Management",
        summary:
          "CD4 count 650. Viral load undetectable. Continue current ART regimen.",
        isRecent: true,
        soap: {
          subjective: "No new complaints. Medication adherence good.",
          objective:
            "CD4: 650, Viral Load: <20 copies/ml, BP: 120/75, Weight: 60kg",
          assessment: "HIV - well controlled on current regimen",
          plan: "Continue current ART. Next viral load in 6 months.",
        },
        diagnoses: [{ code: "B20", description: "HIV disease" }],
        prescriptions: [
          {
            medication: "Dolutegravir/Lamivudine/Tenofovir",
            dosage: "50/300/300mg",
            frequency: "Once daily",
            duration: "90 days",
          },
        ],
      },
      {
        id: 2,
        date: "2025-02-10",
        type: "Asthma Review",
        summary: "Mild exacerbation in past month. Adjusted inhaler technique.",
        isRecent: false,
        soap: {
          subjective:
            "Reports increasing use of rescue inhaler during cold weather.",
          objective:
            "Lung sounds: scattered wheezes on exhalation, PEF: 85% predicted",
          assessment: "Mild persistent asthma - seasonal exacerbation",
          plan: "Continue maintenance inhaler. Add rescue inhaler as needed.",
        },
        diagnoses: [
          {
            code: "J45.30",
            description: "Mild persistent asthma, uncomplicated",
          },
        ],
        prescriptions: [
          {
            medication: "Fluticasone/Salmeterol",
            dosage: "250/50mcg",
            frequency: "Twice daily",
            duration: "60 days",
          },
          {
            medication: "Salbutamol",
            dosage: "100mcg",
            frequency: "As needed",
            duration: "60 days",
          },
        ],
      },
    ],
  },
];

// Template definitions
const clinicalTemplates = {
  hiv: {
    name: "HIV Treatment Protocol",
    soap: {
      subjective:
        "Ask about: medication adherence, new symptoms, opportunistic infections, mental health status.",
      objective:
        "Vital signs, weight change, physical exam focused on opportunistic infections, CD4 count, viral load.",
      assessment:
        "HIV status (controlled/uncontrolled), treatment efficacy, complications if any.",
      plan: "ART regimen, prophylaxis if needed, follow-up schedule, adherence counseling.",
    },
    commonDiagnoses: ["B20", "B22.7", "B23.8"],
    commonMedications: ["Dolutegravir", "Lamivudine", "Tenofovir", "Efavirenz"],
  },
  tb: {
    name: "TB Assessment and Treatment",
    soap: {
      subjective:
        "Cough duration, hemoptysis, night sweats, weight loss, fever, contact history.",
      objective:
        "Vital signs, weight, lung examination, sputum results, chest X-ray findings.",
      assessment:
        "TB diagnosis (pulmonary/extrapulmonary), HIV co-infection status, treatment category.",
      plan: "Anti-TB regimen, monitoring schedule, contact tracing, nutritional support.",
    },
    commonDiagnoses: ["A15.0", "A15.3", "A19.9"],
    commonMedications: [
      "Rifampicin",
      "Isoniazid",
      "Pyrazinamide",
      "Ethambutol",
    ],
  },
  anc: {
    name: "Antenatal Care Visit",
    soap: {
      subjective:
        "Pregnancy symptoms, fetal movement, danger signs, medication adherence.",
      objective:
        "BP, weight, fundal height, fetal heart rate, edema assessment, lab results.",
      assessment:
        "Gestational age, pregnancy risk category, any complications.",
      plan: "Supplements, vaccines, screening tests, next visit schedule, delivery planning.",
    },
    commonDiagnoses: ["Z34.0", "O24.4", "O13"],
    commonMedications: ["Ferrous Sulfate", "Folic Acid", "Calcium"],
  },
  diabetes: {
    name: "Diabetes Management",
    soap: {
      subjective:
        "Symptoms of hypo/hyperglycemia, diet adherence, home glucose monitoring results.",
      objective:
        "Weight, BP, foot exam, HbA1c, lipid profile, kidney function tests.",
      assessment: "Diabetes control status, presence of complications.",
      plan: "Medication adjustments, lifestyle modifications, monitoring schedule, specialist referrals if needed.",
    },
    commonDiagnoses: ["E11.9", "E11.40", "E11.51"],
    commonMedications: ["Metformin", "Glibenclamide", "Insulin"],
  },
};

// Main Application Component
export default function MedicalRecordApp() {
  const [activeTab, setActiveTab] = useState("medicalRecord");
  const [activeMedicalSubTab, setActiveMedicalSubTab] = useState("history");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("idle"); // idle, saving, saved
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    patientInfo: true,
    clinicalInfo: true,
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({});

  // Load patient data when selected
  useEffect(() => {
    if (selectedPatient) {
      // Pre-fill form with patient data
      setFormData({
        name: selectedPatient.name,
        dob: selectedPatient.dob,
        gender: selectedPatient.gender,
        phone: selectedPatient.phone,
        email: selectedPatient.email,
        address: selectedPatient.address,
        nationalId: selectedPatient.nationalId,
        nhifNumber: selectedPatient.nhifNumber,
        upi: selectedPatient.id,
        emergencyContactName: selectedPatient.emergencyContact?.name || "",
        emergencyContactPhone: selectedPatient.emergencyContact?.phone || "",
      });

      // Automatically trigger auto-save
      triggerAutoSave();
    }
  }, [selectedPatient]);

  // Apply a clinical template
  const applyTemplate = (templateKey) => {
    const template = clinicalTemplates[templateKey];
    if (template) {
      // Pre-fill the SOAP note with template content
      setTemplateApplied(template);

      // Switch to encounter tab to show the template
      setActiveMedicalSubTab("encounter");

      // Close template menu
      setShowTemplateMenu(false);

      // Show notification
      setNotification({
        visible: true,
        message: `Applied ${template.name} template`,
        type: "success",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ visible: false });
      }, 3000);
    }
  };

  // Handle patient selection
  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setIsSearchOpen(false);

    // Show notification
    setNotification({
      visible: true,
      message: `Patient ${patient.name} loaded successfully`,
      type: "success",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ visible: false });
    }, 3000);
  };

  // Auto-save functionality
  const triggerAutoSave = () => {
    setAutoSaveStatus("saving");

    // Simulate save operation finishing after 1 second
    setTimeout(() => {
      setAutoSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    }, 1000);
  };

  // Notification system
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "info", // info, success, warning, error
  });

  // Template system
  const [templateApplied, setTemplateApplied] = useState(null);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle manual save
  const handleSave = () => {
    triggerAutoSave();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // AutoSave status indicator
  const renderAutoSaveStatus = () => {
    switch (autoSaveStatus) {
      case "saving":
        return (
          <div className="flex items-center text-yellow-600 text-sm">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            <span>Saving...</span>
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Saved</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification.visible && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-50 border-l-4 border-green-500"
              : notification.type === "error"
              ? "bg-red-50 border-l-4 border-red-500"
              : notification.type === "warning"
              ? "bg-yellow-50 border-l-4 border-yellow-500"
              : "bg-blue-50 border-l-4 border-blue-500"
          }`}
        >
          {notification.type === "success" && (
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          )}
          {notification.type === "error" && (
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          )}
          {notification.type === "warning" && (
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          )}
          {notification.type === "info" && (
            <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
          )}
          <p
            className={`${
              notification.type === "success"
                ? "text-green-800"
                : notification.type === "error"
                ? "text-red-800"
                : notification.type === "warning"
                ? "text-yellow-800"
                : "text-blue-800"
            }`}
          >
            {notification.message}
          </p>
        </div>
      )}
      <div className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Medical Records System</h1>
          <div className="flex space-x-2">
            {renderAutoSaveStatus()}
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "medicalRecord"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("medicalRecord")}
        >
          Medical Record
        </button>
        {/* <button 
          className={`px-4 py-2 font-medium ${activeTab === 'triage' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('triage')}
        >
          Triage
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'pharmacy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('pharmacy')}
        >
          Pharmacy
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'laboratory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('laboratory')}
        >
          Laboratory
        </button> */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "medicalRecord" && (
          <div>
            {/* Patient Search Bar */}
            <div className="mb-4 flex items-center">
              <div className="relative flex-1 mr-2">
                <input
                  type="text"
                  placeholder="Search for existing patient (UPI, Name, Phone)"
                  className="w-full p-2 pl-8 border rounded"
                  onClick={() => setIsSearchOpen(true)}
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />

                {isSearchOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                    <div className="p-2 text-sm text-gray-500">
                      Type to search for patients...
                    </div>
                    {samplePatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="border-t p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectPatient(patient)}
                      >
                        <div className="font-medium">
                          {patient.name} (UPI: {patient.id})
                        </div>
                        <div className="text-sm text-gray-600">
                          DOB: {new Date(patient.dob).toLocaleDateString()} |
                          Phone: {patient.phone}
                        </div>
                      </div>
                    ))}
                    <div
                      className="border-t p-2 text-center text-blue-600 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      Close
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center">
                <RefreshCw className="w-4 h-4 mr-1" />
                New Patient
              </button>
            </div>

            {/* Patient Info Section */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-3 bg-gray-50 rounded-t-lg border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Patient Information
                </h2>
                <button
                  onClick={() => toggleSection("patientInfo")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedSections.patientInfo ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedSections.patientInfo && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth*
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                          <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender*
                        </label>
                        <select
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          National ID
                        </label>
                        <input
                          type="text"
                          name="nationalId"
                          value={formData.nationalId || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NHIF Number
                        </label>
                        <input
                          type="text"
                          name="nhifNumber"
                          value={formData.nhifNumber || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          UPI
                        </label>
                        <input
                          type="text"
                          name="upi"
                          value={formData.upi || "UPI will be generated"}
                          readOnly
                          className="w-full p-2 border rounded bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                          />
                          <Phone className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                          />
                          <Mail className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <textarea
                            name="address"
                            value={formData.address || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-8 border rounded"
                            rows="2"
                          ></textarea>
                          <Home className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 h-40">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Click or drag to upload patient photo
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Emergency Contact
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Name"
                        />
                        <input
                          type="tel"
                          className="w-full p-2 border rounded"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Information Section */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-3 bg-gray-50 rounded-t-lg border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Clinical Information
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded text-sm flex items-center"
                    >
                      Templates
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {showTemplateMenu && (
                      <div className="absolute right-0 mt-1 bg-white rounded shadow-lg border z-10 w-64">
                        <div className="p-2 text-sm font-medium border-b">
                          Select Template
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("hiv")}
                          >
                            HIV Treatment Protocol
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("tb")}
                          >
                            TB Assessment and Treatment
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("anc")}
                          >
                            Antenatal Care Visit
                          </button>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-100 text-sm"
                            onClick={() => applyTemplate("diabetes")}
                          >
                            Diabetes Management
                          </button>
                          <button className="w-full text-left p-2 hover:bg-gray-100 text-sm">
                            Hypertension Follow-up
                          </button>
                          <button className="w-full text-left p-2 hover:bg-gray-100 text-sm">
                            General Medical Exam
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSection("clinicalInfo")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedSections.clinicalInfo ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedSections.clinicalInfo && (
                <div>
                  {/* Clinical Sub-tabs */}
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "history"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("history")}
                    >
                      History
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "encounter"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("encounter")}
                    >
                      Encounter
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "diagnosis"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("diagnosis")}
                    >
                      Diagnosis
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeMedicalSubTab === "plan"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                      onClick={() => setActiveMedicalSubTab("plan")}
                    >
                      Plan
                    </button>
                  </div>

                  {/* Sub-tab Content */}
                  {/* Sub-tab Content */}
                  <div className="p-4">
                    {activeMedicalSubTab === "history" && (
                      <HistoryTab selectedPatient={selectedPatient} />
                    )}
                    {activeMedicalSubTab === "encounter" && (
                      <EncounterTab selectedPatient={selectedPatient} />
                    )}
                    {activeMedicalSubTab === "diagnosis" && (
                      <DiagnosisTab selectedPatient={selectedPatient} />
                    )}
                    {activeMedicalSubTab === "plan" && (
                      <PlanTab selectedPatient={selectedPatient} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                Cancel
              </button>
              <div className="space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Save & Proceed to Triage
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "medicalRecord" && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            <h3 className="text-xl mb-2">This module is under development</h3>
            <p>The {activeTab} functionality will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryTab({ selectedPatient }) {
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [visits, setVisits] = useState([]);

  // Update component state when selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      setAllergies(selectedPatient.allergies || []);
      setConditions(selectedPatient.conditions || []);
      setVisits(selectedPatient.visits || []);
    } else {
      // Reset state when no patient is selected
      setAllergies([]);
      setConditions([]);
      setVisits([]);
    }
  }, [selectedPatient]);

  // If no patient is selected, show a message
  if (!selectedPatient) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          Please select a patient to view their history
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visit History */}
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Visit History</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="relative">
            {visits.length > 0 && (
              <div className="absolute h-full w-0.5 bg-gray-200 left-2.5 top-0"></div>
            )}
            <div className="space-y-4">
              {visits.map((visit) => (
                <div className="flex" key={visit.id}>
                  <div className="relative z-10">
                    <div
                      className={`w-5 h-5 rounded-full ${
                        visit.isRecent ? "bg-blue-600" : "bg-gray-300"
                      } flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div
                    className={`flex-1 ml-4 bg-white p-3 rounded border ${
                      visit.isRecent ? "shadow-sm" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-medium">
                          {new Date(visit.date).toLocaleDateString()}
                        </span>
                        <h4 className="font-medium">{visit.type}</h4>
                      </div>
                      {visit.isRecent && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Recent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {visit.summary}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-blue-600 hover:underline cursor-pointer">
                      View full encounter notes
                    </div>
                  </div>
                </div>
              ))}

              {visits.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No visit history available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Allergies Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Allergies</h3>
          <div className="relative">
            <select
              className="pl-2 pr-8 py-1 border rounded text-sm"
              value={selectedAllergy}
              onChange={(e) => setSelectedAllergy(e.target.value)}
            >
              <option value="">Add Allergy...</option>
              <option value="penicillin">Penicillin</option>
              <option value="nsaids">NSAIDs</option>
              <option value="sulfa">Sulfa Drugs</option>
              <option value="pollen">Pollen</option>
              <option value="food">Food Allergy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allergy
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reaction
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allergies.map((allergy) => (
                <tr key={allergy.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {allergy.type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        allergy.severity === "Severe"
                          ? "bg-red-100 text-red-800"
                          : allergy.severity === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {allergy.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {allergy.reaction}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {allergies.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No allergies recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chronic Conditions */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Chronic Conditions</h3>
          <div className="relative">
            <select
              className="pl-2 pr-8 py-1 border rounded text-sm"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">Add Condition...</option>
              <option value="hypertension">Hypertension</option>
              <option value="diabetes">Diabetes</option>
              <option value="asthma">Asthma</option>
              <option value="hiv">HIV</option>
              <option value="arthritis">Arthritis</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosed
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conditions.map((condition) => (
                <tr key={condition.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {condition.condition}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(condition.diagnosed).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        condition.status === "Active"
                          ? "bg-yellow-100 text-yellow-800"
                          : condition.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {condition.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {conditions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No chronic conditions recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Encounter Tab Component
function EncounterTab({ selectedPatient }) {
  const encounters = selectedPatient?.encounters || [];

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-2">Encounter Details</h3>
      {encounters.length > 0 ? (
        <ul className="space-y-2">
          {encounters.map((encounter, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <p><strong>Date:</strong> {encounter.date}</p>
              <p><strong>Reason:</strong> {encounter.reason}</p>
              <p><strong>Notes:</strong> {encounter.notes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">No encounter details available.</p>
        </div>
      )}
    </div>
  );
}


// Diagnosis Tab Component
function DiagnosisTab({ selectedPatient }) {
  const diagnoses = selectedPatient?.diagnoses || [];

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-2">Diagnosis Information</h3>
      {diagnoses.length > 0 ? (
        <ul className="space-y-2">
          {diagnoses.map((diag, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <p><strong>Condition:</strong> {diag.condition}</p>
              <p><strong>Date Diagnosed:</strong> {diag.date}</p>
              <p><strong>Severity:</strong> {diag.severity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">No diagnosis information available.</p>
        </div>
      )}
    </div>
  );
}


// Plan Tab Component
function PlanTab({ selectedPatient }) {
  const plan = selectedPatient?.treatmentPlan || [];

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-2">Treatment Plan</h3>
      {plan.length > 0 ? (
        <ul className="space-y-2">
          {plan.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <p><strong>Medication:</strong> {item.medication}</p>
              <p><strong>Dosage:</strong> {item.dosage}</p>
              <p><strong>Duration:</strong> {item.duration}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">No treatment plan available.</p>
        </div>
      )}
    </div>
  );
}

