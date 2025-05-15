export default function EncounterTab() {
  return (
    <div className="space-y-4">
      <textarea className="input" placeholder="Subjective" rows="3" />
      <textarea className="input" placeholder="Objective" rows="3" />
      <textarea className="input" placeholder="Assessment" rows="3" />
      <textarea className="input" placeholder="Plan" rows="3" />
    </div>
  );
}
