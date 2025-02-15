// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Registro from "./components/Registro";
import Restringir from "./components/Restringir"
import Permitir from "./components/Permitir"

import './App.css'
// import Contenido from './components/Contenido'
// import './estilos/estilos.css'


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Permitir />}>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>

        <Route element={<Restringir />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<p>NO SE HALLÓ</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
