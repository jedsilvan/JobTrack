import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Board from './pages/Board'
import Dashboard from './pages/Dashboard'
import Theme from './components/Theme'
import './App.css'

export default function App() {
  return (
    <>
      <Theme />
      <Header />
      <div>
        <hr className="my-4 border-t"></hr>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  )
}
