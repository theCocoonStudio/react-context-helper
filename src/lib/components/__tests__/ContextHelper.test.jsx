import { ContextProvider, ContextReducerProvider } from "../ContextProvider";
import { createContext, useContext } from "react";
import { mount } from "enzyme";
import React from "react";

test("ContextProvider: context is accessible with class components", () => {
  const contextObj = createContext({});

  class Child extends React.Component {
    render() {
      return <div></div>;
    }
  }
  Child.contextType = contextObj;
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.context().message).toBe("pass");
});

test("ContextProvider: context is accessible with function components", () => {
  const contextObj = createContext({});
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

test("ContextProvider: context-changing functions working", () => {
  const contextObj = createContext({});
  const Child = () => {
    const context = useContext(contextObj);
    const { updateContext, removeFromContext, message, toRemain } = context;
    return (
      <>
        <div
          id="update"
          onClick={() => {
            updateContext({ message: "post" });
          }}
        >
          {"message" in context ? message : "deleted"}
        </div>
        <div
          id="remove"
          onClick={() => {
            removeFromContext(["message"]);
          }}
        />
        <div id="remain">{toRemain}</div>
      </>
    );
  };
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pre", toRemain: "on" },
    },
  });
  expect(wrapper.find("#update").text()).toBe("pre");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#update").simulate("click");
  expect(wrapper.find("#update").text()).toBe("post");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#remove").simulate("click");
  expect(wrapper.find("#update").text()).toBe("deleted");
  expect(wrapper.find("#remain").text()).toBe("on");
});

test("ContextProvider: context-changing reducer working", () => {
  const contextObj = createContext({});
  const reducer = (draft, action) => {
    switch (action.type) {
      case "update":
        Object.assign(draft, action.payload);
        break;
      case "remove":
        action.payload.forEach((key) => {
          delete draft[key];
        });
        break;
      default:
        break;
    }
  };
  const Child = () => {
    const context = useContext(contextObj);
    const { dispatch, message, toRemain } = context;
    return (
      <>
        <div
          id="update"
          onClick={() => {
            dispatch({ type: "update", payload: { message: "post" } });
          }}
        >
          {"message" in context ? message : "deleted"}
        </div>
        <div
          id="remove"
          onClick={() => {
            dispatch({ type: "remove", payload: ["message"] });
          }}
        />
        <div id="remain">{toRemain}</div>
      </>
    );
  };
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextReducerProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pre", toRemain: "on" },
      reducer: reducer,
    },
  });
  expect(wrapper.find("#update").text()).toBe("pre");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#update").simulate("click");
  expect(wrapper.find("#update").text()).toBe("post");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#remove").simulate("click");
  expect(wrapper.find("#update").text()).toBe("deleted");
  expect(wrapper.find("#remain").text()).toBe("on");
});
