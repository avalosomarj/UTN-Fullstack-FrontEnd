import React, { useEffect, useState } from 'react'
import { ProductCard } from '../Components'
import { TbShoppingBagSearch } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { verifyToken } from '../Helpers/verifyToken'
import { URL_API } from '../../config'

const Home = () => {
  verifyToken()
  
  const [searchString, setSearchString] = useState('')
  const [listProducts, setListProducts] = useState([])

  const handleFilterProduct = (e) => {
    setSearchString(e.target.value)
  }

  useEffect(() => {
    fetch(URL_API + '/api/products')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setListProducts(data.products.filter(product => product.nombre.toLowerCase().includes(searchString.toLowerCase())))
      })
  }, [searchString])

  return(
    <div className='homePage'>
      <div className='searchBox'>
        <input name='searcher' type='text' placeholder='Busca tu producto aquí' value={searchString} onChange={handleFilterProduct} />
        <TbShoppingBagSearch className='searchIcon' />
      </div>
      {
        listProducts.length == 0
        ?
        <div className='productsFound'>
          <Link to={'/product/new/'}><button className='btnGlobal'>Nuevo Producto</button></Link>
          <span>No hay resultados. Intente usar otros términos o verificar que no tenga errores ortográficos.</span>
        </div>
        :
        <>
          <div className='productsFound'>
            {(listProducts.length > 1 && searchString != '') && `Se encontraron ${listProducts.length} resultados`}
            <Link to={'/product/new/'}><button className='btnGlobal'>Nuevo Producto</button></Link>
          </div>
          <div className='productList'>
            {
              listProducts.map(({id, nombre, img, precio, stock}) => (
                <ProductCard id={id} nombre={nombre} img={img} precio={precio} stock={stock} key={id}/>
              ))
            }
          </div>
        </>
      }
      
    </div>
  )
}

export default Home