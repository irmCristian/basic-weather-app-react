import axios from 'axios';
import { React, useEffect, useState } from 'react';
import rain from './assets/rain.gif'
import sunset from './assets/sunset.jpg'
import sunny from './assets/sunny.gif'
import snow from './assets/snow.gif'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const api = '00c3a548329655e73211003948393127'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
        .catch(err => {
          console.log(err);
        })
      setLocation('')
      changeBackground()
    }
  }

  const changeBackground = () => {
    if (data.main?.temp > 20) {
      document.body.style.background = "url(./assets/sunny.gif)"
    } else {
      document.body.style.background = "url(./assets/rain.gif)"
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/h</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
