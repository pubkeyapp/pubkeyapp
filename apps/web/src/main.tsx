import { WebShellFeature } from '@pubkeyapp/web/shell/feature'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <WebShellFeature />
    </BrowserRouter>
  </StrictMode>,
)
