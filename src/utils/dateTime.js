export const formatDate = (date, options) =>
  new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options
  }).format(date);

export const formatTime = (date, options) =>
  new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric",
    ...options
  }).format(date);
