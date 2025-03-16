// Simple string concatenation for className handling
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
