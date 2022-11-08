import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 15;
  const [progress, setProgress] = useState(0)

  return (
    <>
      <BrowserRouter>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}

        />
        <Navbar />
        <Routes>
          <Route path="/" element={<News key="general" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"general"} />} />
          <Route path='/business' element={<News key="business" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"business"} />} />
          <Route path='/entertainment' element={<News key="entertainment" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"entertainment"} />} />
          <Route path="/general" element={<News key="general" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"general"} />} />
          <Route path="/health" element={<News key="health" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"health"} />} />
          <Route path='/science' element={<News key="science" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"science"} />} />
          <Route path='/sports' element={<News key="sports" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"sports"} />} />
          <Route path='/technology' element={<News key="technology" setProgress={setProgress} pageSize={pageSize} country={"in"} category={"technology"} />} />


        </Routes>
      </BrowserRouter>,


    </>
  )
}


export default App