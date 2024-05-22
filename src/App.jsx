import React from 'react';
import { Routes, Route} from 'react-router'
import Camera from '../src/Camera/Camera'
import Home from '../src/Home/Home'


function App() {

  return (
    <>
    <Routes>

      <Route index element={<Home/>}></Route>
      <Route path='/camera' element={<Camera/>}></Route>
    </Routes>
    </>
  )
}

export default App
