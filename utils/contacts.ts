import { TContact, TDeal } from "@/types";
import { TParsedDeal } from "./deals";

export interface TParsedContact extends TContact {
  deals: TParsedDeal[]
}

export function generateContactID(contact: TContact): string {
  return `${contact.firstname}${contact.lastname}${contact.email}`
}

export function generateCreateContactBody(contact: TParsedContact) {
  return {
    email: contact.email,
    firstname: contact.firstname,
    lastname: contact.lastname,
    is_customer: contact.is_customer === "TRUE" ? "true" : "false",
    last_purchase_date: contact.last_purchase_date
  }
}
