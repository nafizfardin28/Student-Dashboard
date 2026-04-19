import { useState,useEffect } from "react";
import { createStudent } from "../api/students";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddStudentForm({ onClose, onSuccess }: Props) {
  // optional enhancement
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    academicYear: "FRESHMAN",
    major: "",
    gpa: "",
    enrollmentStatus: "FULL_TIME",
    creditsCompleted: "",
    creditsRequired: "",
    expectedGraduation: "",
    firstGeneration: false,
    lowIncome: false,
    underrepresentedMinority: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim()) return setError("First name is required");
    if (!form.lastName.trim()) return setError("Last name is required");
    if (!form.email.trim()) return setError("Email is required");
    if (!form.major.trim()) return setError("Major is required");
    if (!form.gpa || Number(form.gpa) < 0 || Number(form.gpa) > 4) {
      return setError("GPA must be between 0 and 4");
    }
    if (!form.creditsCompleted || Number(form.creditsCompleted) < 0) {
      return setError("Completed credits must be 0 or more");
    }
    if (!form.creditsRequired || Number(form.creditsRequired) <= 0) {
      return setError("Required credits must be greater than 0");
    }
    if (Number(form.creditsCompleted) > Number(form.creditsRequired)) {
      return setError("Completed credits cannot exceed required credits");
    }
    if (!form.expectedGraduation) {
      return setError("Expected graduation date is required");
    }

    try {
      await createStudent({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        avatarUrl: form.avatarUrl || undefined,
        academicYear: form.academicYear,
        major: form.major,
        gpa: Number(form.gpa),
        enrollmentStatus: form.enrollmentStatus,
        creditsCompleted: Number(form.creditsCompleted),
        creditsRequired: Number(form.creditsRequired),
        expectedGraduation: form.expectedGraduation,
        firstGeneration: form.firstGeneration,
        lowIncome: form.lowIncome,
        underrepresentedMinority: form.underrepresentedMinority,
      });

      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create student");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Add Student</h2>
        <button
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Avatar URL (optional)"
            value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={form.academicYear}
            onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="FRESHMAN">Freshman</option>
            <option value="SOPHOMORE">Sophomore</option>
            <option value="JUNIOR">Junior</option>
            <option value="SENIOR">Senior</option>
          </select>

          <input
            type="text"
            placeholder="Major"
            value={form.major}
            onChange={(e) => setForm({ ...form, major: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            step="0.01"
            placeholder="GPA"
            value={form.gpa}
            onChange={(e) => setForm({ ...form, gpa: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Credits Completed"
            value={form.creditsCompleted}
            onChange={(e) =>
              setForm({ ...form, creditsCompleted: e.target.value })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Credits Required"
            value={form.creditsRequired}
            onChange={(e) =>
              setForm({ ...form, creditsRequired: e.target.value })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={form.enrollmentStatus}
            onChange={(e) =>
              setForm({ ...form, enrollmentStatus: e.target.value })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="LEAVE_OF_ABSENCE">Leave of Absence</option>
            <option value="GRADUATED">Graduated</option>
          </select>

          <input
            type="date"
            value={form.expectedGraduation}
            onChange={(e) =>
              setForm({ ...form, expectedGraduation: e.target.value })
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.firstGeneration}
              onChange={(e) =>
                setForm({ ...form, firstGeneration: e.target.checked })
              }
            />
            First Generation
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.lowIncome}
              onChange={(e) =>
                setForm({ ...form, lowIncome: e.target.checked })
              }
            />
            Low Income
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.underrepresentedMinority}
              onChange={(e) =>
                setForm({
                  ...form,
                  underrepresentedMinority: e.target.checked,
                })
              }
            />
            Underrepresented Minority
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
