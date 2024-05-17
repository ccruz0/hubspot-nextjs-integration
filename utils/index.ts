import _ from "lodash";

export const contactsCols = [
  "firstname",
  "lastname",
  "email",
  "is_customer",
  "last_purchase_date",
  "unique_id"
]

export const dealsCols = [
  "dealname",
  "dealstage",
  "close date",
  "associated contact"
]

export function hasAllKeys(obj: any, keys: any) {
  return _.every(keys, (key) => _.has(obj, key));
}