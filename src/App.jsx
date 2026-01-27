import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Registry from './pages/Registry'
import Photos from './pages/Photos'
import BridalParty from './pages/BridalParty'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/bridal-party" element={<BridalParty />} />
      </Routes>
    </div>
  )
}

export default App
