import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GenerateQuestions, InterviewQuestion } from "@/lib/types/index";
import { Together } from "together-ai";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY }); // Store key in .env

export async function POST(req: NextRequest) {
    try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // Parse request body
        const body: GenerateQuestions = await req.json();
        const { jobId, category, difficulty, count } = body;

        // Validate input
        if (!jobId || !category || !difficulty || !count) {
            return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
        }

        // Define prompt for AI model
        const prompt = `
            Generate ${count} interview questions for a ${jobId} role.
            Category: ${category}, Difficulty: ${difficulty}.
            Format: JSON array of objects with "id", "question", "category", "difficulty".
        `;

        // Call Together AI API
        const response = await together.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            max_tokens: 800
        });

        const aiResponse = response.choices[0]?.message?.content?.trim() ?? '';

        // Parse AI response
        const questions: InterviewQuestion[] = JSON.parse(aiResponse);

        return NextResponse.json({ questions, success: true }, { status: 200 });

    } catch (error) {
        console.error("Error generating questions:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
