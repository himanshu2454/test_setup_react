import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { routes, navLinks } from './routes'
import React, { useState } from 'react'
import TasksModal from './components/TasksModal'
import logo from './assets/logo.svg'

function App() {
  const [showTasksModal, setShowTasksModal] = useState(false)

  return (
    <div className='app_primary'>
      {/* header */}
      <div className='app_header'>

        <img src={logo} alt='uniper'/>
        <div className='header_content'>
          <h4>Test Setup</h4>
        </div>
      </div>

      {/* Navigation */}
      <nav className='app_nav'>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>{link.label}</Link>
        ))}
        <button 
          className='tasks_button'
          onClick={() => setShowTasksModal(true)}
        >
          Tasks
        </button>
      </nav>

      {/* Body */}
      <div className='app_body'>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>

      {/* Footer */}
      <div className='app_footer'>
        <p>All the best !!!</p>
      </div>

      {/* Tasks Modal */}
      <TasksModal visible={showTasksModal} onHide={() => setShowTasksModal(false)} />
    </div>
  )
}

export default App
