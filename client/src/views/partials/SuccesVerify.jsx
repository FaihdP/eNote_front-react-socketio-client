import { useContext } from 'react'
import { Context } from '../../context/Context'
import { MDBInputGroup as InputGroup } from 'mdb-react-ui-kit'
import { Formik, Form, Field } from 'formik'
import { createPerson } from '../../api/api'
import { useNavigate } from 'react-router-dom'

function SuccesVerify () {
  const { email } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div className='container mt-5 text-center text-white'>
      <h2 style={{ color: '#1ABC9C' }}>¡Muy bien!</h2>

      <h4 className='mt-4'>
        Ingresa los siguientes datos para terminar la verificación de email
      </h4>

      <div style={{ width: '50vw', display: 'inline-block' }}>
        <InputGroup className='mt-4' noWrap textBefore='Correo:'>
          <input
            type='text'
            defaultValue={email}
            maxLength={50}
            className='form-control'
            readOnly
          />
        </InputGroup>
        <Formik
          initialValues={{
            email,
            password: '',
            names: '',
            lastnames: '',
            type_user: ''
          }}
          onSubmit={async (values) => {
            console.log(values)
            const response = await createPerson(values)
            if (response === true) {
              alert('¡Muy bien! ya puedes ingresar al sistema')
              navigate('/')
            } else alert('El sistema tuvo un problema, vuelve a intentarlo después.')
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <InputGroup className='mt-4' noWrap textBefore='Contraseña:'>
                  <Field
                    name='password'
                    type='password'
                    maxLength={32}
                    placeholder='Ingresa tu contraseña'
                    className='form-control'
                  />
                </InputGroup>
                <InputGroup className='mt-4' noWrap textBefore='Nombre:'>
                  <Field
                    name='names'
                    type='text'
                    maxLength={50}
                    placeholder='Ingresa tu nombre'
                    className='form-control'
                  />
                </InputGroup>
                <InputGroup className='mt-4' noWrap textBefore='Apellido:'>
                  <Field
                    name='lastnames'
                    type='text'
                    maxLength={50}
                    placeholder='Ingresa tu apellido'
                    className='form-control'
                  />
                </InputGroup>
                <InputGroup className='mt-4' noWrap textBefore='Tipo de usuario: '>
                  <Field as='select' className='form-control' name='type_user'>
                    <option>Seleccionar</option>
                    <option value={1}>Profesor</option>
                    <option value={3}>Estudiante</option>
                  </Field>
                </InputGroup>
                <button className='btn btn-danger mt-5' type='submit'>Continuar</button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default SuccesVerify
