import { ContextProvider } from "../components/ContextHelper";
import { createContext, useContext } from "react";
import { mount } from "enzyme";
import React from "react";

test("context is accessible", () => {
  const contextObj = createContext({ message: "fail" });
  const Child = () => {
    const testContext = useContext(contextObj);
    return <div>{testContext.message}</div>;
  };

  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.text()).toBe("pass");
});
