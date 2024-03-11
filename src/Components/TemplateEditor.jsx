import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL_API } from '../../config'

const TemplateEditor = ({id, nombre, precio, stock, descripcion, img}) => {
  const navigate = useNavigate()
  const initialValues = {nombre: nombre, precio: precio, stock: stock, descripcion: descripcion, img: img}
  const [formValues, setFormValues] = useState(initialValues)
  const [file, setFile] = useState(null)

  const handleChangeInput = (value, name) => {
    setFormValues(() => {
      return {...formValues, [name]: value}
    })
  }

  const handleChangeFile = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0])
    }
    else{
      setFile(null)
      formValues.img = 'https://res.cloudinary.com/dz99fihcj/image/upload/v1710187541/utn-fullstack-developer/psi.jpg'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(file){
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'utn-fullstack-developer')

      await fetch('https://api.cloudinary.com/v1_1/dz99fihcj/image/upload', {
      method: 'POST',
      body: formData
      })
      .then(res => res.json())
      .then(data => {
        formValues.img = data.url
      })
    }

    const response = await fetch(URL_API + '/api/products/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: id, nombre: formValues.nombre, precio: formValues.precio, stock: formValues.stock, descripcion: formValues.descripcion, img: formValues.img})
    })
    .then(res => res.json())

    if(response.status == 200){
      navigate('/product/detail/' + id)
    }
    else if(response.status == 400){
        console.log('faltan datos?')
    }
  }

  return(
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className='formTemplate'>
        <label htmlFor='nombre'>Nombre</label>
        <input type='text' name='nombre' id='nombre' value={formValues.nombre} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required className='txtNombre' />
        <br />
        <div className='dataContainer'>
          <div className='dataContainerImg'>
            <img src={file ? URL.createObjectURL(file) : formValues.img} alt='test' className='imgPreview' />
            <label htmlFor='file' className='btnGlobal' style={{fontSize: '12px'}}>Cambiar</label>
            <input id='file' type='file' onChange={handleChangeFile} accept='image/*' hidden />
            <br />
          </div>
          <div className='dataContainerTxt'>
            <label htmlFor='precio'>Precio</label>
            <input type='number' name='precio' id='precio' min={0} value={formValues.precio} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required />
            <br />
            <label htmlFor='stock'>Stock</label>
            <input type='number' name='stock' id='stock' min={0} value={formValues.stock} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required />
            <br />
          </div>
        </div>
        <label htmlFor='descripcion'>Descripción</label>
        <textarea id='descripcion' name='descripcion' value={formValues.descripcion} onChange={(e)=>handleChangeInput(e.target.value, e.target.name)} required />
        <br />
        <div className='actionButtons'>
          <button type='submit' className='btnGlobal'>Guardar</button>
          <Link to={'/product/detail/' + id}><button className='btnGlobal'>Cancelar</button></Link>
        </div>
      </form>
    </div>
  )
}

export default TemplateEditor