import { getDisplayName } from "../utilities";
import { ContextReducerProvider } from "../components/ContextProvider";

export const withContextProvider = (
  ContextController,
  ContextObj,
  reducer,
  initialValue = {},
) => {
  const WithContextProvider = (props) => (
    <ContextReducerProvider
      contextObj={ContextObj}
      value={initialValue}
      reducer={reducer}
    >
      <ContextController {...props} />
    </ContextReducerProvider>
  );
  WithContextProvider.displayName = `WithSubscription(${getDisplayName(
    ContextController,
  )})`;
  return WithContextProvider;
};
