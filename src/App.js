import './App.css';
import { useState } from 'react'

const getImages= async query => {
  const url= "https://unsplash-api.dawso-demo.workers.dev/"

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {'Content-type': 'application/json'}
  })

  return resp.json()
}

function App() {
  const [query, setQuery]= useState("")

  const updateQuery = evt => setQuery(evt.target.value)
  const [images, setImages] = useState([])

  const search= async () => {
    const results = await getImages(query)
    setImages(results)
  }
  
  return (
    <div className="App">
      <div className="form">
        <input id="query" type="text" onChange={updateQuery} placeholder="Search Images" />
        <button onClick={search}>Search</button>
      </div>

      {images.map(image =>
        <a key={image.id} href={image.link} target="_blank">
          <img src={image.image} />  
        </a>
      )}
    </div>
  );
}

export default App;
