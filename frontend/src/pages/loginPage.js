import React, { useState } from 'react'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import './login.css'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useLogin()

  const handleSubmit = () => {
    const validation = true

    if (validation) {
      login({ email, password })
    } else {
      alert("Validation failed")
    }
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <h3 className='login-title'>Login</h3>
        <div className='input-group'>
          <input
            type='text'
            className='input-field'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          className='login-button'
        >
          Login
        </button>
        <p className='signup-link'>
          Don't have an account?{" "}
          <Link to='/signup' className='link'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
