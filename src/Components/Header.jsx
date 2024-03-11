import React from 'react'
import '../Assets/css/header.css'
import { Link } from 'react-router-dom'
import { BiSolidCat } from 'react-icons/bi'

const Header = () => {
  return (
    <header>
      <Link to={'/home'}><BiSolidCat className='logoHeader'/></Link>
    </header>
  )
}

export default Header