"use client"

import { useOwnerStore } from "@/store/owner"
import { fetcher } from "@/utils/fetcher"
import _ from "lodash"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import useSWR from "swr"

const OwnerSelector = () => {
  const {data, isLoading} = useSWR("/api/crm/owners", fetcher)
  const [value, setValue] = useState("")
  const {setOwner} = useOwnerStore()

  useEffect(
    () => {
      if (data && data.length > 0) {
        const id = _.get(_.first(data), "id", "");
        setValue(id)
        setOwner(id)
      }
    },
    [data]
  )

  useEffect(
    () => {
      setOwner(value)
    },
    [value]
  )

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value)
  }

  if (isLoading) return (
    <div>Loading...</div>
  )

  return (
    <Fragment>
      <select
        className="text-zinc-800 border border-inherit px-4 py-2 rounded text-xs"
        onSelect={handleChange}
        defaultValue={value}
      >
        {
          _.map(
            data,
            (option) => (
              <option key={option.id} value={option.id}>
                {`${option.firstName} <${option.email}>`}
              </option>
            )
          )
        }
      </select>
    </Fragment>
  )
}

export default OwnerSelector