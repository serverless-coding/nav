import { model, modelID } from "@/ai/providers";
import { weatherTool } from "@/ai/tools";
import { streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request, res: Response) {
  try {
    const {
      messages,
      selectedModel,
    }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

    const result = streamText({
      model: model.languageModel(selectedModel),
      system: "You are a helpful assistant.",
      messages,
      tools: {
        getWeather: weatherTool,
      },
      experimental_telemetry: {
        isEnabled: true,
      },
    });

    return result.toDataStreamResponse({ sendReasoning: true });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" + error, message: error.message }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
