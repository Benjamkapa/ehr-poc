export default function DiagnosisTab() {
  return (
    <div className="space-y-4">
      <input type="text" className="input" placeholder="Search ICD-10 Code (e.g., malaria, diabetes)" />
      <select className="input">
        <option>Select diagnosis code</option>
        <option value="A00">Cholera (A00)</option>
        <option value="B20">HIV disease (B20)</option>
        {/* Add full lookup or integration */}
      </select>
    </div>
  );
}
