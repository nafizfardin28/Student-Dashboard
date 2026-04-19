import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../api/students";
import StudentCard from "../components/StudentCard";
import AddStudentForm from "../components/AddStudentForm";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  academicYear: string;
  major: string;
  gpa: number;
  enrollmentStatus: string;
  creditsCompleted: number;
};

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getStudents({
          search,
          year: yearFilter,
          status: statusFilter
        });

        setStudents(result.data);
      } catch (error) {
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchStudents, 250);
    return () => clearTimeout(timer);
  }, [search, yearFilter, statusFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 animate-pulse">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Student Directory
          </h1>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            + Add Student
          </button>
        </div>

        {showAddForm && (
          <AddStudentForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              window.location.reload();
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            <p className="text-sm text-slate-500">Total Students</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {students.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            <p className="text-sm text-slate-500">Average GPA</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {students.length
                ? (
                    students.reduce((sum, s) => sum + s.gpa, 0) /
                    students.length
                  ).toFixed(2)
                : "0.00"}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            <p className="text-sm text-slate-500">Full-Time Students</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {students.filter((s) => s.enrollmentStatus === "FULL_TIME").length}
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <input
            type="text"
            placeholder="🔍 Search by name, major, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm"
          >
            <option value="">All Years</option>
            <option value="FRESHMAN">Freshman</option>
            <option value="SOPHOMORE">Sophomore</option>
            <option value="JUNIOR">Junior</option>
            <option value="SENIOR">Senior</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm"
          >
            <option value="">All Status</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="LEAVE_OF_ABSENCE">Leave of Absence</option>
            <option value="GRADUATED">Graduated</option>
          </select>
        </div>

        {students.length === 0 ? (
          <p className="text-slate-500">No students found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() => navigate(`/students/${student.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}