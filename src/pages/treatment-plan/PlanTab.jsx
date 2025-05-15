export default function PlanTab() {
  return (
    <div className="space-y-4">
      <textarea className="input" placeholder="Prescription Details" rows="3" />
      <input type="text" className="input" placeholder="Referral To..." />
      <input type="date" className="input" placeholder="Follow-Up Date" />
      <input type="text" className="input" placeholder="Doctor Signature (digital or name)" />
    </div>
  );
}
