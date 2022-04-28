import React, {useRef} from 'react'
import { Form, Button } from 'react-bootstrap';


const RegisterForm = () => {
  const nameRef = useRef();
  const addressRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      address: addressRef.current.value
    }

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }
  
  return (
    <div className='w-70 p-6 flex justify-center vh-100 items-center'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Alias</Form.Label>
          <Form.Control 
          required 
          type="text" 
          placeholder="Enter your name or alias" 
          ref={nameRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Wallet Address</Form.Label>
          <Form.Control 
          required 
          type="text" 
          placeholder="Enter your wallet id" 
          ref={addressRef}/>
        </Form.Group>
        <Button variant='outline-dark' className='btn-dark' type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default RegisterForm