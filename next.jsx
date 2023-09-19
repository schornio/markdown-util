import { Markdown as MakrdownCore } from "./";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
export function heading(depthOffset) {
    const Heading = ({ children, content, }) => {
        const depth = Math.min(content.depth + depthOffset, 6);
        const HeadingComponent = `h${depth}`;
        return <HeadingComponent>{children}</HeadingComponent>;
    };
    return Heading;
}
export function Markdown({ children, componentsOverride, headingTopLevel = 2, imageHeight = 300, imageWidth = 600, }) {
    const components = useMemo(() => ({
        ...{
            heading: heading(headingTopLevel - 1),
            image: ({ content }) => (<Image alt={content.alt ?? ""} height={imageHeight} width={imageWidth} src={content.url}/>),
            link: ({ children, content }) => (<Link href={content.url}>{children}</Link>),
        },
        ...componentsOverride,
    }), [headingTopLevel, imageHeight, imageWidth, componentsOverride]);
    return <MakrdownCore components={components}>{children}</MakrdownCore>;
}
