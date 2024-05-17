"use client"

import { fetcher } from "@/utils/fetcher"
import React, { FC, PropsWithChildren } from 'react'
import useSWR from "swr"

const AuthorizedLayout: FC<PropsWithChildren> = ({children}) => {
  const {data, isLoading} = useSWR("/api/authorized", fetcher)

  if (data && !data.authorized) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>There has been an error with the authorization key</p>
      </div>
    )
  }

  if (isLoading) return (
    <div className="p-4">
      Loading...
    </div>
  )
  return children
}

export default AuthorizedLayout