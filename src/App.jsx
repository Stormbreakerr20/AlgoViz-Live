import { useState } from 'react'
import './App.css'
import Nav from './assets/components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sorting from './assets/Pages/Sort/Sorting'
import { ToastContainer } from 'react-toastify';
import Heaps from './assets/Pages/Heaps/Heaps'
import Ml from './assets/Pages/ML/Ml'
import About from './assets/Pages/About/About'


function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Sorting />}></Route>
          <Route  path='/heap' element={<Heaps />}></Route>
          <Route  path='/ml' element={<Ml />}></Route>
          <Route  path='/about' element={<About />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
