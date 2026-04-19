import {
  PrismaClient,
  AcademicYear,
  EnrollmentStatus,
  ScholarshipStatus,
  MeetingStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean old data
  await prisma.meeting.deleteMany();
  await prisma.scholarship.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.student.deleteMany();

  // Create mentors
  const mentor1 = await prisma.mentor.create({
    data: {
      name: "Kazi Sakib",
      title: "Software Engineer",
      company: "Google",
      expertise: ["Web Development", "Career Growth"],
      email: "sakib@gmail.com",
      bio: "Mentor in tech careers",
      maxMentees: 10
    }
  });

  const mentor2 = await prisma.mentor.create({
    data: {
      name: "Nurul Ahad Towhid",
      title: "Data Scientist",
      company: "Microsoft",
      expertise: ["Data Science", "AI"],
      email: "towhid@gmail.com",
      bio: "Data and AI mentor",
      maxMentees: 8
    }
  });

  // Create students
  const student1 = await prisma.student.create({
    data: {
      firstName: "Amina",
      lastName: "Rahman",
      email: "amina212@gmail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      academicYear: AcademicYear.JUNIOR,
      major: "Computer Science",
      gpa: 3.7,
      enrollmentStatus: EnrollmentStatus.FULL_TIME,
      creditsCompleted: 75,
      creditsRequired: 120,
      expectedGraduation: new Date("2027-05-30"),
      firstGeneration: true,
      lowIncome: true,
      underrepresentedMinority: false
    }
  });

  const student2 = await prisma.student.create({
    data: {
      firstName: "Rahim",
      lastName: "Ahmed",
      email: "rahim897@gmail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      academicYear: AcademicYear.SOPHOMORE,
      major: "Pharmacy",
      gpa: 3.4,
      enrollmentStatus: EnrollmentStatus.FULL_TIME,
      creditsCompleted: 45,
      creditsRequired: 120,
      expectedGraduation: new Date("2028-05-30")
    }
  });

 await prisma.meeting.createMany({
    data: [
      {
        studentId: student1.id,
        mentorId: mentor1.id,
        date: new Date("2026-04-22T10:00:00Z"),
        duration: 45,
        notes: "Discussed internship preparation",
        actionItems: ["Update resume", "Apply to 3 companies"],
        status: MeetingStatus.SCHEDULED
      },
      {
        studentId: student2.id,
        mentorId: mentor2.id,
        date: new Date("2026-04-25T14:00:00Z"),
        duration: 30,
        notes: "Discussed academic planning",
        actionItems: ["Review semester goals"],
        status: MeetingStatus.SCHEDULED
      }
    ]
  });

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });