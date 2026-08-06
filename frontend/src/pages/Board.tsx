import { JobCard } from '../components/Card'
import { ApplicationStatus } from '../models'

export default function Board() {
  return (
    <div className="container-max-w columns-1 sm:columns-4 mb-4 lg:mb-8">
      {Object.values(ApplicationStatus).map((role) => (
        <div key={`column-${role}`}>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-secondary capitalize">{role}</p>
            <p className="text-primary/50 text-sm bg-(--color-border)/50 rounded-md px-1 pb-0.5 text-xs">
              3
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      ))}
    </div>
  )
}
