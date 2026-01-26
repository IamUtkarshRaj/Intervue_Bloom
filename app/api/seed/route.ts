import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

const interviews = [
  // 1. Frontend Entry Level - Technical
  {
    position: "Frontend Developer",
    level: "entry",
    type: "Technical",
    description:
      "Technical interview focusing on HTML, CSS, JavaScript fundamentals, React basics, and basic web development concepts.",
    jobDescription:
      "We're looking for an entry-level frontend developer to join our team. You'll work on building responsive web applications using modern frameworks.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    duration: 30,
  },
  // 2. Backend Mid Level - Mixed (70% technical, 30% behavioral)
  {
    position: "Backend Developer",
    level: "mid",
    type: "Mixed",
    description:
      "Comprehensive interview covering Node.js/Python backend development, database design, API development, plus teamwork and project management skills.",
    jobDescription:
      "We need an experienced backend developer to design and implement scalable APIs and microservices. You'll work with our product and DevOps teams.",
    requiredSkills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "Team Collaboration",
    ],
    duration: 45,
  },
  // 3. Full Stack Senior - Technical
  {
    position: "Full Stack Developer",
    level: "senior",
    type: "Technical",
    description:
      "In-depth technical interview covering frontend frameworks, backend architecture, database optimization, system design, and cloud services.",
    jobDescription:
      "Senior full stack role requiring expertise in both frontend and backend. You'll lead technical decisions and mentor junior developers.",
    requiredSkills: [
      "React/Vue",
      "Node.js/Python",
      "System Design",
      "AWS/Azure",
      "Microservices",
      "Leadership",
    ],
    duration: 60,
  },
  // 4. DevOps Mid Level - Technical
  {
    position: "DevOps Engineer",
    level: "mid",
    type: "Technical",
    description:
      "Technical assessment of CI/CD pipelines, containerization, orchestration, infrastructure as code, and monitoring solutions.",
    jobDescription:
      "Looking for a DevOps engineer to manage our cloud infrastructure, implement CI/CD pipelines, and improve deployment processes.",
    requiredSkills: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "AWS/GCP",
      "Jenkins/GitHub Actions",
      "Monitoring",
    ],
    duration: 45,
  },
  // 5. Mobile Entry Level - Technical
  {
    position: "Mobile Developer",
    level: "entry",
    type: "Technical",
    description:
      "Technical interview on mobile app development fundamentals using React Native or Flutter, mobile UI/UX patterns, and API integration.",
    jobDescription:
      "Entry-level mobile developer needed to build cross-platform mobile applications. Experience with React Native or Flutter preferred.",
    requiredSkills: [
      "React Native",
      "Flutter",
      "Mobile UI/UX",
      "REST APIs",
      "Git",
    ],
    duration: 30,
  },
  // 6. Data Engineer Senior - Technical
  {
    position: "Data Engineer",
    level: "senior",
    type: "Technical",
    description:
      "Advanced technical interview covering data pipelines, ETL processes, big data technologies, data warehousing, and optimization techniques.",
    jobDescription:
      "Senior data engineer to design and maintain our data infrastructure. Experience with big data processing and data warehouse solutions required.",
    requiredSkills: [
      "Apache Spark",
      "Airflow",
      "SQL/NoSQL",
      "Data Warehousing",
      "Python",
      "Cloud Data Services",
    ],
    duration: 60,
  },
  // 7. UI/UX Designer Mid Level - Mixed (50% technical, 50% behavioral)
  {
    position: "UI/UX Designer",
    level: "mid",
    type: "Mixed",
    description:
      "Interview assessing design tools proficiency, user research methods, prototyping skills, alongside communication and collaboration abilities.",
    jobDescription:
      "Mid-level UI/UX designer to create intuitive user interfaces and conduct user research. You'll work closely with product and engineering teams.",
    requiredSkills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Communication",
      "Collaboration",
    ],
    duration: 45,
  },
  // 8. Software Engineer Entry Level - Behavioral
  {
    position: "Software Engineer",
    level: "entry",
    type: "Behavioral",
    description:
      "Behavioral interview focusing on teamwork, problem-solving approach, learning ability, adaptability, and cultural fit.",
    jobDescription:
      "Entry-level software engineer position. We value eagerness to learn, good communication skills, and ability to work in a team environment.",
    requiredSkills: [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Adaptability",
      "Learning Mindset",
    ],
    duration: 30,
  },
  // 9. Senior Software Engineer - Behavioral (Leadership focused)
  {
    position: "Senior Software Engineer",
    level: "senior",
    type: "Behavioral",
    description:
      "Leadership-focused behavioral interview covering mentorship experience, conflict resolution, technical decision-making, and team influence.",
    jobDescription:
      "Senior engineer who will mentor team members, drive technical initiatives, and contribute to engineering culture and best practices.",
    requiredSkills: [
      "Leadership",
      "Mentorship",
      "Technical Strategy",
      "Conflict Resolution",
      "Cross-team Collaboration",
      "Decision Making",
    ],
    duration: 45,
  },
  // 10. Cloud Architect Senior - Technical
  {
    position: "Cloud Architect",
    level: "senior",
    type: "Technical",
    description:
      "Technical interview on cloud architecture design, security best practices, cost optimization, scalability patterns, and multi-cloud strategies.",
    jobDescription:
      "Senior cloud architect to design secure, scalable cloud solutions. Deep expertise in AWS/Azure/GCP and cloud-native technologies required.",
    requiredSkills: [
      "AWS/Azure/GCP",
      "Cloud Architecture",
      "Security",
      "Cost Optimization",
      "Kubernetes",
      "Infrastructure as Code",
    ],
    duration: 60,
  },
  // 11. QA Engineer Mid Level - Mixed (60% technical, 40% behavioral)
  {
    position: "QA Engineer",
    level: "mid",
    type: "Mixed",
    description:
      "Interview covering test automation, testing frameworks, quality processes, plus communication with development teams and attention to detail.",
    jobDescription:
      "Mid-level QA engineer to develop test automation frameworks and ensure product quality. You'll collaborate with developers throughout the SDLC.",
    requiredSkills: [
      "Test Automation",
      "Selenium/Cypress",
      "API Testing",
      "CI/CD Integration",
      "Communication",
      "Attention to Detail",
    ],
    duration: 45,
  },
  // 12. Product Manager Mid Level - Behavioral
  {
    position: "Product Manager",
    level: "mid",
    type: "Behavioral",
    description:
      "Behavioral interview assessing stakeholder management, prioritization skills, user empathy, data-driven decision making, and cross-functional leadership.",
    jobDescription:
      "Mid-level product manager to own product features from conception to launch. Strong communication and stakeholder management skills essential.",
    requiredSkills: [
      "Stakeholder Management",
      "Prioritization",
      "User Research",
      "Data Analysis",
      "Communication",
      "Leadership",
    ],
    duration: 45,
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    let userId = body.userId;

    // If no userId provided, try to get from current session
    if (!userId) {
      const { getCurrentUser } = await import("@/lib/actions/auth.action");
      const user = await getCurrentUser();
      
      if (!user?.id) {
        return NextResponse.json(
          { error: "User ID is required. Please provide userId in request body or be logged in." },
          { status: 400 }
        );
      }
      
      userId = user.id;
    }

    const batch = db.batch();
    let count = 0;

    for (const interview of interviews) {
      const docRef = db.collection("interviews").doc();
      const interviewData = {
        role: interview.position,
        level: interview.level,
        type: interview.type,
        description: interview.description,
        jobDescription: interview.jobDescription,
        techstack: interview.requiredSkills,
        duration: interview.duration,
        userId,
        cover: getRandomInterviewCover(),
        createdAt: new Date().toISOString(),
        finalized: false,
        questions: [],
      };

      batch.set(docRef, interviewData);
      count++;
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      count,
      userId,
      message: `Successfully seeded ${count} interviews for user ${userId}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to seed interviews",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
