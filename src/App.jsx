import React from 'react';
import { Routes, Route} from 'react-router'
import Camera from '../src/Camera/Camera'


function App() {

  return (
    <>
    <Routes>

      <Route index element={<Camera/>}></Route>
      {/* <Route path='/user-upload' element={<UploadUser/>}></Route> */}
    </Routes>
    </>
  )
}

export default App
