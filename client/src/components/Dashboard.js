import React, { useEffect } from 'react'
import {useNavigate} from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    (async function () { 
      const response = await fetch('http://localhost:5000/api/auth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }})
      const user = await response.json()
      if(!user.isLoggedIn) navigate('/login')
    })()
  }, [navigate])

  return (
    <div className='container flex flex-col justify-center items-center'>
      <h1>Hello, User</h1>
      <div className='mt-4'>
          <h1>Content</h1>
      </div>
    </div>
  )
}

export default Home