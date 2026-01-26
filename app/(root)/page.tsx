import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/actions/auth.action";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

// Pre-defined interview templates
const interviewTemplates = [
  {
    role: "Frontend Developer",
    level: "entry",
    type: "Technical",
    techstack: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    duration: 30,
  },
  {
    role: "Backend Developer",
    level: "mid",
    type: "Mixed",
    techstack: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Docker"],
    duration: 45,
  },
  {
    role: "Full Stack Developer",
    level: "senior",
    type: "Technical",
    techstack: ["React/Vue", "Node.js", "System Design", "AWS", "Microservices"],
    duration: 60,
  },
  {
    role: "DevOps Engineer",
    level: "mid",
    type: "Technical",
    techstack: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"],
    duration: 45,
  },
  {
    role: "Mobile Developer",
    level: "entry",
    type: "Technical",
    techstack: ["React Native", "Flutter", "Mobile UI/UX", "REST APIs"],
    duration: 30,
  },
  {
    role: "Data Engineer",
    level: "senior",
    type: "Technical",
    techstack: ["Apache Spark", "Airflow", "SQL", "Python", "Cloud Data"],
    duration: 60,
  },
  {
    role: "UI/UX Designer",
    level: "mid",
    type: "Mixed",
    techstack: ["Figma", "User Research", "Prototyping", "Design Systems"],
    duration: 45,
  },
  {
    role: "Software Engineer",
    level: "entry",
    type: "Behavioral",
    techstack: ["Communication", "Teamwork", "Problem Solving", "Adaptability"],
    duration: 30,
  },
  {
    role: "Senior Software Engineer",
    level: "senior",
    type: "Behavioral",
    techstack: ["Leadership", "Mentorship", "Technical Strategy", "Conflict Resolution"],
    duration: 45,
  },
  {
    role: "Cloud Architect",
    level: "senior",
    type: "Technical",
    techstack: ["AWS/Azure/GCP", "Cloud Architecture", "Security", "Kubernetes"],
    duration: 60,
  },
  {
    role: "QA Engineer",
    level: "mid",
    type: "Mixed",
    techstack: ["Test Automation", "Selenium/Cypress", "API Testing", "CI/CD"],
    duration: 45,
  },
  {
    role: "Product Manager",
    level: "mid",
    type: "Behavioral",
    techstack: ["Stakeholder Management", "Prioritization", "User Research", "Data Analysis"],
    duration: 45,
  },
];

async function createInterviewFromTemplate(userId: string, template: any) {
  const interviewData = {
    ...template,
    userId,
    cover: getRandomInterviewCover(),
    createdAt: new Date().toISOString(),
    finalized: false,
    questions: [],
  };

  const docRef = await db.collection("interviews").add(interviewData);
  return docRef.id;
}


async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="#interviews">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section id="interviews" className="flex flex-col gap-6 mt-8">
        <h2>Take Interview</h2>

        <div className="interviews-section">
          {interviewTemplates.map((template, index) => (
            <div key={index} className="card-border w-90 max-sm:w-full min-h-96">
              <div className="card-interview">
                <div>
                  <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className="badge-text capitalize">{template.type}</p>
                  </div>

                  <Image
                    src={getRandomInterviewCover()}
                    alt={template.role}
                    width={90}
                    height={90}
                    className="rounded-full object-fit size-22.5"
                  />

                  <h3 className="mt-5 capitalize">{template.role} Interview</h3>

                  <div className="flex flex-row gap-5 mt-3">
                    <div className="flex flex-row gap-2">
                      <Image
                        src="/calendar.svg"
                        width={22}
                        height={22}
                        alt="level"
                      />
                      <p className="capitalize">{template.level}</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                      <Image src="/star.svg" width={22} height={22} alt="duration" />
                      <p>{template.duration} min</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {template.techstack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-dark-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {template.techstack.length > 3 && (
                      <span className="text-xs px-3 py-1 bg-dark-300 rounded-full">
                        +{template.techstack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <form
                  action={async () => {
                    "use server";
                    if (!user?.id) {
                      redirect("/sign-in");
                    }
                    const interviewId = await createInterviewFromTemplate(
                      user.id,
                      template
                    );
                    redirect(`/interview/${interviewId}`);
                  }}
                >
                  <Button type="submit" className="btn-primary w-full">
                    Start Interview
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;