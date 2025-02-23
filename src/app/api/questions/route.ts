import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ error: "Job role is required" }, { status: 400 });
    }

    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      console.error("TOGETHER_API_KEY is not set");
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    console.log("Making API request to Together AI");

    const response = await fetch("https://api.together.xyz/inference", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo", // Updated to a likely valid model name
        prompt: `Generate 5 technical interview questions for a ${role} role.`,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`API request failed with status ${response.status}: ${text}`);
      return NextResponse.json({ error: "API request failed" }, { status: 500 });
    }

    const data = await response.json();
    console.log("🔍 Together AI Response:", data);

    if (data.error) {
      console.error("API error:", data.error);
      return NextResponse.json({ error: `API error: ${data.error.message}` }, { status: 500 });
    }

    if (!data.output || !data.output.choices || !data.output.choices[0] || !data.output.choices[0].text) {
      console.error("Invalid AI response:", data);
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    const generatedText = data.output.choices[0].text;
    const questions = generatedText
      .split("\n")
      .filter((q: string) => q.trim() !== "");

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("❌ Error generating interview questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}