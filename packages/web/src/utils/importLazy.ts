export const lazyImport = (importPath: Promise<any>) =>
  async () => ({ Component: (await importPath).default })
