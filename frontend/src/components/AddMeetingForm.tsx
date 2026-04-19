import { useEffect, useState } from "react";
import { createMeeting, getMentors } from "../api/students";

type Mentor = {
  id: string;
  name: string;
  title: string;
  company: string;
};

export default function AddMeetingForm({ studentId }: { studentId: string }) {
  const [notes, setNotes] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [form, setForm] = useState({
    mentorId: "",
    date: "",
    duration: "",
    notes: "",
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
      await createMeeting({
        studentId,
        mentorId: form.mentorId,
        date: form.date,
        duration: Number(form.duration),
        status: "SCHEDULED",
        actionItems: [],
        notes: form.notes,
      });

      window.location.reload();
    } catch (error) {
      setError("Failed to schedule meeting");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-3"
    >
      <h3 className="font-semibold">Schedule Meeting</h3>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <select
        className="w-full border p-2 rounded"
        value={form.mentorId}
        onChange={(e) => setForm({ ...form, mentorId: e.target.value })}
      >
        <option value="">Select mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.id} value={mentor.id}>
            {mentor.name} — {mentor.title}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        className="w-full border p-2 rounded"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Duration (minutes)"
        type="number"
        className="w-full border p-2 rounded"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />

      <textarea
        placeholder="Meeting notes (discussion topics, goals, etc.)"
        value={notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Schedule
      </button>
    </form>
  );
}
