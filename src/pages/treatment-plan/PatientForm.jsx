export default function PatientForm() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input placeholder="Full Name" className="input" />
      <input placeholder="Date of Birth" type="date" className="input" />
      <select className="input">
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <input placeholder="Phone Number" className="input" />
      <input placeholder="Email Address" className="input" />
      <input placeholder="National ID" className="input" />
      <input placeholder="NHIF Number" className="input" />
      <input placeholder="Emergency Contact" className="input" />
      <input placeholder="Unique Patient Identifier (UPI)" className="input" />
      <input type="file" className="input" accept="image/*" />
    </form>
  );
}
