// app/api/stream/route.ts
import { envVars } from "@/provider/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenerativeAI(envVars.geminiKey || "");


export async function POST(req: NextRequest) {
  const body = await req.json();
  const userInput = body.text; // 

  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: userInput }] }],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
