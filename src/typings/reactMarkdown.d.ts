declare namespace ReactMarkdown {
  import React = __React;
  
  interface MarkdownProps extends React.HTMLAttributes {
    // Optional

    renderers: {
      BlockQuote: any;
      Code: any;
      Emph: any;
      Heading: any;
      Item: any;
      Link: any;
      List: any;
      Paragraph: any;
      Strong: any;
    };
    skipHtml: boolean;
  }

  class Markdown extends React.Component<MarkdownProps, any> {}
}

declare module 'react-markdown' {
  import Markdown = ReactMarkdown.Markdown;
  export = Markdown;
}
