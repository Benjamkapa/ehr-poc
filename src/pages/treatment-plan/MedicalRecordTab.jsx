import { useState } from "react";
import PatientForm from "./PatientForm";
import HistoryTab from "./HistoryTab";
import EncounterTab from "./EncounterTab";
import DiagnosisTab from "./DiagnosisTab";
import PlanTab from "./PlanTab";

const tabs = ["History", "Encounter", "Diagnosis", "Plan"];

export default function MedicalRecordTab() {
  const [activeTab, setActiveTab] = useState("History");

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Medical Record</h2>
      <PatientForm />

      <div className="border-b border-gray-200 mt-6">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "History" && <HistoryTab />}
        {activeTab === "Encounter" && <EncounterTab />}
        {activeTab === "Diagnosis" && <DiagnosisTab />}
        {activeTab === "Plan" && <PlanTab />}
      </div>
    </div>
  );
}
