export const composeProviders =
  (...ContextProviders) =>
  ({ children }) =>
    ContextProviders.reduce(
      (Accumulator, Current) => <Current>{Accumulator}</Current>,
      children,
    );
