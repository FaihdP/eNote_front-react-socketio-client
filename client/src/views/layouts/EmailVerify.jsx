import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { useParams } from 'react-router-dom'
import { getKeys } from '../../api/api'
import ErrorVerify from '../partials/ErrorVerify'
import SuccessVerify from '../partials/SuccesVerify'

function EmailVerify () {
  const { setEmail } = useContext(Context)
  const [band, setBand] = useState(false)
  const { key } = useParams()

  useEffect(() => {
    (async () => {
      const rows = await getKeys()
      const infoRegistration = rows.filter((row) => row.key_registration === key)
      setEmail(infoRegistration[0].email)
      if (infoRegistration.length > 0) setBand(true)
      else setBand(false)
    })()
  }, [key, setEmail])

  if (band) {
    return <SuccessVerify />
  } else {
    return <ErrorVerify />
  }
}

export default EmailVerify
