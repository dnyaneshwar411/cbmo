// app/api/stream/route.ts
import { envVars } from "@/provider/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenerativeAI(envVars.geminiKey || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userInput = body.text;

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: userInput }] }],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong." },
      { status: 500, }
    );
  }
}