import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const mentors = await prisma.mentor.findMany({
      orderBy: { name: "asc" }
    });

    res.json({ success: true, data: mentors });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors"
    });
  }
});

export default router;