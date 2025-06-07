"use client"
import ContactsTable from "@/components/migrate/contacts";
import { TContact, TDeal } from "@/types";
import { contactsCols, dealsCols } from "@/utils";
import { generateContactID } from "@/utils/contacts";
import * as d3 from "d3";
import _ from "lodash"
import { useState } from "react";

type TMode = "contacts" | "deals"

import { buttonClassNames } from "@/components/styles/buttonClassNames";

function hasAllKeys(obj: any, keys: any) {
  return _.every(keys, (key) => _.has(obj, key));
}

const MigrationPage = () => {
  const [contacts, setContacts] = useState<TContact[]>([])
  const [deals, setDeals] = useState<TDeal[]>([])

  function handleCSVFormat(
    data: any[],
    validator: string[],
    handler: (data: any[]) => void
  ) {
    const accepted = _.filter(data, (item) => hasAllKeys(item, validator))
    if (accepted.length === 0) {
      return alert(`Invalid format, the CSV must contain the following columns: ${validator.join(", ")}`)
    } else {
      handler(accepted)
    }
  }

  function readFile(file: File, mode: TMode) {
    const reader = new FileReader()

    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (e.target) {
        const text = e.target.result;
        const csvData = d3.csvParse(text as string);
        if (mode === "contacts") {
          return handleCSVFormat(
            csvData,
            contactsCols,
            (contacts) => setContacts(
              _.map(
                contacts,
                (contact) => ({
                  ...contact,
                  unique_id: generateContactID(contact)
                })
              )
            )
          )
        }
        if (mode === "deals") {
          return handleCSVFormat(csvData, dealsCols, setDeals)
        }
      }
    };

    reader.readAsText(file);
  }

  

  const handleFileDialogOpen = async (mode: TMode) => {
    const input = document.createElement('input')
    input.type = "file"
    input.accept = ".csv"
    input.multiple = false
    input.onchange = async function onChange(this: GlobalEventHandlers) {
      const {files} = this as HTMLInputElement
      if (files && files.length > 0) {
        const file = files[0]
        readFile(file, mode)
      }
    }
    input.click()
  }

  return (
    <div className="m-4 border border-inherit p-4 rounded flex flex-col gap-4">
      <p>Upload your contacts and deals to start processing your migration</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleFileDialogOpen("contacts")}
          className={buttonClassNames}
          disabled={contacts.length > 0}
        >
          {
            contacts.length > 0
              ? `${contacts.length} contacts imported`
              : "Import contacts CSV 📒"
          }
        </button>
        <button
          onClick={() => handleFileDialogOpen("deals")}
          className={buttonClassNames}
          disabled={contacts.length === 0 || deals.length > 0}
        >
          {
            deals.length > 0
              ? `${deals.length} deals imported`
              : "Import deals CSV 📄"
          }
        </button>
      </div>
      {
        (
          contacts.length > 0
          && deals.length > 0
        ) && (
          <ContactsTable
            contacts={contacts}
            setContacts={setContacts}
            deals={deals}
            setDeals={setDeals}
          />
        )
      }
    </div>
  )
}

export default MigrationPage
