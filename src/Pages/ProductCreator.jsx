import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { verifyToken } from '../Helpers/verifyToken'
import { URL_API } from '../../config'

const ProductCreator = () => {
  verifyToken()

  const navigate = useNavigate()
  const initialValues = {nombre: '', precio: '', stock: '', descripcion: '', img: import.meta.env.VITE_CLOUDINARY_DEFAULTIMG}
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
      formValues.img = import.meta.env.VITE_CLOUDINARY_DEFAULTIMG
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(file){
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESETNAME)

      await fetch('https://api.cloudinary.com/v1_1/' + import.meta.env.VITE_CLOUDINARY_CLOUDNAME + '/image/upload', {
      method: 'POST',
      body: formData
      })
      .then(res => res.json())
      .then(data => {
        formValues.img = data.secure_url
      })
    }

    const response = await fetch(URL_API + '/api/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nombre: formValues.nombre, precio: formValues.precio, stock: formValues.stock, descripcion: formValues.descripcion, img: formValues.img})
    })
    .then(res => res.json())

    if(response.status == 201){
      navigate('/product/detail/' + response.result.insertId)
    }
  }

  return(
    <div className='genericBg'>
      <h3>Creación de producto</h3>
      <form onSubmit={(e) => handleSubmit(e)} className='formTemplate'>
        <label htmlFor='nombre'>Nombre</label>
        <input type='text' name='nombre' id='nombre' placeholder='Ingresá el nombre para el nuevo producto' value={formValues.nombre} onChange={(e) => handleChangeInput(e.target.value, e.target.name)} required />
        <br />
        <div className='dataContainer'>
          <div className='dataContainerImg'>
            <img src={file ? URL.createObjectURL(file) : formValues.img} alt={formValues.nombre} className='imgPreview' />
            <label htmlFor='file' className='btnGlobal' style={{fontSize: '12px'}}>Cambiar</label>
            <input id='file' type='file' onChange={handleChangeFile} accept='image/*' hidden />
            <br />
          </div>
          <div className='dataContainerTxt'>
            <label htmlFor='precio'>Precio</label>
            <input type='number' name='precio' id='precio' placeholder='0' min={0} value={formValues.precio} onChange={(e) => handleChangeInput(e.target.value, e.target.name)} required />
            <br />
            <label htmlFor='stock'>Stock</label>
            <input type='number' name='stock' id='stock' placeholder='0' min={0} value={formValues.stock} onChange={(e) => handleChangeInput(e.target.value, e.target.name)} required />
            <br />
          </div>
        </div>
        <label htmlFor='descripcion'>Descripción</label>
        <textarea id='descripcion' name='descripcion' placeholder='Ingresá la descripción que tendrá el nuevo producto' value={formValues.descripcion} onChange={(e) => handleChangeInput(e.target.value, e.target.name)} required />
        <br />
        <div className='actionButtons'>
          <button type='submit' className='btnGlobal'>Guardar</button>
          <Link to={'/home'}><button className='btnGlobal'>Cancelar</button></Link>
        </div>
      </form>
    </div>
  )
}

export default ProductCreator