import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Error } from '../Components'
import { verifyToken } from '../Helpers/verifyToken'
import { URL_API } from '../../config'

const ProductDetail = () => {
  verifyToken()

  const navigate = useNavigate()
  const {pid} = useParams()
  const [productFound, setProductFound] = useState(null)

  useEffect(() => {
    fetch(URL_API + '/api/products/' + pid)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setProductFound(data.product)
      })
  }, [])

  const handleDelete = async (e) => {
    e.preventDefault()

    const alertMessage = confirm('Esta acción eliminará por completo el producto')

    if(alertMessage){
      const response = await fetch(URL_API + '/api/products/' + pid, {
        method: 'DELETE'
      })
      .then(res => res.json())

      if(response.status == 200){
        alert('El producto fue eliminado correctamente')
        navigate('/home')
      }
    }
  }

  return (
    <div className='genericBg'>
        {
          productFound
          ?
          <div className='productDescription'>
            <h3>{productFound.nombre}</h3>
            <div className='productInfo'>
              <img src={URL_API + '/img/' + productFound.img} alt={productFound.nombre} className='imgPreview'/>
              <div className='infoTxt'>
                <h3>Precio: ${productFound.precio.toLocaleString('es-AR')}</h3>
                <h3>Stock: {productFound.stock} un.</h3>
              </div>
            </div>
            <h4>Descripción</h4>
            <p>{productFound.descripcion}</p>
            <div className='actionButtons'>
              <Link to={'/product/edit/' + pid}><button className='btnGlobal'>Modificar</button></Link>
              <button onClick={handleDelete} className='btnGlobal'>Eliminar</button>
            </div>
          </div>
          :
          <Error value={404} message={'El producto buscado no existe'}/>
        }
      </div>
  )
}

export default ProductDetail