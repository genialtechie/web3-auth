import React, {useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';


const RegisterForm = () => {
  //Get user input using useRef hook
  const nameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    //Initialize ethereum
    const ethereum = await detectEthereumProvider();
    if(!ethereum) alert('Please install/ update MetaMask')
    else if (ethereum !== window.ethereum) alert('Do you have multiple wallets installed?')
    else window.web3 = new web3(ethereum);
    
    //Request current user account address
    const acct = await ethereum.request({method: 'eth_accounts'}) 
  
    const data = {
      name: nameRef.current.value,
      address: acct[0]
    }
    
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    responseData.user ? window.location.href = '/dashboard' : alert('Login failed, please confirm alias/username');
  }

  // async function handleSignup(user) {

  // }
  
  return (
    <div className='w-70 p-6 flex flex-col justify-center vh-100 items-center'>
      <Form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Alias/ Email</Form.Label>
          <Form.Control 
          required 
          type="text" 
          placeholder="Enter your name or alias" 
          ref={nameRef}/>
        </Form.Group>
        <Button variant='outline-dark' type='submit' onClick={handleSubmit}>Login with MetaMask</Button>
      </Form>
    </div>
  )
}

export default RegisterForm