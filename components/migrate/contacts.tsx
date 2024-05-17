"use client"

import { TContact, TDeal } from "@/types"
import { useTheme } from '@table-library/react-table-library/theme';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import _ from "lodash"
import React, { FC, useEffect, useMemo } from 'react'
import { buttonClassNames } from "@/app/migrate/page";
import { useQueue, useToggle } from "@uidotdev/usehooks";
import { parseDeal } from "@/utils/deals";
import { TParsedContact } from "@/utils/contacts";
import { useOwnerStore } from "@/store/owner";

const columns: {
  label: string,
  renderCell: (item: TParsedContact) => void
}[] = [
  {
      label: "ID",
      renderCell(item) {
        return item.unique_id
      },
  },
  {
      label: "Full Name",
      renderCell(item) {
        return `${item.firstname} ${item.lastname}`
      },
  },
  {
      label: "Email",
      renderCell(item) {
        return item.email
      },
  },
  {
      label: "Contact Deals",
      renderCell(item) {
        return `${item.deals.length} Deals`
      },
  }
]

const ContactsTable: FC<{
  contacts: TContact[],
  setContacts: (contacts: TContact[]) => void,
  deals: TDeal[],
  setDeals: (deal: TDeal[]) => void
}> = ({ contacts, setContacts, deals, setDeals }) => {
  const [processing, setProcessing] = useToggle(false)
  const theme = useTheme(getTheme())
  const {owner: ownerId} = useOwnerStore()

  const parsedContacts = useMemo(
    (): TParsedContact[] => {
      if (contacts.length == 0 && deals.length == 0) return []
      return _.map(
        contacts,
        (contact) => {
          const contactDeals = _.map(
            _.filter(
              deals,
              (deal: TDeal) => contact.unique_id.startsWith(deal["associated contact"])
            ),
            (deal) => parseDeal(deal, contact)
          )
          return {
            ...contact, deals: contactDeals
          }  as TParsedContact
        }
      )
    },
    [contacts, deals]
  )
  
  const { size, queue, remove, first, last, clear, add } = useQueue(parsedContacts)

  console.log(last)

  function processItem(item: TParsedContact) {
    fetch(
      "/api/crm/contacts",
      {
        method: "PUT",
        body: JSON.stringify({
          ownerId,
          contact: item
        })
      }
    ).then(() => {
      remove()
    })
    .catch(() => {
      remove()
      add(item)
    })
  }

  useEffect(
    () => {
      if (processing && first) {
        processItem(first)
      }
      if (processing && size === 0) {
        onDiscard()
      }
    },
    [queue, processing]
  )

  function handleProcess() {
    if (ownerId === "") return alert("You must select an owner to work with")
    if (!processing) {
      setProcessing(true)
    }
  }

  function onDiscard() {
    if (!processing) {
      setContacts([])
      setDeals([])
      clear()
    }
  }

  return (
    <div className="bg-zinc-50 border border-zinc-100 rounded p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <p className="text-xl">Migrate deals & contacts</p>
        <div className="flex-1"></div>
        {
          processing && (
            <button className={buttonClassNames} onClick={() => setProcessing(false)}>⏹️ Pause</button>
          )
        }
        <button disabled={processing} className={buttonClassNames} onClick={handleProcess}>
          {
            queue.length < size
              ? `Continue (${contacts.length})`
              : `Save all (${contacts.length})`
          }
        </button>
        <button disabled={processing} className={`${buttonClassNames} bg-red-100 text-red-500`} onClick={onDiscard}>Discard all 🗑️</button>
      </div>
      {
        processing && (
          <div className="flex gap-1">
            {`Migrating Items:`}<b>{queue.length}</b>{`remaining`}
          </div>
        )
      }
      <div className="border rounded">
        <CompactTable
          columns={columns}
          data={{ nodes: queue }}
          theme={theme}
        />
      </div>
    </div>
  )
}

export default ContactsTable