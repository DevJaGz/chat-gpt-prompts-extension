export const runOnExtension = async (callback) => {
  if (import.meta.env.MODE !== "production") {
    return;
  }
  callback();
  // // TODO: check if this validation is necessary
  // if (typeof callback === "function") {
  //   callback();
  //   return;
  // } else if (callback instanceof Promise) {
  //   return await callback();
  // }

  // throw new Error("runOnExtension: callback is not a function or a promise");
};
