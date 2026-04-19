import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "../api/students";
import ProfileHeader from "../components/ProfileHeader";
import AcademicProgressChart from "../components/AcademicProgressChart";
import ScholarshipSection from "../components/ScholarshipSection";
import MeetingSection from "../components/MeetingSection";
import AddScholarshipForm from "../components/AddScholarshipForm";
import AddMeetingForm from "../components/AddMeetingForm";
export default function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;

      try {
        const result = await getStudentById(id);
        setStudent(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!student) {
    return <div className="p-6 text-red-600">Student not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Directory
        </Link>

        {/* Header */}
        <ProfileHeader student={student} />

        {/* Academic Section */}
        <AcademicProgressChart
          gpa={student.gpa}
          creditsCompleted={student.creditsCompleted}
          creditsRequired={student.creditsRequired}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ScholarshipSection scholarships={student.scholarships} />

            <AddScholarshipForm
              studentId={student.id}
              onSuccess={() => window.location.reload()}
            />
          </div>

          <div className="space-y-4">
            <MeetingSection meetings={student.meetings} />
            <AddMeetingForm studentId={student.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
