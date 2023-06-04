import { Field, Form, Formik } from 'formik'
import { MDBInputGroup as InputGroup } from 'mdb-react-ui-kit'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPerson, verifyUser } from '../api/api'
import { Context } from '../context/Context'
import Cookies from 'js-cookie'

function Login () {
  const { setEmail, setPerson } = useContext(Context)
  Cookies.remove('loginToken')

  const navigate = useNavigate()

  return (
    <div className='container mt-5 text-white text-center w-50'>
      <span className='h1'>Inicio de sesión</span>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values) => {
          const data = await verifyUser(values)
          if (data.verified === true) {
            const email = values.email

            const person = await getPerson(email)
            setEmail(email)
            setPerson(person)

            const expiration = new Date(new Date().getTime() + 30 * 60 * 1000)
            Cookies.set('loginToken', (data.token || ''), { path: '/', expires: expiration })

            navigate('/dashboard/courses')

            return
          }
          /* global alert */
          /* eslint no-undef: "error" */
          alert('Usuario o contraseña incorrectas')
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <InputGroup
                className='mt-5'
                noWrap
                textBefore='user@gmail.com'
              >
                <Field
                  name='email'
                  type='text'
                  maxLength={100}
                  placeholder='Ingresa tu correo'
                  className='form-control'
                />
              </InputGroup>
              <InputGroup className='mt-3' noWrap textBefore='soysexi.123'>
                <Field
                  name='password'
                  type='password'
                  maxLength={32}
                  placeholder='Ingresa tu contraseña'
                  className='form-control'
                />
              </InputGroup>
              <button type='submit' className='btn btn-danger px-4 mt-4'>
                Iniciar sesión
              </button>
            </Form>
          )
        }}
      </Formik>
      <hr />
      <Link to='/register'>
        <button className='btn btn-danger text-white px-4 mt-3'>
          Registrarse
        </button>
      </Link>
    </div>
  )
}

export default Login
