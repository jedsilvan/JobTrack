import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Board from './pages/Board'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Stats from './pages/Stats'
import './App.css'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </QueryClientProvider>
  )
}
