import { useDroppable } from '@dnd-kit/react'

interface DroppableProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function Droppable({ id, children, className }: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id })

  return (
    <div
      ref={ref}
      className={`${className} ${isDropTarget && 'outline-2 outline-offset-2 outline-primary/10'} min-h-[5.625rem] rounded-md p-0.5`}
    >
      {children}
    </div>
  )
}
