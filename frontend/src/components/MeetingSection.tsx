import { useState } from "react";
import EditMeetingForm from "./EditMeetingForm";

type Meeting = {
  id: string;
  mentorId?: string;
  date: string;
  duration: number;
  notes?: string;
  status: string;
  mentor?: {
    name: string;
    title: string;
    company: string;
  };
};

type Props = {
  meetings: Meeting[];
};

export default function MeetingSection({ meetings }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); 
  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/meetings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      window.location.reload();
    } catch (error) {
      console.error("Failed to update meeting status:", error);
      alert("Failed to update meeting status");
    }
  };

  const filteredMeetings = meetings
    .filter((m) => {
      const text = (m.notes || "").toLowerCase();
      const mentorName = (m.mentor?.name || "").toLowerCase();
      return (
        text.includes(search.toLowerCase()) ||
        mentorName.includes(search.toLowerCase())
      );
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Mentorship & Meetings
      </h2>

      {/* ✅ SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search meetings by notes or mentor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-2 mb-4"
      />

      {filteredMeetings.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No meetings found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              {editingId === meeting.id ? (
                <EditMeetingForm
                  meeting={meeting}
                  onClose={() => setEditingId(null)}
                  onSuccess={() => window.location.reload()}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {meeting.mentor?.name || "Unknown Mentor"}
                      </h3>

                      <p className="text-sm text-slate-600 mt-1">
                        {meeting.mentor?.title || "No title"} —{" "}
                        {meeting.mentor?.company || "No company"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                          meeting.status
                        )}`}
                      >
                        {meeting.status}
                      </span>

                      <select
                        value={meeting.status}
                        onChange={(e) =>
                          handleStatusChange(
                            meeting.id,
                            e.target.value
                          )
                        }
                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                      >
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>

                      <button
                        onClick={() => setEditingId(meeting.id)}
                        className="text-xs px-3 py-1 rounded border border-slate-300 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-3 text-sm text-slate-600 space-y-1">
                    <p>
                      Date:{" "}
                      {new Date(meeting.date).toLocaleString()}
                    </p>

                    <p>
                      Duration: {meeting.duration} minutes
                    </p>

                    {meeting.notes && (
                      <p className="text-slate-500">
                        Notes: {meeting.notes}
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