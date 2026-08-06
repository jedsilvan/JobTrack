import Pill from './Pill'

export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-(--color-card) rounded-xl border-1 border-solid border-border pt-1 pb-3 px-3">
      {children}
    </div>
  )
}

export function JobCard() {
  return (
    <div className="bg-(--color-card) hover:border-brand-blue rounded-xl border-1 border-solid border-border pt-1 pb-3 px-3 cursor-grab">
        <h1 className="text-primary text-base text-md">
          Frontend engineer
        </h1>
        <p className="text-sm text-tertiary mb-2">
          Nimbus Labs
        </p>
        <Pill />
    </div>
  )
}

