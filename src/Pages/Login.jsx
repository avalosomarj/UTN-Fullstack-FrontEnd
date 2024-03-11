import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL_API } from '../../config'

const Login = () => {
  const navigate = useNavigate()
  const initialValues = {username: '', password: ''}
  const [formValues, setFormValues] = useState(initialValues)
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  useEffect(() => {
    fetch(URL_API + '/api/users/auth', {
    method: "POST",
    headers: { "Authorization": window.localStorage.getItem('auth-token-app') }
    })
    .then(res => {
      return res.json()
    })
    .then(response => {
      if(response.status == 200){
        navigate('/home')
      }
    })
  }, [])

  const handleChangeInput = (value, name) => {
    setFormValues(() => {
        return {...formValues, [name]: value}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(URL_API + '/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: formValues.username, password: formValues.password})
    })
    .then(res => res.json())
    
    if(response.status == 200){
      navigate('/home')
      setInvalidCredentials(false)
      window.localStorage.setItem('auth-token-app', response.accessToken)
    }
    else if(response.status == 400){
        setInvalidCredentials(true)
    }
  }

  return (
      <div className='userCredentialsBg'>
        <div className='userCredentials'>
          <h2>Inicia Sesión</h2>
          <br />
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='username'>Usuario</label>
              <input type='text' id='username' name='username' placeholder='Tu usuario' className='contactInput' value={formValues.username} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required/>
              <br />
              <label htmlFor='password'>Contraseña</label>
              <input type='password' id='password' name='password' placeholder='Tu contraseña' className='contactInput' value={formValues.password} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required/>
              <br />
              <input type='submit' value='Acceder' className='btnGlobal'/>
            </form>
            <div className='msgSpan'>
              {invalidCredentials && <span className='alertSpan'>Datos incorrectos<br />Intenta nuevamente</span>}
            </div>
          ¿Todavía no tenés cuenta?
          <Link to={'/register'}><span className='reg-log-Span'>Regístrate</span></Link>
        </div>
      </div>
  )
}

export default Login