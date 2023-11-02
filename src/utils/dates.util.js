// Format date to YYYY-MM-DD
export const defaultDateFormat = (date) => {
  if (typeof date === "string") {
    // Format to YYYY-MM-DD
    return date.split("T")[0];
  } else if (typeof date === "object") {
    // Format to YYYY-MM-DD in locale time
    return date.toLocaleDateString("en-GB");
  }
};
