import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, ProductCreator, ProductDetail, ProductEditor, Register} from '../Pages'
import { Error } from '../Components'

const PagesRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/product/new' element={<ProductCreator/>}/>
            <Route path='/product/edit/:pid' element={<ProductEditor/>}/>
            <Route path='/product/detail/:pid' element={<ProductDetail/>}/>
            <Route path='*' element={<Error value={404} message={'La URL ingresada no existe'}/>}/>
        </Routes>
    </>
  )
}

export default PagesRouter