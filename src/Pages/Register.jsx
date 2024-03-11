import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL_API } from '../../config'

const Register = () => {
  const navigate = useNavigate()
  const initialValues = {username: '', password: ''}
  const [formValues, setFormValues] = useState(initialValues)
  const [repeatedUsername, setRepeatedUsername] = useState(false)
  const lengthPasswordInput = 8

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

    const response = await fetch(URL_API + '/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: formValues.username, password: formValues.password})
    })
    .then(res => res.json())

    if(response.status == 200){
      setRepeatedUsername(false)
      navigate('/login')
    }
    else if(response.status == 400){
      setRepeatedUsername(true)
    }
  }

  return (
    <div className='userCredentialsBg'>
      <div className='userCredentials'>
        <h2>Regístrate</h2>
        <br />
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='username'>Usuario</label>
            <input type='text' id='username' name='username' placeholder='Tu usuario' className='contactInput' value={formValues.username}  onChange={(e) => handleChangeInput(e.target.value, 'username')} required/>
            <br />
            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password'  placeholder='Tu contraseña' className='contactInput' minLength={lengthPasswordInput} value={formValues.password} onChange={(e) => handleChangeInput(e.target.value, 'password')} required/>
            <span style={{fontSize: '10px', color: 'red'}}>* Mínimo {lengthPasswordInput} caracteres</span>
            <br />
            <input type='submit' value='Registrarme'  className='btnGlobal'/>
          </form>
          <div className='msgSpan'>
            {repeatedUsername && <span className='alertSpan'>Nombre de usuario no disponible</span>}
          </div>
          ¿Ya tenés cuenta?
          <Link to={'/login'}><span className='reg-log-Span'>Accede</span></Link>
      </div>
    </div>
  )
}

export default Register