import express from "express";
import cors from "cors";

import studentRoutes from "./routes/student.routes";
import scholarshipRoutes from "./routes/scholarship.routes";
import meetingRoutes from "./routes/meeting.routes";
import mentorRoutes from "./routes/mentor.routes";

const app = express();


app.use(cors());


app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.get("/", (_req, res) => {
  res.send("Student Dashboard API is running 🚀");
});

app.use("/api/students", studentRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/mentors", mentorRoutes);

export default app;