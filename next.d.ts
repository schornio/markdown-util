/// <reference types="react" />
import { MarkdownComponentConfig } from "./";
export declare function heading(depthOffset: number): (props: {
    children: import("react").ReactNode;
    content: import("mdast").Heading;
}) => import("react").ReactNode;
export declare function Markdown({ children, componentsOverride, headingTopLevel, imageHeight, imageWidth, }: {
    children: string;
    componentsOverride?: Partial<MarkdownComponentConfig>;
    headingTopLevel?: number;
    imageHeight?: number;
    imageWidth?: number;
}): import("react").JSX.Element;
