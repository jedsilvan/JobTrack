import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import Draggable from '../components/Draggable'
import Droppable from '../components/Droppable'
import { ApplicationCard } from '../components/Card'
import {
  ApplicationStatus,
  APPLICATION_STATUS_OPTIONS,
  type Application,
} from '../models'
import { mockApplications } from '../mock'

const initialApplications: Application[] = mockApplications

export default function Board() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications)

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return

        const { source, target } = event.operation
        if (!target) return

        const applicationId = source?.id
        const newStatus = target.id as ApplicationStatus

        setApplications((prev) =>
          prev.map((application) =>
            application.id === applicationId && application.status !== newStatus
              ? { ...application, status: newStatus }
              : application,
          ),
        )
      }}
    >
      <div className="container-max-w grid grid-cols-4 gap-4 mb-4 lg:mb-8">
        {APPLICATION_STATUS_OPTIONS.map(({ value: status, label }) => {
          const columnApplications = applications.filter(
            (application) => application.status === status,
          )

          return (
            <div key={`column-${status}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-secondary">{label}</p>
                <p className="text-primary/50 text-sm bg-(--color-border)/50 rounded-md px-1 pb-0.5 text-xs">
                  {columnApplications.length}
                </p>
              </div>
              <Droppable id={status} className="flex flex-col gap-2">
                {columnApplications.map((application) => (
                  <Draggable key={application.id} id={application.id}>
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
