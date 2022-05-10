import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router'
import { Button } from 'react-bootstrap'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('User')

  function handleSubmit(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    (async function () { 
      const response = await fetch('http://localhost:5000/api/auth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }})
      const user = await response.json()
      if(!user.isLoggedIn) navigate('/login')
      setUser(`${user.user}`)
    })()
  }, [navigate])

  return (
    <div className='container flex flex-col justify-center items-center'>
      <h1>Hello, {user.toUpperCase()}</h1>
      <div className='mt-3'></div>
      <Button variant='outline-dark' type='submit' onClick={handleSubmit}>Logout</Button>
      <div className='mt-4'>
          <h1>Content</h1>
      </div>
    </div>
  )
}

export default Home