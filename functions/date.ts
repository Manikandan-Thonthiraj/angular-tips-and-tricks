export const isValidDate = function(date: Date): boolean {
  return date && !isNaN(new Date(date).getTime());
}