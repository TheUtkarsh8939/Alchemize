import { env } from "$env/dynamic/private";
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../callback/$types";

export const GET: RequestHandler = async ({ url, cookies }) => {
  return new Response(JSON.stringify({ message: "I am a teapot!" }), {
    headers: { "Content-Type": "application/json" },
    status: 418,
  });
};
