import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({id, nombre, img, precio, stock}) => {
  return (
    <div className='Card'>
      <span className='spanTitle'>{nombre}</span>
      <img src={img} alt={nombre}/>
      <h4>${precio.toLocaleString('es-AR')}</h4>
      <span>Stock: {stock} un.</span>
      <Link to={'/product/detail/' + id}><button className='btnGlobal'>Ver Más</button></Link>
    </div>
  )
}

export default ProductCard