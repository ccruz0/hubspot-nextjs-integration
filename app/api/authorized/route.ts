import { hubspotClient } from "@/hubspot/client";

export function GET() {
  const hasApiKey = hubspotClient.config.accessToken ? true : false

  return Response.json({
    authorized: hasApiKey
  }, {
    status: hasApiKey ? 200 : 403
  })
}