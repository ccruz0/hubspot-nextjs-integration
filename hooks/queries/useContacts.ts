import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useContacts() {
  const {data, isLoading, error} = useSWR(
    "/api/crm/contacts",
    fetcher
  )
  return {
    contacts: data,
    isLoading,
    error
  }
}