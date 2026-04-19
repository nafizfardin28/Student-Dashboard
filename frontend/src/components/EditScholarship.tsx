import { useState } from "react";
import { updateScholarship } from "../api/students";

type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  deadline: string;
  notes?: string;
};

type Props = {
  scholarship: Scholarship;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditScholarshipForm({
  scholarship,
  onClose,
  onSuccess
}: Props) {
  const [form, setForm] = useState({
    name: scholarship.name,
    provider: scholarship.provider,
    amount: String(scholarship.amount),
    currency: scholarship.currency,
    status: scholarship.status,
    deadline: scholarship.deadline.slice(0, 10),
    notes: scholarship.notes || ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Scholarship name is required");
    if (!form.provider.trim()) return setError("Provider is required");
    if (!form.amount || Number(form.amount) <= 0) {
      return setError("Amount must be greater than 0");
    }
    if (!form.deadline) return setError("Deadline is required");

    try {
      await updateScholarship(scholarship.id, {
        name: form.name,
        provider: form.provider,
        amount: Number(form.amount),
        currency: form.currency,
        status: form.status,
        deadline: form.deadline,
        notes: form.notes
      });

      onSuccess();
    } catch (err) {
      setError("Failed to update scholarship");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Edit Scholarship</h3>
        <button
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Scholarship name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Provider"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="RESEARCHING">Researching</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="AWARDED">Awarded</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}