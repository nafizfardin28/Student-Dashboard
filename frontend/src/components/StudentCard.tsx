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

type Props = {
  student: Student;
  onClick: () => void;
};

export default function StudentCard({ student, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition duration-200"
    >
      <div className="flex items-center gap-4">
        <img
          src={student.avatarUrl || "https://via.placeholder.com/80"}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-sm text-slate-500">{student.major}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p>Year: {student.academicYear}</p>
        <p>GPA: {student.gpa}</p>
        <p>Credits: {student.creditsCompleted}</p>
        <p>Status: {student.enrollmentStatus}</p>
      </div>
    </div>
  );
}
