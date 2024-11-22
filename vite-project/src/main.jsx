import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App/App'
import { FrappeProvider } from "frappe-react-sdk";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FrappeProvider url="http://demo.localhost:8000">
      <App />
    </FrappeProvider>
  </StrictMode>,
)
