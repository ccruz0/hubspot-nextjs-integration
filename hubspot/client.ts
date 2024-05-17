// @ts-ignore
import * as hubspot from "@hubspot/api-client"
export const hubspotClient = new hubspot.Client({ accessToken: process.env.APP_ACCESS_KEY });