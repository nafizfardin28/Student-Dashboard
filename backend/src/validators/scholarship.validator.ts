import { z } from "zod";

export const createScholarshipSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  name: z.string().min(1, "Scholarship name is required"),
  provider: z.string().min(1, "Provider is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  status: z.enum([
    "RESEARCHING",
    "APPLIED",
    "INTERVIEW",
    "AWARDED",
    "REJECTED",
  ]),
  deadline: z.string().min(1, "Deadline is required"),
  requirements: z.string().optional(),
  essayRequired: z.boolean().optional(),
  essaySubmitted: z.boolean().optional(),
  notes: z.string().optional(),
  dateApplied: z.string().optional(),
});

export const updateScholarshipSchema = createScholarshipSchema.partial();
