import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

// Fallback questions when API quota is exceeded
const generateFallbackQuestions = (
  role: string,
  level: string,
  techstack: string,
  type: string,
  amount: number
): string[] => {
  const techArray = techstack.split(",").map((t) => t.trim());
  const isTechnical =
    type.toLowerCase().includes("technical") ||
    type.toLowerCase().includes("mixed");
  const isBehavioral =
    type.toLowerCase().includes("behavioral") ||
    type.toLowerCase().includes("mixed");

  const questions: string[] = [];

  // Technical questions
  const technicalQuestions = [
    `Can you explain your experience with ${
      techArray[0] || "your primary technology"
    }?`,
    `How would you approach debugging a complex issue in ${
      techArray[0] || "a production environment"
    }?`,
    `What are the key differences between ${techArray[0]} and similar technologies you have worked with?`,
    `Describe a challenging project you built using ${techArray.join(", ")}.`,
    `How do you stay updated with the latest trends in ${
      techArray[0] || "technology"
    }?`,
    `What best practices do you follow when working with ${techArray.join(
      " and "
    )}?`,
    `Can you explain a recent technical challenge you faced and how you solved it?`,
    `How would you optimize performance in an application built with ${techArray[0]}?`,
  ];

  // Behavioral questions
  const behavioralQuestions = [
    `Tell me about yourself and your experience as a ${role}.`,
    `Why are you interested in this ${role} position?`,
    `Describe a time when you had to work under pressure. How did you handle it?`,
    `Tell me about a situation where you had to collaborate with a difficult team member.`,
    `What are your greatest strengths and weaknesses as a ${role}?`,
    `Where do you see yourself in 5 years in your career?`,
    `Describe a project you are most proud of and why.`,
    `How do you handle feedback and criticism?`,
  ];

  // Mix questions based on type
  if (isTechnical && isBehavioral) {
    // Mixed: alternating technical and behavioral
    const halfAmount = Math.ceil(amount / 2);
    questions.push(...technicalQuestions.slice(0, halfAmount));
    questions.push(...behavioralQuestions.slice(0, amount - halfAmount));
  } else if (isTechnical) {
    questions.push(...technicalQuestions.slice(0, amount));
  } else {
    questions.push(...behavioralQuestions.slice(0, amount));
  }

  return questions.slice(0, amount);
};

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  let questions: string[] = [];
  let usedFallback = false;

  try {
    // Try to generate questions using AI
    const { text: aiQuestions } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    questions = JSON.parse(aiQuestions);
  } catch (error: any) {
    console.warn(
      "AI generation failed, using fallback questions:",
      error?.message
    );

    // Check if it's a quota error
    if (error?.statusCode === 429 || error?.message?.includes("quota")) {
      console.log("📊 Quota exceeded - using intelligent fallback questions");
    }

    // Use fallback questions
    questions = generateFallbackQuestions(role, level, techstack, type, amount);
    usedFallback = true;
  }

  try {
    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions: questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
      generatedBy: usedFallback ? "fallback" : "ai",
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      {
        success: true,
        usedFallback,
        message: usedFallback
          ? "Interview created with curated questions (AI quota reached)"
          : "Interview created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to save interview",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
