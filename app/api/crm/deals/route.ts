import { hubspotClient } from "@/hubspot/client"
import { NextApiRequest } from "next"

export async function GET(
  req: NextApiRequest,
) {
  try {
    const deals = await hubspotClient.crm.deals.getAll()
    return Response.json(deals)

  } catch(e) {
    return Response.error()
  }
}