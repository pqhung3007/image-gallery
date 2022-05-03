import React, { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1)

  const fetchImages = async () => {
    setLoading(true)
    let url
    // display searched image when there's keyword or default images otherwise
    if (query) {
      url = `${searchUrl}${clientID}&page=${page}&query=${query}`
    } else {
      url = `${mainUrl}${clientID}&page=${page}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      setPhotos(prevPhotos => {
        // remove default images when at page 1
        if (query && page === 1) {
          return data.results
        } else if (query) {
          // console.log(`Found ${data.total} results`);
          return [...prevPhotos, ...data.results]
        } else {
          return [...prevPhotos, ...data]
        }
      });
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // increment page when mouse hits the bottom
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3
        && !loading) {
        setPage(prevPage => prevPage + 1)
      }
    })
    return () => window.removeEventListener('click', event)
    // eslint-disable-next-line
  }, [])


  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchImages()
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
