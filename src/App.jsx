
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' Component={Landing} />
      <Route path='/auth' Component={Auth} />
      <Route path='/dash' Component={Dashboard} />
    </Routes>
    
     
    </>
  )
}

export default App
