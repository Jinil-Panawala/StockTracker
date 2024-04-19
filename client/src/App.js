import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StockPanel from './components/StockPanel';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import PageNotFound from './components/PageNotFound';
function App() {

  const [data, setData] = useState([{}])


  useEffect(() => {
    fetch("http://localhost:4000/api/users").then(
      (response) => response.json()
    ).then(
      data => {
        setData(data)
      }
    )

    const bookId = '661c9b149946b8f65dcf3748'; 
  const newData = {
    savedStocks: ['SPY', 'QQQ', 'VOO'], 
  };

fetch(`http://localhost:4000/api/users/${bookId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Unable to update the Database');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Logging the response from the server
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }, [])


  return (
    <>
    {console.log(data)}
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
