import { ReactNode, useMemo } from "react";
import { fromMarkdown } from "mdast-util-from-markdown";

type Root = ReturnType<typeof fromMarkdown>;
type Content = Root["children"][number];

export type MarkdownComponentConfig = {
  [key in Content["type"]]?: (props: {
    children: ReactNode;
    content: Extract<Content, { type: key }>;
  }) => ReactNode;
};

const COMPONENTS_DEFAULT: MarkdownComponentConfig = {
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  break: () => <br />,
  emphasis: ({ children }) => <em>{children}</em>,
  heading: ({ children, content }) => {
    const Heading = `h${content.depth}` as keyof JSX.IntrinsicElements;
    return <Heading>{children}</Heading>;
  },
  image: ({ content }) => (
    <img alt={content.alt ?? undefined} src={content.url} />
  ),
  link: ({ children, content }) => (
    <a href={content.url} rel="noopener noreferrer">
      {children}
    </a>
  ),
  list: ({ children, content }) => {
    const List = content.ordered ? "ol" : "ul";
    return <List>{children}</List>;
  },
  listItem: ({ children }) => <li>{children}</li>,
  paragraph: ({ children }) => <p>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  text: ({ content }) => content.value,
};

function MarkdownContent({
  children,
  components,
}: {
  children: Content;
  components?: MarkdownComponentConfig;
}) {
  const Component = (components?.[children.type] ??
    COMPONENTS_DEFAULT[children.type]) as (props: {
    children: ReactNode;
    content: Content;
  }) => ReactNode;

  if (Component) {
    return (
      <Component content={children}>
        {"children" in children ? (
          <MarkdownChildren components={components}>
            {children.children}
          </MarkdownChildren>
        ) : null}
      </Component>
    );
  }
  return <strong>NOT Implemented: {children.type}</strong>;
}

function MarkdownChildren({
  children,
  components,
}: {
  children: Content[];
  components?: MarkdownComponentConfig;
}) {
  return (
    <>
      {children.map((content, index) => (
        <MarkdownContent components={components} key={index}>
          {content}
        </MarkdownContent>
      ))}
    </>
  );
}

export function Markdown({
  children,
  components,
}: {
  children: string;
  components?: MarkdownComponentConfig;
}) {
  const ast = useMemo(() => fromMarkdown(children), [children]);

  return (
    <MarkdownChildren components={components}>{ast.children}</MarkdownChildren>
  );
}
