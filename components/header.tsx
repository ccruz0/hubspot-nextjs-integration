import Link from "next/link"
import React from 'react'
import OwnerSelector from "./ownerSelect"

const AppHeader = () => {
  return (
    <div className="flex flex-col p-4 gap-4 border-b border-inherit">
      <div className="text-3xl font-semibold">Migration Tool</div>
      <div className="flex gap-4 border-inherit">
        <Link
          href="/migrate"
          className="text-orange-50 bg-orange-500  border border-orange-600  px-4 py-2 rounded text-xs"
        >
          New migration
        </Link>
        <OwnerSelector />
        <div className="flex-1"></div>
        <Link href="/contacts" className="text-zinc-800 border border-inherit px-4 py-2 rounded text-xs">Contacts</Link>
        <Link href="/deals" className="text-zinc-800 border border-inherit px-4 py-2 rounded text-xs">Deals</Link>
      </div>
      
    </div>
  )
}

export default AppHeader