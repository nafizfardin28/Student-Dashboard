import { Router } from "express";
import prisma from "../lib/prisma";
import {
  createScholarshipSchema,
  updateScholarshipSchema
} from "../validators/scholarship.validator";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsedData = createScholarshipSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors
      });
    }

    const data = {
      ...parsedData.data,
      deadline: new Date(parsedData.data.deadline),
      dateApplied: parsedData.data.dateApplied
        ? new Date(parsedData.data.dateApplied)
        : undefined
    };

    const scholarship = await prisma.scholarship.create({
      data
    });

    res.status(201).json({
      success: true,
      data: scholarship
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create scholarship"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const parsedData = updateScholarshipSchema.safeParse(req.body);

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
      deadline: raw.deadline ? new Date(raw.deadline) : undefined,
      dateApplied: raw.dateApplied ? new Date(raw.dateApplied) : undefined
    };

    const scholarship = await prisma.scholarship.update({
      where: { id: req.params.id },
      data
    });

    res.json({
      success: true,
      data: scholarship
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update scholarship"
    });
  }
});

export default router;