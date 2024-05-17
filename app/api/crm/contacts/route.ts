import { hubspotClient } from "@/hubspot/client"
import { contactsCols, hasAllKeys } from "@/utils"
import { generateCreateContactBody, TParsedContact } from "@/utils/contacts"
import { AssociationSpecAssociationCategoryEnum, SimplePublicObjectInputForCreate } from "@hubspot/api-client/lib/codegen/crm/companies"
import _ from "lodash"
import type { NextApiRequest } from 'next'

 
export async function GET(
  req: NextApiRequest,
) {
  try {
    const contacts = await hubspotClient.crm.contacts.getAll()
    return Response.json(contacts)

  } catch(e) {
    return Response.error()
  }
}

const customStatus = {
  pendingresponse: "184143484",
  pendingcontract: "184204927"
}

const getDealStage = (dealStage: string) => {
  switch(dealStage) {
    case "pendingresponse":
      return customStatus.pendingresponse
    case "pendingcontract":
      return customStatus.pendingcontract
    default:
      return dealStage
  }
}

export async function PUT(
  req: Request
) {
  const body = await req.json()
  const hubspot_owner_id = body.ownerId
  const contact = body.contact as TParsedContact
  try {
    if (!contact || hasAllKeys(contact, [contactsCols])) throw new Error()

    const createdContact = await hubspotClient.crm.contacts.basicApi.create({
      properties: generateCreateContactBody(contact),
      associations: []
    })
    let deals
    if (contact.deals.length > 0) {
      const inputs = contact.deals.map(
        deal => {
          const input = new SimplePublicObjectInputForCreate()
          const { properties } = deal;
          const dealstage = getDealStage(properties.pipeline)
          const pipeline = "default"
          input.properties = { ...properties, dealstage, hubspot_owner_id, pipeline };
          input.associations = [
            {
              to: {
                id: createdContact.id
              },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED" as AssociationSpecAssociationCategoryEnum,
                  associationTypeId: 3
                }
              ]
            }
          ]
          return input
        }
      )
      deals = await hubspotClient.crm.deals.batchApi.create({
        inputs
      })
    }
    return Response.json({contact, deals})
  } catch (e) {
    console.log(e)
    return Response.error()
  }
}
