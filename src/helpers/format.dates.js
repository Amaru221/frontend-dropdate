export const format = (n) => String(n).padStart(2, "0");

export function formatReleaseDate(date) {
  if (!date) return "TBA";

  const d = new Date(date);
  const now = new Date();

  const sameYear = d.getFullYear() === now.getFullYear();

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(d);

  return formatted;
}

export function formatReleaseFullDate(date) {
  if (!date) return "TBA";

  const d = new Date(date);
  const now = new Date();

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

  return formatted;
}

export function getTimeLeft(date) {
  const diff = new Date(date) - new Date();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}