import { ContextProvider } from "../components/ContextHelper";
import { createContext, useContext } from "react";
import { mount } from "enzyme";
import React from "react";

let contextObj, wrapper;
class Child extends React.Component {
  render() {
    return <div></div>;
  }
}

beforeEach(() => {
  contextObj = createContext({});
  Child.contextType = contextObj;
});

test("context is accessible with class components", () => {
  wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.context().message).toBe("pass");
});

test("context is accessible with function components", () => {
  const Child = () => {
    const testContext = useContext(contextObj);
    return <div>{testContext.message}</div>;
  };
  wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.text()).toBe("pass");
});
