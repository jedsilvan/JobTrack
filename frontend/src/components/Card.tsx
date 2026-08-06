import type { Application } from '../models'
import Pill from './Pill'

export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-(--color-card) rounded-xl border-1 border-solid border-border p-3">
      {children}
    </div>
  )
}

export function ApplicationCard(application: Application) {
  return (
    <div className="bg-(--color-card) hover:border-brand-blue rounded-xl border-1 border-solid border-border py-2 px-3 cursor-grab">
      <h1 className="text-primary text-base text-sm font-medium mb-1">
        {application.role}
      </h1>
      <p className="text-xs text-tertiary mb-2">{application.company}</p>
      <Pill />
    </div>
  )
}
