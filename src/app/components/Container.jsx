import { useContext } from "react";
import { ContextObj } from "./ContextProvider";
import { ContextObj as CustomContextObj } from "./CustomProvider";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import dracula from "react-syntax-highlighter/dist/esm/styles/prism/dracula";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const codeString = `</ContextOneProvider>
  <ContextTwoProvider>
    <RenderedElements />
  </ContextTwoProvider>
</ContextOneProvider>`;

const Container = () => {
  const { one, two, updateContext } = useContext(CustomContextObj);
  const { one: otherOne } = useContext(ContextObj);

  const onClick = () => updateContext({ one: one + 1, two: two + 2 });

  return (
    <>
      <div className="mainContainer1">
        <h3>
          Example: <code>withContextProvider</code>
        </h3>
        <div className="instructionContainer1">
          <div className="clicker">
            <span>Click me</span>
          </div>
          <div className="syntaxWrap">
            <SyntaxHighlighter
              showLineNumbers
              className="syntax"
              language="jsx"
              style={dracula}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>

        <div id="container">
          <div onClick={onClick} className="child" id="child1">
            Clicking here will update <code>contextOne</code> by:
            <ul>
              <li>
                adding 1 to <code>contextOne.one</code>
              </li>
              <li>
                adding 2 to <code>contextOne.two</code>
              </li>
            </ul>
            <code>contextOne.one</code>: {one}
            <br />
            <code>contextOne.two</code>: {two}
          </div>
          <div className="child" id="child2">
            Clicking on the blue box will trigger{" "}
            <code>{"<ContextTwoProvider>"}</code> to add 1 to{" "}
            <code>contextTwo.one</code>:<br />
            <br />
            <code>contextTwo.one</code>: {otherOne}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
