import { createContext, useState } from 'react'
import io from 'socket.io-client'

export const Context = createContext()

const newSocket = io('http://localhost:4000')

export function ContextProvider ({ children }) {
  const [socket, setSocket] = useState(newSocket)
  const [email, setEmail] = useState('')
  const [person, setPerson] = useState({})

  return (
    <Context.Provider
      value={{
        socket,
        setSocket,
        email,
        setEmail,
        person,
        setPerson
      }}
    >
      {children}
    </Context.Provider>
  )
}
