import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Error, TemplateEditor } from '../Components'
import { verifyToken } from '../Helpers/verifyToken'
import { URL_API } from '../../config'

const ProductEditor = () => {
  verifyToken()
  
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

  return(
    <div className='genericBg'>
      {
        productFound
        ?
        <>
          <h3>Edición de producto</h3>
          <TemplateEditor id={productFound.id} nombre={productFound.nombre} precio={productFound.precio} stock={productFound.stock} descripcion={productFound.descripcion} img={productFound.img}/>
        </>
        :
        <Error value={404} message={'El producto buscado no existe'}/>
      }
    </div>
  )
}

export default ProductEditor