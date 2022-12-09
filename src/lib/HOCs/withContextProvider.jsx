import { getDisplayName } from "../utility/utilities";
import {
  ContextProvider,
  /* ContextReducerProvider, */
} from "../components/ContextProvider";

export const withContextProvider = (
  ContextController,
  ContextObj,
  initialValue = {},
) => {
  const WithContextProvider = ({ children, ...props }) => (
    <ContextProvider contextObj={ContextObj} value={initialValue}>
      {ContextController === ContextProvider ? (
        children
      ) : (
        <ContextController {...props}>{children}</ContextController>
      )}
    </ContextProvider>
  );
  WithContextProvider.displayName = `WithContextProvider(${getDisplayName(
    ContextController,
  )})`;
  return WithContextProvider;
};
