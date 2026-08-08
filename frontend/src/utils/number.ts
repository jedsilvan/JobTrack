export function compactNumber(value: number): string {
  if (!value) return ''

  const formattedValue = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

  return formattedValue
}
