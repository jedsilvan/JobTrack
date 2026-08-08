export default function Pill({
  text,
  variant = 'blue',
}: {
  text?: string
  variant?: 'blue' | 'green' | 'red'
}) {
  if (!text) return

  const variants = {
    blue: 'bg-(--color-pill-bg-blue) text-pill-text-blue',
    green: 'bg-(--color-pill-bg-green) text-pill-text-green',
    red: 'bg-(--color-pill-bg-red) text-pill-text-red',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] ${variants[variant]}`}>
      {text}
    </span>
  )
}
