import { env } from "$env/dynamic/private";
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../callback/$types";

export const GET: RequestHandler = async ({ url, cookies }) => {
    let airtableToken = env.AIRTABLE;
  let authorize = await fetch(
    "https://api.airtable.com/v0/app0EC6KYM0s4TZPs/Users",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${airtableToken}`,
      },
    },
  );
  
  console.log("Airtable response status:", authorize.status);
  if (!authorize.ok) {
    const errorText = await authorize.text();
    console.error("Airtable error response:", errorText);
    throw error(
      authorize.status,
        `Failed to authorize with Airtable: ${errorText}`,
    );
  }
  console.log("Airtable authorization successful");
  let body = await authorize.json()
  console.log("Airtable response body:", body);
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
};
