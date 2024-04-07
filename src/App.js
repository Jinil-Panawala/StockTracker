import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import StockPanel from './components/StockPanel';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import SearchResults from './components/SearchResults';

function App() {


  return (

      <div className='bg-dark' >

        <NavBar></NavBar>
        <StockPanel/>

        <div className="container col-xxl-10 px-4 py-5" >

          <Hero />
          <SearchBar />
          <SearchResults />
          
        </div>
        
      </div>

  );
}

export default App;
