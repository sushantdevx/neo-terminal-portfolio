import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export const mdxComponents = {
  // Headings
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-gradient mt-8 mb-4 flex items-center gap-2" {...props}>
      <span className="text-terminal-prompt">›</span>
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-terminal-cyan mt-8 mb-4 flex items-center gap-2" {...props}>
      <span className="text-terminal-prompt text-xl">›</span>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold text-terminal-cyan mt-6 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold text-terminal-text mt-4 mb-2" {...props} />
  ),
  
  // Paragraphs
  p: (props: any) => (
    <p className="text-terminal-text leading-relaxed mb-4" {...props} />
  ),
  
  // Links
  a: (props: any) => {
    const isExternal = props.href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          className="terminal-link inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {props.children}
          <span className="text-xs">↗</span>
        </a>
      );
    }
    return <Link href={props.href} className="terminal-link" {...props} />;
  },
  
  // Lists
  ul: (props: any) => (
    <ul className="list-none space-y-2 mb-4 pl-6" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal space-y-2 mb-4 pl-6 text-terminal-text" {...props} />
  ),
  li: (props: any) => (
    <li className="text-terminal-text flex items-start gap-2" {...props}>
      <span className="text-terminal-cyan mt-1">›</span>
      <span className="flex-1">{props.children}</span>
    </li>
  ),
  
  // Code
  code: (props: any) => {
    // Inline code
    if (typeof props.children === 'string' && !props.className) {
      return (
        <code
          className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-cyan text-sm font-mono"
          {...props}
        />
      );
    }
    // Code blocks are handled by CodeBlock component
    return <CodeBlock {...props} />;
  },
  pre: (props: any) => {
    // Extract code block props
    const codeProps = props.children?.props || {};
    return <CodeBlock {...codeProps} />;
  },
  
  // Blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-terminal-cyan bg-terminal-bg pl-4 py-2 my-4 italic text-terminal-textMuted"
      {...props}
    />
  ),
  
  // Horizontal rule
  hr: (props: any) => (
    <hr className="border-terminal-border my-8" {...props} />
  ),
  
  // Tables
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-terminal-border" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-terminal-border bg-terminal-bgLight px-4 py-2 text-left text-terminal-cyan font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-terminal-border px-4 py-2 text-terminal-text" {...props} />
  ),
  
  // Images
  img: (props: any) => (
    <div className="my-6">
      <img
        className="rounded-lg border border-terminal-border w-full"
        {...props}
        alt={props.alt || 'Article image'}
      />
      {props.alt && (
        <p className="text-terminal-textMuted text-sm text-center mt-2 italic">
          {props.alt}
        </p>
      )}
    </div>
  ),
  
  // Strong/Bold
  strong: (props: any) => (
    <strong className="text-terminal-cyan font-semibold" {...props} />
  ),
  
  // Emphasis/Italic
  em: (props: any) => (
    <em className="text-terminal-green italic" {...props} />
  ),
};