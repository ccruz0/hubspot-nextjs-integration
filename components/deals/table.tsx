"use client"

import { useTheme } from '@table-library/react-table-library/theme';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Suspense } from "react";
import useDeals from "@/hooks/queries/useDeals";

const DealsTable = () => {
  const {deals, isLoading} = useDeals()
  const theme = useTheme(getTheme())

  if (isLoading) {
    return (
      <div>Loading deals...</div>
    )
  }

  if (!deals || deals.length === 0) return void null
  
  const COLUMNS = [
    {
      label: "Deal ID",
      renderCell: (item: any) => item.id
    },
    {
      label: "Name",
      renderCell: (item: any) => item.properties.dealname
    },
    {
      label: "Amount",
      renderCell: (item: any) => {
        let USDollar = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return USDollar.format(Number(item.properties.amount))
      }
    },
    {
      label: "Created",
      renderCell: (item: any) => new Date(item.properties.createdate).toLocaleDateString("en-US")
    },
    {
      label: "Closed",
      renderCell: (item: any) => new Date(item.properties.closedate).toLocaleDateString("en-US")
    }
  ]
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompactTable
        columns={COLUMNS}
        theme={theme}
        data={
          {
            nodes: deals
          }
        }
        
      />
    </Suspense>
  )
}

export default DealsTable