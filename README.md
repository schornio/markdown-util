# @schornio/markdown-util

Opinionated markdown utilities. Also for next.js.

## Installation

```bash
npm install @schornio/markdown-util
```

## Usage

```ts
import { Markdown } from "@schornio/markdown-util";

export function MyComponent({ text }: { text: string }) {
  return <Markdown>{text}</Markdown>;
}
```

## Usage with next.js

It uses `next/image` to render images and `next/link` to render links.

Optionally, you can pass `headingTopLevel` and `imageHeight` and `imageWidth` to the `Markdown` component.

```ts
import { Markdown } from "@schornio/markdown-util/next";

export function MyComponent({ text }: { text: string }) {
  return (
    <Markdown headingTopLevel={1} imageHeight={400} imageWidth={600}>
      {text}
    </Markdown>
  );
}
```
