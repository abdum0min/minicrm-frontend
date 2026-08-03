import type { PaginationMeta } from '@/shared/api'
import { Button } from './button'

interface TablePaginationProps {
  meta: PaginationMeta
  onPageChange: (page: number) => void
}

function buildPages(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages: (number | 'gap')[] = [1]

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push('gap')
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < total - 1) pages.push('gap')

  pages.push(total)

  return pages
}

export function TablePagination({ meta, onPageChange }: TablePaginationProps) {
  if (meta.total === 0) return null

  const from = (meta.page - 1) * meta.limit + 1
  const to = Math.min(meta.page * meta.limit, meta.total)

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-muted-foreground tabular-nums">
        {from} - {to} / {meta.total}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={!meta.hasPreviousPage}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Oldingi
        </Button>

        {buildPages(meta.page, meta.totalPages).map((page, index) =>
          page === 'gap' ? (
            <span key={`gap-${index}`} className="px-1.5 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === meta.page ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={!meta.hasNextPage}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Keyingi
        </Button>
      </div>
    </div>
  )
}
