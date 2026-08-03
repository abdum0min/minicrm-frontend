import { useMemo, useState } from 'react'

import { useDebounce } from './useDebounce'

interface TableQueryState {
  page: number
  limit: number
  search: string
  debouncedSearch: string
  setPage: (page: number) => void
  setSearch: (search: string) => void
  params: { page: number; limit: number; search?: string }
}

export function useTableQuery(limit = 10): TableQueryState {
  const [page, setPage] = useState(1)
  const [search, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const setSearch = (value: string) => {
    setSearchValue(value)
    setPage(1)
  }

  const params = useMemo(
    () => ({ page, limit, ...(debouncedSearch && { search: debouncedSearch }) }),
    [page, limit, debouncedSearch],
  )

  return { page, limit, search, debouncedSearch, setPage, setSearch, params }
}
