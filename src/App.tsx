import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { routes, navLinks } from './routes'

function App() {

  return (
    <div className='app_primary'>
      {/* header */}
      <div className='app_header'>

        <img src='https://www.uniper.energy/themes/custom/uniper2025/logo.svg' alt='uniper'/>
        <div className='header_content'>
          <h4>Test Setup</h4>
        </div>
      </div>

      {/* Navigation */}
      <nav className='app_nav'>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>{link.label}</Link>
        ))}
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
    </div>
  )
}

export default App
