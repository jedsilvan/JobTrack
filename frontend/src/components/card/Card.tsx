interface CardProps {
  children?: React.ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-(--color-card) rounded-xl border border-solid border-border p-3 ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
