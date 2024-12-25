export default function HtmlContent({ htmlString }) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    );
  }
  