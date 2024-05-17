import { hubspotClient } from "@/hubspot/client"
import { NextApiRequest } from "next"

export async function GET() {
  try {
    const owners = await hubspotClient.crm.owners.ownersApi.getPage()
    return Response.json(owners.results)

  } catch(e) {
    return Response.error()
  }
}