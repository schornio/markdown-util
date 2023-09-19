import { ReactNode } from "react";
import { fromMarkdown } from "mdast-util-from-markdown";
type Root = ReturnType<typeof fromMarkdown>;
type Content = Root["children"][number];
export type MarkdownComponentConfig = {
    [key in Content["type"]]?: (props: {
        children: ReactNode;
        content: Extract<Content, {
            type: key;
        }>;
    }) => ReactNode;
};
export declare function Markdown({ children, components, }: {
    children: string;
    components?: MarkdownComponentConfig;
}): import("react").JSX.Element;
export {};
