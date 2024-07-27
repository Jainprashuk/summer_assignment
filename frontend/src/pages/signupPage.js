import React, { useState } from 'react'
import useSignup from '../hooks/useSignup'
import { Link } from 'react-router-dom'
import './signup.css'

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = useSignup()

  const handleSubmit = () => {
    const validation = true
    if (validation) {
      signup({ email, name, password })
    } else {
      alert("Validation failed")
    }
  }

  return (
    <div className='signup-page'>
      <div className='signup-box'>
        <h3 className='signup-title'>Sign Up</h3>
        <div className='input-group'>
          <input
            type='email'
            className='input-field'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            className='input-field'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='password'
            className='input-field'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className='signup-button'
        >
          Sign Up
        </button>
        <p className='login-link'>
          Already have an account?{" "}
          <Link to='/login' className='link'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
