import { useEffect, useState } from "react";
import { getMentors, updateMeeting } from "../api/students";

type Mentor = {
  id: string;
  name: string;
  title: string;
};

type Meeting = {
  id: string;
  mentorId?: string;
  date: string;
  duration: number;
  notes?: string;
  status: string;
};

type Props = {
  meeting: Meeting;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMeetingForm({
  meeting,
  onClose,
  onSuccess
}: Props) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [form, setForm] = useState({
    mentorId: meeting.mentorId || "",
    date: new Date(meeting.date).toISOString().slice(0, 16),
    duration: String(meeting.duration),
    status: meeting.status,
    notes: meeting.notes || ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const result = await getMentors();
        setMentors(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMentors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.mentorId) return setError("Mentor is required");
    if (!form.date) return setError("Meeting date is required");
    if (!form.duration || Number(form.duration) <= 0) {
      return setError("Duration must be greater than 0");
    }

    try {
      await updateMeeting(meeting.id, {
        mentorId: form.mentorId,
        date: form.date,
        duration: Number(form.duration),
        status: form.status,
        notes: form.notes
      });

      onSuccess();
    } catch (err) {
      setError("Failed to update meeting");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Edit Meeting</h3>
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

        <select
          value={form.mentorId}
          onChange={(e) => setForm({ ...form, mentorId: e.target.value })}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
        >
          <option value="">Select mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name} — {mentor.title}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
        >
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <textarea
          rows={3}
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}