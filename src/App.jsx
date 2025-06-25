import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { PostsPage } from '@/pages/PostsPage'
import { PostForm } from '@/pages/PostForm'
import { UploadsPage } from '@/pages/UploadsPage'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/new" element={<PostForm />} />
            <Route path="posts/:id/edit" element={<PostForm />} />
            <Route path="uploads" element={<UploadsPage />} />
            <Route path="users" element={<div className="p-8 text-center text-muted-foreground">Página de Utilizadores em desenvolvimento...</div>} />
            <Route path="contacts" element={<div className="p-8 text-center text-muted-foreground">Página de Contactos em desenvolvimento...</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Página de Configurações em desenvolvimento...</div>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

