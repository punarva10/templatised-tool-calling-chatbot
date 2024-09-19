import { NextResponse } from "next/server";
import OpenAI from "openai";
import { functionRegistry } from "../../../lib/functionRegistry";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const functions = functionRegistry.getAllFunctions().map((f) => ({
      name: f.name,
      description: f.description,
      parameters: f.parameters,
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      functions,
      function_call: "auto",
    });

    const responseMessage = completion.choices[0].message;
    console.log(responseMessage);
    if (responseMessage.function_call) {
      const functionName = responseMessage.function_call.name;
      const functionArgs = JSON.parse(
        responseMessage.function_call.arguments || "{}"
      );

      const func = functionRegistry.getFunction(functionName);
      if (!func) {
        throw new Error(`Function ${functionName} not found`);
      }

      const result = await func.logic(functionArgs);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({
        message: responseMessage.content || "No response",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
