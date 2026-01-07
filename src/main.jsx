import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Includes Popper.js
import App from './App.jsx'
import {AppProvider} from "./contexts/AppContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Optional: disable refetch on window focus
      retry: 1, // Optional: number of retry attempts
    },
  },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </AppProvider>
    </StrictMode>,
)
