import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SkillsPage from "./pages/Skills"
import './styles/App.css'

function App() {

  return (
    <>
      <Router basename="/assignment-2-MichaelStoikos">
				<Routes>
					<Route path="/" element={<HomePage />} />
          <Route path="/Skills" element={<SkillsPage />} />
				</Routes>
		</Router>
    </>
  )
}

export default App
