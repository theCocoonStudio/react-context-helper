import { useContext, memo, useState } from "react";

export const useMemoConsumer = (
  ChildComponent,
  ContextObj,
  contextPropsKeys,
) => {
  const context = useContext(ContextObj);

  const contextMap = contextPropsKeys
    .filter((key) => Object.prototype.hasOwnProperty.call(context, key))
    .map((key) => [key, context[key]]);

  const contextProps = Object.fromEntries(contextMap);
  const [Memo] = useState(memo(ChildComponent));

  return [Memo, contextProps];
};

export default { useMemoConsumer };
