export const runOnProduction = (callback) => {
  if (import.meta.env.MODE !== "development") {
    callback();
  }
};
