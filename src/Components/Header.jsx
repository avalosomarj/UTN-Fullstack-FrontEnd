import React from 'react'
import '../Assets/css/header.css'
import { Link } from 'react-router-dom'
import { BiSolidCat } from 'react-icons/bi'

const Header = () => {
  return (
    <header>
      <div className='logoHeader'>
        <Link to={'/home'}><BiSolidCat className='iconHeader'/></Link>
        <span>Inicio</span>
      </div>
    </header>
  )
}

export default Header