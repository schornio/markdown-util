"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
const react_1 = require("react");
const mdast_util_from_markdown_1 = require("mdast-util-from-markdown");
const COMPONENTS_DEFAULT = {
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    break: () => <br />,
    emphasis: ({ children }) => <em>{children}</em>,
    heading: ({ children, content }) => {
        const Heading = `h${content.depth}`;
        return <Heading>{children}</Heading>;
    },
    image: ({ content }) => {
        var _a;
        return (<img alt={(_a = content.alt) !== null && _a !== void 0 ? _a : undefined} src={content.url}/>);
    },
    link: ({ children, content }) => (<a href={content.url} rel="noopener noreferrer">
      {children}
    </a>),
    list: ({ children, content }) => {
        const List = content.ordered ? "ol" : "ul";
        return <List>{children}</List>;
    },
    listItem: ({ children }) => <li>{children}</li>,
    paragraph: ({ children }) => <p>{children}</p>,
    strong: ({ children }) => <strong>{children}</strong>,
    text: ({ content }) => content.value,
};
function MarkdownContent({ children, components, }) {
    var _a;
    const Component = ((_a = components === null || components === void 0 ? void 0 : components[children.type]) !== null && _a !== void 0 ? _a : COMPONENTS_DEFAULT[children.type]);
    if (Component) {
        return (<Component content={children}>
        {"children" in children ? (<MarkdownChildren components={components}>
            {children.children}
          </MarkdownChildren>) : null}
      </Component>);
    }
    return <strong>NOT Implemented: {children.type}</strong>;
}
function MarkdownChildren({ children, components, }) {
    return (<>
      {children.map((content, index) => (<MarkdownContent components={components} key={index}>
          {content}
        </MarkdownContent>))}
    </>);
}
function Markdown({ children, components, }) {
    const ast = (0, react_1.useMemo)(() => (0, mdast_util_from_markdown_1.fromMarkdown)(children), [children]);
    return (<MarkdownChildren components={components}>{ast.children}</MarkdownChildren>);
}
exports.Markdown = Markdown;
