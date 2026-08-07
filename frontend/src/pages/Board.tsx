import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import { isSortable } from '@dnd-kit/react/sortable'
import Draggable from '../components/Draggable'
import Droppable from '../components/Droppable'
import { ApplicationCard } from '../components/Card'
import {
  ApplicationStatus,
  APPLICATION_STATUS_OPTIONS,
  type Application,
} from '../models'
import { useApplications, useUpdateApplicationStatus } from '../api/useApplications'

type BoardData = Record<ApplicationStatus, Application[]>

function groupByStatus(applications: Application[]): BoardData {
  const grouped = Object.fromEntries(
    APPLICATION_STATUS_OPTIONS.map(({ value }) => [value, [] as Application[]]),
  ) as BoardData

  for (const application of applications) {
    grouped[application.status].push(application)
  }

  return grouped
}

function resolveStatus(target: unknown): ApplicationStatus | undefined {
  // @ts-expect-error: TODO - find target on dnd-kit docs
  if (isSortable(target)) {
    // dropped on another card — use that card's column/group
    return target.group as ApplicationStatus
  }
  // dropped on empty column space — target.id IS the column status
  return (target as { id?: ApplicationStatus })?.id
}

export default function Board() {
  const { data: applications, isLoading, isError } = useApplications()
  const { mutate: updateStatus } = useUpdateApplicationStatus()

  const [board, setBoard] = useState<BoardData>(() => groupByStatus([]))
  const [prevApplications, setPrevApplications] = useState(applications)

  if (applications !== prevApplications) {
    setPrevApplications(applications)
    setBoard(groupByStatus(applications ?? []))
  }

  if (isLoading) return <p className="container-max-w text-sm text-secondary">Loading board…</p>
  if (isError) return <p className="container-max-w text-sm text-red-500">Couldn't load applications.</p>
  
  return (
    <DragDropProvider
      onDragOver={(event) => {
        setBoard((prev) => move(prev, event))
      }}
      onDragEnd={(event) => {
        if (event.canceled) return

        const { source, target } = event.operation
        if (!source || !target) return

        const newStatus = resolveStatus(target)
        if (!newStatus) return

        const previousStatus = source.data?.group as ApplicationStatus | undefined

        // Update local board immediately so the card stays where it was dropped
        setBoard((prev) => {
          const next = { ...prev }
          next[newStatus] = next[newStatus].map((application) =>
            application.id === source.id
              ? { ...application, status: newStatus }
              : application,
          )
          return next
        })

        // Only hit the server if the column actually changed
        if (previousStatus !== newStatus) {
          updateStatus(
            { id: source.id as number, status: newStatus },
            {
              onError: () => {
                // useUpdateApplicationStatus already rolls back the query
                // cache; re-sync local board state to match
                if (applications) setBoard(groupByStatus(applications))
              },
            },
          )
        }
      }}
    >
      <div className="container-max-w grid grid-cols-4 gap-4 mb-4 lg:mb-8">
        {APPLICATION_STATUS_OPTIONS.map(({ value: status, label }) => {
          const columnApplications = board[status as ApplicationStatus]

          return (
            <div key={`column-${status}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-secondary">{label}</p>
                <p className="text-primary/50 text-sm bg-(--color-border)/50 rounded-md px-1 pb-0.5 text-xs">
                  {columnApplications.length}
                </p>
              </div>
              <Droppable id={status} className="flex flex-col gap-2">
                {columnApplications.map((application, index) => (
                  <Draggable
                    key={application.id}
                    id={application.id}
                    index={index}
                    group={status}
                  >
                    <ApplicationCard {...application} />
                  </Draggable>
                ))}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropProvider>
  )
}
