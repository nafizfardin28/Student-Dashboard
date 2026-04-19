import { useState } from "react";
import EditScholarshipForm from "./EditScholarship";

type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  deadline: string;
  requirements?: string; // ✅ added
  notes?: string;
};

type Props = {
  scholarships: Scholarship[];
};

export default function ScholarshipSection({ scholarships }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "AWARDED":
        return "bg-green-100 text-green-700";
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "INTERVIEW":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/scholarships/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update scholarship status");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Scholarships
      </h2>

      {scholarships.length === 0 ? (
        <p className="text-slate-500 text-sm">No scholarships found.</p>
      ) : (
        <div className="space-y-4">
          {scholarships.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-xl p-4"
            >
              {editingId === item.id ? (
                <EditScholarshipForm
                  scholarship={item}
                  onClose={() => setEditingId(null)}
                  onSuccess={() => window.location.reload()}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Provider: {item.provider}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                      >
                        <option value="RESEARCHING">Researching</option>
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="AWARDED">Awarded</option>
                        <option value="REJECTED">Rejected</option>
                      </select>

                      <button
                        onClick={() => setEditingId(item.id)}
                        className="text-xs px-3 py-1 rounded border border-slate-300 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-slate-600 space-y-1">
                    <p>
                      Amount: {item.amount} {item.currency}
                    </p>

                    <p>
                      Deadline:{" "}
                      {new Date(item.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-slate-500">
                      Requirements:{" "}
                      {item.requirements ? (
                        item.requirements
                      ) : (
                        <span className="italic text-slate-400">
                          Not specified
                        </span>
                      )}
                    </p>

                    {item.notes && (
                      <p className="text-slate-500">
                        Notes: {item.notes}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}