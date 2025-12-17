import type { AiInsight } from "@/types";

const AI_INSIGHTS_URL =
  "https://rt54ed3xuxqnc4j32j4ghk3eqy0qgmzb.lambda-url.ap-southeast-1.on.aws/"; // or from env

export async function fetchAiInsights(): Promise<AiInsight[]> {
  const res = await fetch(AI_INSIGHTS_URL);
  if (!res.ok) throw new Error("Failed to load AI insights");

  const data = await res.json() as { body: string } | AiInsight[];

  // If you’re calling the Lambda URL directly, API Gateway-style wrappers may not exist.
  // You already return the raw array in body, so:
  if (Array.isArray(data)) {
    return data;
  }

  // If your client sees the outer statusCode/headers, parse body:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (data as any).body === "string") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse((data as any).body) as AiInsight[];
  }

  return [];
}
