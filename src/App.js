import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    let url = `${mainUrl}${clientID}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input type="text"
            className='form-input'
            placeholder='search image'
            value={query}
            onChange={handleChange}
          />
          <button type='submit'
            className="submit-btn"
            onClick={handleSubmit}
          >
            <FaSearch />
          </button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />
          })}
        </div>

        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
