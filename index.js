"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mdast_util_from_markdown_1 = require("mdast-util-from-markdown");
const COMPONENTS_DEFAULT = {
    blockquote: ({ children }) => (0, jsx_runtime_1.jsx)("blockquote", { children: children }),
    break: () => (0, jsx_runtime_1.jsx)("br", {}),
    emphasis: ({ children }) => (0, jsx_runtime_1.jsx)("em", { children: children }),
    heading: ({ children, content }) => {
        const Heading = `h${content.depth}`;
        return (0, jsx_runtime_1.jsx)(Heading, { children: children });
    },
    image: ({ content }) => ((0, jsx_runtime_1.jsx)("img", { alt: content.alt ?? undefined, src: content.url })),
    link: ({ children, content }) => ((0, jsx_runtime_1.jsx)("a", { href: content.url, rel: "noopener noreferrer", children: children })),
    list: ({ children, content }) => {
        const List = content.ordered ? "ol" : "ul";
        return (0, jsx_runtime_1.jsx)(List, { children: children });
    },
    listItem: ({ children }) => (0, jsx_runtime_1.jsx)("li", { children: children }),
    paragraph: ({ children }) => (0, jsx_runtime_1.jsx)("p", { children: children }),
    strong: ({ children }) => (0, jsx_runtime_1.jsx)("strong", { children: children }),
    text: ({ content }) => content.value,
};
function MarkdownContent({ children, components, }) {
    const Component = (components?.[children.type] ??
        COMPONENTS_DEFAULT[children.type]);
    if (Component) {
        return ((0, jsx_runtime_1.jsx)(Component, { content: children, children: "children" in children ? ((0, jsx_runtime_1.jsx)(MarkdownChildren, { components: components, children: children.children })) : null }));
    }
    return (0, jsx_runtime_1.jsxs)("strong", { children: ["NOT Implemented: ", children.type] });
}
function MarkdownChildren({ children, components, }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children.map((content, index) => ((0, jsx_runtime_1.jsx)(MarkdownContent, { components: components, children: content }, index))) }));
}
function Markdown({ children, components, }) {
    const ast = (0, react_1.useMemo)(() => (0, mdast_util_from_markdown_1.fromMarkdown)(children), [children]);
    return ((0, jsx_runtime_1.jsx)(MarkdownChildren, { components: components, children: ast.children }));
}
exports.Markdown = Markdown;
