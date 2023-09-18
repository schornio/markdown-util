"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = exports.heading = void 0;
const _1 = require("./");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function heading(depthOffset) {
    const Heading = ({ children, content, }) => {
        const depth = Math.min(content.depth + depthOffset, 6);
        const HeadingComponent = `h${depth}`;
        return <HeadingComponent>{children}</HeadingComponent>;
    };
    return Heading;
}
exports.heading = heading;
function Markdown({ children, componentsOverride, headingTopLevel = 2, imageHeight = 300, imageWidth = 600, }) {
    const components = (0, react_1.useMemo)(() => (Object.assign({
        heading: heading(headingTopLevel - 1),
        image: ({ content }) => {
            var _a;
            return (<image_1.default alt={(_a = content.alt) !== null && _a !== void 0 ? _a : ""} height={imageHeight} width={imageWidth} src={content.url}/>);
        },
        link: ({ children, content }) => (<link_1.default href={content.url}>{children}</link_1.default>),
    }, componentsOverride)), [headingTopLevel, imageHeight, imageWidth, componentsOverride]);
    return <_1.Markdown components={components}>{children}</_1.Markdown>;
}
exports.Markdown = Markdown;
