import { Router } from "express";
import prisma from "../lib/prisma";
import {
  createMeetingSchema,
  updateMeetingSchema
} from "../validators/meeting.validator";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsedData = createMeetingSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors
      });
    }

    const data = {
      ...parsedData.data,
      date: new Date(parsedData.data.date)
    };

    const meeting = await prisma.meeting.create({
      data
    });

    res.status(201).json({
      success: true,
      data: meeting
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create meeting"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const parsedData = updateMeetingSchema.safeParse(req.body);

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
      date: raw.date ? new Date(raw.date) : undefined
    };

    const meeting = await prisma.meeting.update({
      where: { id: req.params.id },
      data
    });

    res.json({
      success: true,
      data: meeting
    });

  } catch (error: unknown) {
  console.error("MEETING UPDATE ERROR:", error);

  const errorMessage =
    error instanceof Error ? error.message : "Unknown error";

  return res.status(500).json({
    success: false,
    message: "Failed to update meeting",
    error: errorMessage,
  });
  }
});

export default router;