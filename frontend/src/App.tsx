import { Routes, Route } from 'react-router-dom'
import Board from './pages/Board'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Stats from './pages/Stats'
import Theme from './components/Theme'
import './App.css'

export default function App() {
  return (
    <>
      <Theme />
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  )
}
