import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {

  return (
    <h1>Hello </h1>
  );
}

export default App;
