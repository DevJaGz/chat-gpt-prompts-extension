export const runOnExtension = (callback) => {
  if (import.meta.env.MODE === "production") {
    callback();
  }
};
