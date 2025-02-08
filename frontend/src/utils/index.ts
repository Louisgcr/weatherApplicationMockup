export function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000) // Convert to milliseconds
  return date
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace(',', '')
    .toLowerCase()
    .replaceAll('/', '-')
}
