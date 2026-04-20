import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const mentors = await prisma.mentor.findMany({
      orderBy: { name: "asc" },
    });

    res.json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
    });
  }
});

router.get("/setup-demo", async (_req: Request, res: Response) => {
  try {
    const existing = await prisma.mentor.findMany();

    if (existing.length === 0) {
      await prisma.mentor.createMany({
        data: [
          {
            name: "Dr. Hasan",
            title: "Professor",
            company: "University of Dhaka",
            expertise: ["Mentoring", "Research"],
            email: "hasan@example.com",
            bio: "Senior academic mentor",
            maxMentees: 10,
          },
          {
            name: "Dr. Ayesha",
            title: "Research Scientist",
            company: "BUET",
            expertise: ["Career Growth", "Scholarships"],
            email: "ayesha@example.com",
            bio: "Research and scholarship mentor",
            maxMentees: 8,
          },
        ],
      });
    }

    const mentors = await prisma.mentor.findMany({
      orderBy: { name: "asc" },
    });

    res.json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create demo mentors",
    });
  }
});

export default router;