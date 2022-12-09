import { useMemo } from "react";
import { enableES5 } from "immer";
import { useImmerReducer } from "use-immer";
enableES5();

export const ContextReducerProvider = ({
  value,
  contextObj,
  children,
  reducer,
}) => {
  const [context, dispatch] = useImmerReducer(reducer, value);

  //prevents a rerender in consumers every time the Provider's parent rerenders
  const contextValue = useMemo(
    () => ({ ...context, dispatch }),
    [context, dispatch],
  );
  return (
    <contextObj.Provider value={contextValue}>{children}</contextObj.Provider>
  );
};

export default { ContextReducerProvider };
