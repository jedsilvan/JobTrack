import { useDraggable } from '@dnd-kit/react'

interface DraggableProps {
  id: number
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export default function Draggable({
  id,
  children,
  className,
  disabled,
}: DraggableProps) {
  const { ref, isDragging } = useDraggable({ id, disabled })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: disabled ? 'default' : 'grab',
        touchAction: 'none',
      }}
    >
      {children}
    </div>
  )
}
