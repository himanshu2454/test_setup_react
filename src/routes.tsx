import Home from './pages/Home'
import type { RouteObject } from 'react-router-dom'
import TestPlayground from './pages/TestPlayground'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <TestPlayground />,
  }
]

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Test', path: '/test' },
]
