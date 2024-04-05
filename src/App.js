import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import StockPanel from './components/StockPanel';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';

function App() {


  return (

      <div className='bg-dark' >

        <NavBar></NavBar>
        <StockPanel/>
        <Hero />
        <SearchBar />
        
      </div>

  );
}

export default App;
