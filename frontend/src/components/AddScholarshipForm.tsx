import { useState } from "react";
import { createScholarship } from "../api/students";

export default function AddScholarshipForm({
  studentId,
  onSuccess,
}: {
  studentId: string;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
    requirements: ""
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
      await createScholarship({
        studentId,
        name: form.name,
        provider: form.provider,
        amount: Number(form.amount),
        currency: "USD",
        status: "RESEARCHING",
        deadline: form.deadline,
        requirements: form.requirements || undefined,

        essayRequired: false,
        essaySubmitted: false,
        notes: "",
      });

      onSuccess();
    } catch (err) {
      setError("Failed to create scholarship");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-3"
    >
      <h3 className="font-semibold">Add Scholarship</h3>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Provider"
        className="w-full border p-2 rounded"
        value={form.provider}
        onChange={(e) => setForm({ ...form, provider: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        className="w-full border p-2 rounded"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        type="date"
        className="w-full border p-2 rounded"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
      />

      <textarea
        placeholder="Requirements (e.g. GPA > 3.5, essay required)"
        value={form.requirements}
        onChange={(e) =>
          setForm({ ...form, requirements: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}