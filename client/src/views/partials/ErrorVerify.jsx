function Error () {
  return (
    <>
      <h4 className='container mt-5 text-center text-white'>
        ¡No has podido verificar tu email! Es posible que hayas superado el
        tiempo para la verificación (
        <span style={{ color: '#FF8080' }}>10 minutos</span>).
      </h4>
    </>
  )
}

export default Error
