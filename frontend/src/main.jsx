import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkProvider } from "@clerk/clerk-react"
import "./index.css"
import App from "./App.jsx"

import { ToastProvider } from "./context/ToastContext.jsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ""
const IS_CLERK_ENABLED = PUBLISHABLE_KEY && !PUBLISHABLE_KEY.includes("placeholder")

const queryClient = new QueryClient()

const AppWrapper = () => {
  if (IS_CLERK_ENABLED) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </QueryClientProvider>
      </ClerkProvider>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  )
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
