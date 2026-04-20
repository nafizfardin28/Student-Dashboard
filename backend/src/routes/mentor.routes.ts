import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: "1",
        name: "Dr. Hasan",
        title: "Professor",
        company: "University of Dhaka"
      },
      {
        id: "2",
        name: "Dr. Ayesha",
        title: "Research Scientist",
        company: "BUET"
      }
    ]
  });
});

export default router;