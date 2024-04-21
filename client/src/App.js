import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import StockPanel from './components/stockPanel/StockPanel';
import Home from './components/findStocks/Home';
import Watchlist from './components/myWatchlist/Watchlist';
import PageNotFound from './components/miscellaneous/PageNotFound';

function App() {

  return (
    <>
      <NavBar/>
      <StockPanel/>

      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/watchlist' element={<Watchlist/>} />

        <Route path='*' element={<PageNotFound/>}/> 


      </Routes>

      
    
    </>

  );
}

export default App;
