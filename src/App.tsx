import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { SearchPage } from './pages/SearchPage/SearchPage'
import { GameDetailPage } from './pages/GameDetailPage/GameDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SearchPage />} />
        <Route path="game/:id" element={<GameDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
