import { TContact, TDeal } from "@/types";

export type TParsedDeal = {
  properties: {
    amount: string,
    closedate: string,
    dealname: string,
    pipeline: string,
    dealstage: string,
    hubspot_owner_id: string
  },
  associated_contact?: TContact,
  associated_deal: TDeal
}

export function parseDeal(
  deal: TDeal,
  contact?: TContact
): TParsedDeal {
  const hubspot_owner_id = contact ? contact.unique_id : deal["associated contact"]
  return {
    properties: {
      amount: "0",
      closedate: new Date(deal["close date"]).toISOString(),
      dealname: deal.dealname,
      pipeline: deal.dealstage.replaceAll(" ", "").toLowerCase(),
      dealstage: deal.dealstage,
      hubspot_owner_id,
    },
    associated_contact: contact,
    associated_deal: deal
  }
}