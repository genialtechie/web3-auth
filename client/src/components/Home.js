import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container flex flex-col justify-center items-center'>
        <Link to='/login'>
            <Button 
            variant='outline-dark'
            type='submit' 
            onClick={(e) => e.preventDefault}
            >Login</Button>
        </Link>
        <div className='mt-4'>
            <h1>Content</h1>
        </div>
    </div>
  )
}

export default Home