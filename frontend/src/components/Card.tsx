import { compactNumber } from '../utils/number'
import { type Application, ApplicationStatus } from '../models'
import Pill from './Pill'

interface CardProps {
  children?: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-(--color-card) rounded-xl border border-solid border-border p-3 ${className}`}
    >
      {children}
    </div>
  )
}

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const handleClick = () => {
    console.log('clicked')
  }

  const isRejected = application.status === ApplicationStatus.Rejected
  const showTags =
    application.status === ApplicationStatus.Applied ||
    application.status === ApplicationStatus.Interview

  return (
    <div
      role="button"
      onClick={handleClick}
      className={`${isRejected ? 'opacity-70' : ''} bg-(--color-card) hover:border-brand-blue rounded-xl border border-solid border-border py-2 px-3 block w-full text-left`}
    >
      <p className="text-primary text-sm font-medium mb-1">
        {application.role}
      </p>
      <p className="text-xs text-tertiary mb-2">{application.company}</p>

      <div className="flex flex-wrap gap-1 min-h-5">
        {showTags &&
          application.tags?.map((tag) => <Pill key={tag} text={tag} />)}

        {application.status === ApplicationStatus.Offer &&
          application.salary && (
            <Pill
              text={`₱${compactNumber(application.salary)}`}
              variant="green"
            />
          )}

        {isRejected && <Pill text="closed" variant="red" />}
      </div>
    </div>
  )
}
