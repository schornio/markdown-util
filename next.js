"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = exports.heading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _1 = require("./");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function heading(depthOffset) {
    const Heading = ({ children, content, }) => {
        const depth = Math.min(content.depth + depthOffset, 6);
        const HeadingComponent = `h${depth}`;
        return (0, jsx_runtime_1.jsx)(HeadingComponent, { children: children });
    };
    return Heading;
}
exports.heading = heading;
function Markdown({ children, componentsOverride, headingTopLevel = 2, imageHeight = 300, imageWidth = 600, }) {
    const components = (0, react_1.useMemo)(() => ({
        ...{
            heading: heading(headingTopLevel - 1),
            image: ({ content }) => ((0, jsx_runtime_1.jsx)(image_1.default, { alt: content.alt ?? "", height: imageHeight, width: imageWidth, src: content.url })),
            link: ({ children, content }) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: content.url, children: children })),
        },
        ...componentsOverride,
    }), [headingTopLevel, imageHeight, imageWidth, componentsOverride]);
    return (0, jsx_runtime_1.jsx)(_1.Markdown, { components: components, children: children });
}
exports.Markdown = Markdown;
