import type { APIRoute } from "astro";

import { processContactSubmission } from "@/services/contact.service";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const requestId = crypto.randomUUID();

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return json(
        {
          ok: false,
          requestId,
          message: "Content-Type debe ser application/json.",
        },
        415,
      );
    }

    const body: unknown = await request.json();
    const result = await processContactSubmission(body);
    return json(result, result.ok ? 200 : 400);
  } catch (error) {
    console.error("[api/contact]", error);
    return json(
      {
        ok: false,
        requestId,
        message: "No se pudo procesar la solicitud.",
      },
      500,
    );
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
