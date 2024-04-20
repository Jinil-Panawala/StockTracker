import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StockPanel from './components/StockPanel';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import PageNotFound from './components/PageNotFound';
function App() {

  


  return (
    <>
      <NavBar/>
      {/* <StockPanel/> */}

      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/watchlist' element={<Watchlist/>} />

        <Route path='*' element={<PageNotFound/>}/> 


      </Routes>

      
    
    </>

  );
}

export default App;
