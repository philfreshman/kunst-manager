export const textWithLineBreaks = (input: string): string => {
  return input.replace(/\n/g, "<br/>")
}

export const formatArtwork = (artwork: ArtworkLight): string => {
  return `${artwork.article_id} | ${artwork.name} | ${artwork.title}`
}

export const formatSnapshot = (snapshot_type: snapshotType): string => {
  const formats = {
    offer: "ANGEBOT",
    invoice: "RECHNUNG"
  }
  return formats[snapshot_type] || "Unknown"
}

export const formatDateSpan = (start: string, end: string): string => {
  // Parse the start and end strings into Date objects
  const startDate = new Date(start)
  const endDate = new Date(end)

  // Extract the day, month, and year from both dates
  const startDay = startDate.getDate()
  const startMonth = startDate.getMonth() + 1 // Months are 0-based in JavaScript
  const endDay = endDate.getDate()
  const endMonth = endDate.getMonth() + 1
  const endYear = endDate.getFullYear().toString().slice(-2) // Get the last two digits of the year

  // Format the date span string
  return `${startDay}.${startMonth} - ${endDay}.${endMonth}.${endYear}`
}
