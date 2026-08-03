import { useState } from 'react'
import { Plus } from 'lucide-react'

import {
  PROJECT_STATUS_OPTIONS,
  ProjectFormDialog,
  ProjectsTable,
  useDeleteProject,
  useProjects,
  type Project,
  type ProjectStatus,
} from '@/features/projects'
import { useTableQuery } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import { PageShell } from '@/shared/ui/page-shell'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { TablePagination } from '@/shared/ui/table-pagination'

const ALL = 'all'

export function ProjectsPage() {
  const { search, setSearch, setPage, params } = useTableQuery()
  const [status, setStatus] = useState<ProjectStatus | typeof ALL>(ALL)

  const { data, isLoading } = useProjects({
    ...params,
    ...(status !== ALL && { status }),
  })
  const deleteProject = useDeleteProject()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)

  const openCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  return (
    <PageShell
      title="Projects"
      description="Mijozlar loyihalari"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Loyiha nomi bo'yicha qidirish..."
      filters={
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as ProjectStatus | typeof ALL)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Barcha holatlar</SelectItem>
            {PROJECT_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
      action={
        <Button onClick={openCreate}>
          <Plus />
          Yangi loyiha
        </Button>
      }
    >
      <ProjectsTable
        data={data?.items ?? []}
        isLoading={isLoading}
        onEdit={(project) => {
          setEditing(project)
          setDialogOpen(true)
        }}
        onDelete={(id) => deleteProject.mutate(id)}
      />

      {data && <TablePagination meta={data.meta} onPageChange={setPage} />}

      <ProjectFormDialog open={dialogOpen} onOpenChange={setDialogOpen} project={editing} />
    </PageShell>
  )
}
