import { z } from "zod";

const studentBaseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  avatarUrl: z.string().optional(),
  academicYear: z.enum(["FRESHMAN", "SOPHOMORE", "JUNIOR", "SENIOR"]),
  major: z.string().min(1, "Major is required"),
  gpa: z.number().min(0, "GPA cannot be negative").max(4, "GPA cannot be more than 4.0"),
  enrollmentStatus: z.enum(["FULL_TIME", "PART_TIME", "LEAVE_OF_ABSENCE", "GRADUATED"]),
  creditsCompleted: z.number().min(0, "Credits completed cannot be negative"),
  creditsRequired: z.number().positive("Credits required must be greater than 0"),
  expectedGraduation: z.string().min(1, "Expected graduation date is required"),
  firstGeneration: z.boolean().optional(),
  lowIncome: z.boolean().optional(),
  underrepresentedMinority: z.boolean().optional()
});

export const createStudentSchema = studentBaseSchema.refine(
  (data) => data.creditsCompleted <= data.creditsRequired,
  {
    message: "Completed credits cannot exceed required credits",
    path: ["creditsCompleted"]
  }
);

export const updateStudentSchema = studentBaseSchema
  .partial()
  .refine(
    (data) => {
      if (
        data.creditsCompleted !== undefined &&
        data.creditsRequired !== undefined
      ) {
        return data.creditsCompleted <= data.creditsRequired;
      }
      return true;
    },
    {
      message: "Completed credits cannot exceed required credits",
      path: ["creditsCompleted"]
    }
  );