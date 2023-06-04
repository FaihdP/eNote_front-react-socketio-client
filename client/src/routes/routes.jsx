import { createBrowserRouter } from 'react-router-dom'
import Login from '../views/Login'
import Register from '../views/Register'
import Header from '../views/layouts/Header'
import Courses from '../views/partials/Courses'
import EmailVerify from '../views/layouts/EmailVerify'
import Notes from '../views/partials/Notes'
import Course from '../views/partials/Course'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/emailVerify/:key',
    element: <EmailVerify />
  },
  {
    path: '/dashboard',
    element: <Header />
  },
  {
    path: '/dashboard/courses',
    element: <Header children={<Courses />} />
  },
  {
    path: '/dashboard/courses/:idGroup',
    element: <Header children={<Course />} />
  },
  {
    path: '/dashboard/notes',
    element: <Header children={<Notes />} />
  }
])

export default router
