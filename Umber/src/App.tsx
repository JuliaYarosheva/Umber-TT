import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'
import {MainBoard} from "./ui/MainBoard.tsx";

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainBoard />
    </QueryClientProvider>
  )
}

export default App
