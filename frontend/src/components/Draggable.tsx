import { useSortable } from '@dnd-kit/react/sortable'

interface DraggableProps {
  id: number
  index: number
  group: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export default function Draggable({
  id,
  index,
  group,
  children,
  className,
  disabled,
}: DraggableProps) {
  const { ref, isDragging } = useSortable({ id, index, group, disabled })

  return (
    <div
      ref={ref}
      className={`${className} ${isDragging ? 'opacity-50' : '1'} ${disabled ? 'cursor-default' : 'cursor-grab'} touch-none`}
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
