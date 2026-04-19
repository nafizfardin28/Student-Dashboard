import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  gpa: number;
  creditsCompleted: number;
  creditsRequired: number;
};

export default function AcademicProgressChart({
  gpa,
  creditsCompleted,
  creditsRequired
}: Props) {
  const data = [
    { name: "Start", gpa: 2.8 },
    { name: "Mid", gpa: 3.2 },
    { name: "Now", gpa }
  ];

  const progress = Math.round((creditsCompleted / creditsRequired) * 100);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">GPA Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Line type="monotone" dataKey="gpa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">Credit Progress</h2>
        <p className="text-slate-700 mb-2">
          {creditsCompleted} / {creditsRequired} credits completed
        </p>
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500">{progress}% completed</p>
      </div>
    </div>
  );
}