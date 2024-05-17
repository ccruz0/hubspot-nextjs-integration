"use client"

import useContacts from "@/hooks/queries/useContacts"
import { useTheme } from '@table-library/react-table-library/theme';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Suspense } from "react";

const ContactsTable = () => {
  const {contacts, isLoading} = useContacts()
  const theme = useTheme(getTheme())

  if (isLoading) {
    return (
      <div>Loading contacts...</div>
    )
  }

  if (!contacts || contacts.length === 0) return void null
  
  const COLUMNS = [
    {
      label: "Contact ID",
      renderCell: (item: any) => item.id
    },
    {
      label: "First Name",
      renderCell: (item: any) => item.properties.firstname
    },
    {
      label: "Last Name",
      renderCell: (item: any) => item.properties.lastname
    },
    {
      label: "Email",
      renderCell: (item: any) => item.properties.email
    },
    {
      label: "Archived",
      renderCell: (item: any) => item.archived ? "Archived" : "Not archived"
    }
  ]
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompactTable
        columns={COLUMNS}
        theme={theme}
        data={
          {
            nodes: contacts
          }
        }
        
      />
    </Suspense>
  )
}

export default ContactsTable