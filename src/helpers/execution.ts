export const runWhenUsingCommandLine = (callback: () => void) => {
  if (process.argv[2] === "--execute") {
    callback();
  }
}
