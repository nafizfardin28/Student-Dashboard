import { Router } from "express";
import prisma from "../lib/prisma";
import {
  createStudentSchema,
  updateStudentSchema
} from "../validators/student.validator";

const router = Router();

/**
 * ✅ GET ALL STUDENTS (with filters)
 */
router.get("/", async (req, res) => {
  try {
    const search = String(req.query.search || "");
    const year = String(req.query.year || "");
    const status = String(req.query.status || "");

    const students = await prisma.student.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { firstName: { contains: search, mode: "insensitive" } },
                  { lastName: { contains: search, mode: "insensitive" } },
                  { email: { contains: search, mode: "insensitive" } },
                  { major: { contains: search, mode: "insensitive" } }
                ]
              }
            : {},
          year ? { academicYear: year as any } : {},
          status ? { enrollmentStatus: status as any } : {}
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
});

/**
 * ✅ GET SINGLE STUDENT (with relations)
 */
router.get("/:id", async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: {
        scholarships: true,
        meetings: {
          include: {
            mentor: true
          },
          orderBy: {
            date: "desc"
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student"
    });
  }
});

/**
 * ✅ CREATE STUDENT (with validation)
 */
router.post("/", async (req, res) => {
  try {
    const parsedData = createStudentSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors
      });
    }

    const data = {
      ...parsedData.data,
      expectedGraduation: new Date(parsedData.data.expectedGraduation)
    };

    const student = await prisma.student.create({ data });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create student"
    });
  }
});

/**
 * ✅ UPDATE STUDENT (with validation)
 */
router.put("/:id", async (req, res) => {
  try {
    const parsedData = updateStudentSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors
      });
    }

    const raw = parsedData.data;

    const data = {
      ...raw,
      expectedGraduation: raw.expectedGraduation
        ? new Date(raw.expectedGraduation)
        : undefined
    };

    const student = await prisma.student.update({
      where: { id: req.params.id },
      data
    });

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update student"
    });
  }
});

export default router;