import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useDeals() {
  const {data, isLoading, error} = useSWR(
    "/api/crm/deals",
    fetcher
  )
  return {
    deals: data,
    isLoading,
    error
  }
}