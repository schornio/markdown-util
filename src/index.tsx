import { ReactNode, useMemo } from "react";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmTable } from "micromark-extension-gfm-table";
import { gfmTableFromMarkdown } from "mdast-util-gfm-table";

type Root = ReturnType<typeof fromMarkdown>;
type Content = Root["children"][number];

export type MarkdownComponentConfig = {
  [key in Content["type"]]?: (props: {
    children: ReactNode;
    content: Extract<Content, { type: key }>;
    Markdown: typeof MarkdownChildren;
  }) => ReactNode;
};

const COMPONENTS_DEFAULT: MarkdownComponentConfig = {
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  break: () => <br />,
  emphasis: ({ children }) => <em>{children}</em>,
  heading: ({ children, content }) => {
    const Heading = `h${content.depth}` as
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6";
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
  table: ({ Markdown, content }) => (
    <table>
      {content.children[0] ? (
        <thead>
          <tr>
            {content.children[0].children.map((cell, indexCell) => (
              <th key={indexCell}>
                <Markdown>{cell.children}</Markdown>
              </th>
            ))}
          </tr>
        </thead>
      ) : undefined}
      {content.children.length > 1 ? (
        <tbody>
          {content.children.slice(1).map((row, indexRow) => (
            <tr key={indexRow}>
              {row.children.map((cell, indexCell) => (
                <td key={indexCell}>
                  <Markdown>{cell.children}</Markdown>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ) : undefined}
    </table>
  ),
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
    Markdown: typeof MarkdownChildren;
    children: ReactNode;
    content: Content;
  }) => ReactNode;

  if (Component) {
    return (
      <Component Markdown={MarkdownChildren} content={children}>
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
  children?: string | null;
  components?: MarkdownComponentConfig;
}) {
  const ast = useMemo(
    () =>
      fromMarkdown(children ?? "", {
        extensions: [gfmTable()],
        mdastExtensions: [gfmTableFromMarkdown()],
      }),
    [children]
  );

  return (
    <MarkdownChildren components={components}>{ast.children}</MarkdownChildren>
  );
}
