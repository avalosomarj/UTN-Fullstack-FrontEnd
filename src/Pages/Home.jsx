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
    <>
      <Link to={'/product/new/'}><button className='btnGlobal btnFloat'>Nuevo Producto</button></Link>
      <div className='homePage'>
        <div className='searchBox'>
          <input name='searcher' type='text' placeholder='Busca tu producto aquí' value={searchString} onChange={handleFilterProduct} />
          <TbShoppingBagSearch className='searchIcon' />
        </div>
        {
          listProducts.length == 0
          ? <span>No hay resultados. Revise la ortografía o intente usar otras palabras.</span>
          : searchString != '' && <span>Se encontraron {listProducts.length} resultados</span>
        }
        <div className='productList'>
          {
            listProducts.length > 0 &&
            listProducts.map(({ id, nombre, img, precio, stock }) => (
              <ProductCard id={id} nombre={nombre} img={img} precio={precio} stock={stock} key={id} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home