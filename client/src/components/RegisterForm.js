import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router'
import { Form, Button } from 'react-bootstrap';
import Web3 from 'web3'
import jwt from 'jsonwebtoken'


const RegisterForm = () => {
  const navigate = useNavigate()
  //Get user input using useRef hook
  const nameRef = useRef();
  //Initialize ethereum
  const web3 = new Web3(Web3.givenProvider)

  async function handleSubmit(e) {
    e.preventDefault();
    //Request current user account address
    const acct = await web3.eth.requestAccounts()
    //Check if user has MetaMask connected
    if(acct.length < 1) alert('Please connect MetaMask')
    const publicAddress = acct[0]

    //Get form data and user address
    const data = {
      name: nameRef.current.value,
      address: publicAddress
    }
    //Send form data to api
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    //if there is a user, save token to localStorage
    if (responseData.user) { 
      //decode token and get nonce 
      jwt.verify(responseData.user, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
        if(err) console.log('Invalid token')
        handleSignature(publicAddress, decoded.nonce, () => {
          localStorage.setItem('token', responseData.user)
          navigate('/dashboard')
        })
        
      })
    } else handleSignup(data);
  }

  async function handleSignup(user) {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    const responseData = await response.json();
    (responseData.status === 'ok') ? handleSubmit() : alert('There was a problem, please try again')
  }

  async function handleSignature(address, nonce){
    const signature = new Promise((resolve, reject) =>
      web3.eth.personal.sign(`I am signing my one-time nonce: ${nonce}`, address, (err, signature) => {
          if (err) return reject(err);
          return resolve(address, signature);
        }
      )
    );
    await signature.then((address, signature) => {
      fetch('http://localhost:5000/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({publicAddress: address, signature: signature})
      }).then(response => response.json());
    })

  }

  useEffect( () => {
    (async function () { 
      const response = await fetch('http://localhost:5000/api/auth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }})
      const user = await response.json()
      if(user.isLoggedIn) navigate('/dashboard')
    })()
  }, [navigate])
  
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