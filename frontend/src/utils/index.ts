/**
 * Formats a Unix timestamp into a human-readable string.
 *
 * The formatted string will be in the format `dd-mm-yyyy hh:mm am/pm`.
 * The date and time will be in the `en-GB` locale.
 *
 * @param unixTimestamp - The Unix timestamp to format, in seconds.
 * @returns The formatted date and time string.
 */
export function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000)
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
