import React, {useRef} from 'react'
import { Form, Button } from 'react-bootstrap';


const RegisterForm = () => {
  return (
    <div className='w-70 p-6 flex justify-center vh-100 items-center'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Alias</Form.Label>
          <Form.Control type="text" placeholder="Enter your name or alias" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Wallet Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your wallet id" />
        </Form.Group>
        <Button>Register</Button>
      </Form>
    </div>
  )
}

export default RegisterForm