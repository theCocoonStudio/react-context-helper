const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

import {
  ContextProvider,
  /* ContextReducerProvider, */
} from "../components/ContextProvider";

export const withContextProvider = (
  ContextController,
  ContextObj,
  initialValue = {},
) => {
  const WithContextProvider = (props) => (
    <ContextProvider contextObj={ContextObj} value={initialValue}>
      <ContextController {...props} />
    </ContextProvider>
  );
  WithContextProvider.displayName = `WithSubscription(${getDisplayName(
    ContextController,
  )})`;
  return WithContextProvider;
};
