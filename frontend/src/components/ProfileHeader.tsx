type Props = {
  student: any;
};

export default function ProfileHeader({ student }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
      <img
        src={student.avatarUrl || "https://via.placeholder.com/120"}
        alt={`${student.firstName} ${student.lastName}`}
        className="w-28 h-28 rounded-full object-cover"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-800">
          {student.firstName} {student.lastName}
        </h1>
        <p className="text-slate-500">{student.email}</p>
        <p className="mt-2 text-slate-700">Major: {student.major}</p>
        <p className="text-slate-700">Academic Year: {student.academicYear}</p>
        <p className="text-slate-700">Status: {student.enrollmentStatus}</p>
      </div>
    </div>
  );
}