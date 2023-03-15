export function GatewayHtml({ children, styles }: { children: string; styles: React.ReactElement }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PubKey</title>
        <style>{'html, body, #body { height: 100%; }'}</style>
        {styles}
      </head>
      <body>
        <div id="body" dangerouslySetInnerHTML={{ __html: children }} style={{ height: '100%' }} />
      </body>
    </html>
  )
}
