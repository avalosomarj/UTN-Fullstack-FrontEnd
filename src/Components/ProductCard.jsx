import React from 'react'
import { Link } from 'react-router-dom'
import { URL_API } from '../../config'

const ProductCard = ({id, nombre, img, precio, stock}) => {
  return (
    <div className='Card'>
      <span>{nombre}</span>
      <img src={URL_API + '/img/' + img} alt={nombre}/>
      <h4>${precio.toLocaleString('es-AR')}</h4>
      <span>Stock: {stock}</span>
      <Link to={'/product/detail/' + id}><button className='btnGlobal'>Ver Más</button></Link>
    </div>
  )
}

export default ProductCard