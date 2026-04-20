import { z } from "zod";

export const createMeetingSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  mentorId: z.string().min(1, "Mentor ID is required"),
  date: z.string().min(1, "Meeting date is required"),
  duration: z.number().positive("Duration must be greater than 0"),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]),
  actionItems: z.array(z.string()).optional().default([]),
  notes: z.string().optional()
});

export const updateMeetingSchema = z.object({
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
  date: z.string().optional(),
  duration: z.number().optional(),
  notes: z.string().optional(),
  mentorId: z.string().optional()
});